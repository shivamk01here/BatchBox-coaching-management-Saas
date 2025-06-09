<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\BatchboxModuleSeeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            BatchboxModuleSeeder::class,
        ]);
    }
}
