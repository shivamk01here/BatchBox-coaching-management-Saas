<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesTableSeeder extends Seeder
{
    public function run(): void
    {
        $roles = ['owner', 'admin', 'teacher', 'student'];

        foreach ($roles as $role) {
            Role::firstOrCreate(['roleName' => $role]);
        }
    }
}
