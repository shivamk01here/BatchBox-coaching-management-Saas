<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\InstitutionController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\OtpController;
use App\Http\Controllers\API\SubjectController;
use App\Http\Controllers\API\PackageController;
use App\Http\Controllers\API\EventController;
use App\Http\Controllers\API\InstitutionSettingController;
use App\Http\Controllers\API\OnlineBookingController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::get('/subjects', [SubjectController::class, 'index']);
    Route::post('/subjects', [SubjectController::class, 'store']);


    Route::get('/packages', [PackageController::class, 'index']);
    Route::post('/packages', [PackageController::class, 'store']);
    Route::get('/packages/{id}', [PackageController::class, 'show']);

    Route::get('/institution-setting', [InstitutionSettingController::class, 'get']);
    Route::post('/institution-setting-save', [InstitutionSettingController::class, 'save']);
    Route::get('/get-ob-details/{obName}', [OnlineBookingController::class, 'getDetails']);
});

Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users', [UserController::class, 'index']);
});


Route::middleware('auth:sanctum')->prefix('classes')->group(function () {
    Route::post('/store', [EventController::class, 'store']);
    Route::get('/', [EventController::class, 'index']);
    Route::get('/{id}', [EventController::class, 'show']);
});

Route::post('/auth/verify-otp', [OtpController::class, 'verify']);

Route::post('/register', [InstitutionController::class, 'register']);



Route::middleware(['auth.sanctum, log.requests'])->prefix('v1')->group(function(){
    // Route::apiResource('students', StudentController::class)->names('students');
    // Route::apiResource('reports', ReportController::Class)->names('reports');
    // Route::apiResource('batches/{batch}/students', [BatchController::Class, 'students'])->names('batches.students');
    // Route::apiResource('students/{id}/fee-status', [FeeController::class, 'status'])
    //      ->name('fees.status');
});
