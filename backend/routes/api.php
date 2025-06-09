<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\InstitutionController;
use App\Http\Controllers\API\AuthController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});


Route::post('/register', [InstitutionController::class, 'register']);



Route::middleware(['auth.sanctum, log.requests'])->prefix('v1')->group(function(){
    // Route::apiResource('students', StudentController::class)->names('students');
    // Route::apiResource('reports', ReportController::Class)->names('reports');
    // Route::apiResource('batches/{batch}/students', [BatchController::Class, 'students'])->names('batches.students');
    // Route::apiResource('students/{id}/fee-status', [FeeController::class, 'status'])
    //      ->name('fees.status');
});
