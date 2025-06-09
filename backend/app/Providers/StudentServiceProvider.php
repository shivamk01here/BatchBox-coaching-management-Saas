<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Contracts\StudentContract;
use App\Services\StudentService;

class StudentServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(StudentContract::class, StudentService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
