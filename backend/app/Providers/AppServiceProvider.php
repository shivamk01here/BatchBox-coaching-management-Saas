<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Contracts\StudentContract;
use App\Services\StudentService;
use App\Observers\ReportObserver;
use App\Models\Report;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(StudentContract::class, StudentService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Report::observe(ReportObserver::class);
    }
}
