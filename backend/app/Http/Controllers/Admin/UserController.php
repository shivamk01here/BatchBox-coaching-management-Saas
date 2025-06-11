<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;

use hash;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'mobile' => 'required|string',
            'roleID' => 'required|exists:roles,id'
        ]);

        $user = User::create([
            ...$data,
            'is_verified' => false,
            'institutionID' => auth()->user()->institutionID,
            'password' => \Illuminate\Support\Facades\Hash::make(\Illuminate\Support\Str::random(10))
        ]);

        // \App\Jobs\SendInvitationMailJob::dispatch($user);

        return response()->json(['message' => 'User created and invitation sent']);
    }

    public function index() {
        return User::byInstitution(auth()->user()->institutionID)->with('role')->get();
    }
}
