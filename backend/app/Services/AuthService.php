<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function login(array $credentials)
    {
        $user = User::where('email', $credentials['email'])->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();
        // dd($user);
        $user->tokens()->delete(); // Revoke old tokens

        $token = $user->createToken('auth_token', [
            'userID:' . $user->userID,
            'roleID:' . $user->roleID
        ])->plainTextToken;

        // DD($token);
        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'user' => $user->load(['institution', 'role']),
            'token' => $token
        ]);
    }
}
