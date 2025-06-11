<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Institution;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $institution = Institution::first();
        $role = Role::where('roleName', 'owner')->first();

        User::firstOrCreate([
            'email' => 'owner@demo.com',
        ], [
            'name' => 'Demo',
            'surname' => 'Owner',
            'password' => Hash::make('password123'),
            'institutionID' => 1,
            'roleID' => 1,
            'is_verified' => true,
        ]);
    }
}
