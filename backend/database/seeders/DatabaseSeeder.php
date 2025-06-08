<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Institution;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create test institution
        $institution = Institution::create([
            'name' => 'Test University',
            'email' => 'admin@testuniversity1.edu',
            'phone' => '+1-555-0123',
            'address' => '123 Education Street, Learning City, LC 12345',
            'type' => 'university',
        ]);

        // Create roles
        $adminRole = Role::create([
            'name' => 'admin',
            'description' => 'Administrator',
            'institutionID' => $institution->institutionID,
        ]);

        // Create test admin user
        User::create([
            'name' => 'Test Admin',
            'email' => 'admin@test1.com',
            'password' => Hash::make('password123'),
            'institutionID' => $institution->institutionID,
            'roleID' => $adminRole->roleID,
            'staffID' => 'STAFF0001001',
        ]);
    }
}