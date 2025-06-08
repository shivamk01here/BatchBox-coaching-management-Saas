<?php

namespace App\Http\Controllers;

use App\Models\Institution;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function registerInstitution(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:institutions',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'type' => 'required|string|in:school,college,university',
            'adminName' => 'required|string|max:255',
            'adminEmail' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();

        try {
            // Create institution
            $institution = Institution::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'type' => $request->type,
            ]);

            // Create default roles for the institution
            $adminRole = Role::create([
                'name' => 'admin',
                'description' => 'Administrator with full access',
                'institutionID' => $institution->institutionID,
            ]);

            Role::create([
                'name' => 'teacher',
                'description' => 'Teacher with teaching access',
                'institutionID' => $institution->institutionID,
            ]);

            Role::create([
                'name' => 'staff',
                'description' => 'Staff member with limited access',
                'institutionID' => $institution->institutionID,
            ]);

            Role::create([
                'name' => 'student',
                'description' => 'Student with learning access',
                'institutionID' => $institution->institutionID,
            ]);

            // Generate staffID for admin
            $staffID = 'STAFF' . str_pad($institution->institutionID, 4, '0', STR_PAD_LEFT) . '001';

            // Create admin user
            $adminUser = User::create([
                'name' => $request->adminName,
                'email' => $request->adminEmail,
                'password' => Hash::make($request->password),
                'institutionID' => $institution->institutionID,
                'roleID' => $adminRole->roleID,
                'staffID' => $staffID,
                'status' => 'active'
            ]);

            // Generate token
            $token = $adminUser->createToken('auth_token')->plainTextToken;

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Institution registered successfully',
                'user' => $adminUser->load(['institution', 'role']),
                'token' => $token
            ], 201);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Registration failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if user exists and is active
        $user = User::where('email', $request->email)->first();
        
        if (!$user || $user->status !== 'active') {
            return response()->json([
                'success' => false,
                'message' => 'Account not found or inactive'
            ], 401);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            
            // Revoke all existing tokens for this user
            $user->tokens()->delete();
            
            // Create new token
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'user' => $user->load(['institution', 'role']),
                'token' => $token
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials'
        ], 401);
    }

    public function logout(Request $request)
    {
        try {
            // Delete current access token
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Logout failed'
            ], 500);
        }
    }

    public function user(Request $request)
    {
        try {
            $user = $request->user()->load(['institution', 'role']);
            
            return response()->json([
                'success' => true,
                'user' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'User data fetch failed'
            ], 500);
        }
    }

    public function refreshToken(Request $request)
    {
        try {
            $user = $request->user();
            
            // Delete current token
            $request->user()->currentAccessToken()->delete();
            
            // Create new token
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'token' => $token,
                'user' => $user->load(['institution', 'role'])
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token refresh failed'
            ], 500);
        }
    }
}