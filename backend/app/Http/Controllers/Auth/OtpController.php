<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\UserOtp;
use App\Events\UserVerified;

class OtpController extends Controller
{
    public function verify(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required',
        ]);

        $user = User::where('email', $request->email)->firstOrFail();

        $otp = UserOtp::where('user_id', $user->id)
                    ->where('otp', $request->otp)
                    ->where('expires_at', '>', now())
                    ->latest()->first();

        if (!$otp) {
            return response()->json(['message' => 'Invalid or expired OTP'], 401);
        }

        $user->is_verified = true;
        $user->save();

        event(new UserVerified($user));

        return response()->json(['message' => 'Verification successful']);
    }
}
