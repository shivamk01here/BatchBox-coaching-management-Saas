<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Institution;

class InstitutionsTableSeeder extends Seeder
{
    public function run(): void
    {
        Institution::firstOrCreate([
            'name' => 'Demo Institute',
            'status' => 'active',
            'is_verified' => true,
        ]);
    }
}
