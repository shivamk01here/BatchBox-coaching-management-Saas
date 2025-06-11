<?php

namespace App\Helpers;

use App\Models\Institution;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class InstitutionHelper
{
    public static function createInstitutionWithOwner(array $data)
    {
        $institution = Institution::create([
            'name' => $data['institution_name'],
            'status' => 'active',
            'is_verified' => false,
        ]);

        // dd($institution);
        
        $ownerRole = Role::firstOrCreate(
            ['roleName' => 'owner']
        );
        
        $user = User::create([
            'name' => $data['owner_name'],
            'surname' => $data['surname'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'institutionID' => $institution->id,
            'roleID' => $ownerRole->id,
            'is_verified' => false,
        ]);
        
        return ['institution' => $institution, 'user' => $user];
    }
}