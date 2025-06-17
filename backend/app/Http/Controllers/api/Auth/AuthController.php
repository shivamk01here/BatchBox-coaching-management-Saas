<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AuthService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

/**
 * @group Authentication
 *
 * APIs for user authentication (login, logout, current user)
 */
class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Login a user
     *
     * @bodyParam email string required The email address. Example: admin@batchbox.com
     * @bodyParam password string required The password. Example: password
     * 
     * @response 200 {
     *   "success": true,
     *   "token": "access-token",
     *   "user": { "id": 1, "email": "admin@batchbox.com" }
     * }
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        return $this->authService->login($request->only('email', 'password'));
    }

    /**
     * Get authenticated user
     *
     * @authenticated
     *
     * @response 200 {
     *   "success": true,
     *   "user": {
     *     "id": 1,
     *     "name": "John Doe",
     *     "email": "admin@batchbox.com",
     *     "role": "owner",
     *     "institution": "ABC Coaching",
     *     "is_verified": true,
     *     "created_at": "2025-06-17 12:00:00"
     *   }
     * }
     */
    public function user(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = $user->with('role', 'institution')->first();

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'role' => $user->role->name ?? null,
                'institution' => $user->institution->name ?? null,
                'is_verified' => $user->is_verified,
                'created_at' => $user->created_at->toDateTimeString(),
            ]
        ]);
    }

    /**
     * Logout the user
     *
     * @authenticated
     *
     * @response 200 {
     *   "message": "Successfully logged out"
     * }
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }
}
