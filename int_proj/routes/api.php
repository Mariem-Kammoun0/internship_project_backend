<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobOfferController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Middleware\IsEmployer;
use App\Http\Middleware\IsEmployee;



Route::middleware(['auth:sanctum', IsEmployer::class])->group(function () {
    Route::post('/company', [CompanyController::class, 'store']);
    Route::get('/company', [CompanyController::class, 'show']);
    Route::put('/company', [CompanyController::class, 'update']);
    Route::delete('/company', [CompanyController::class, 'destroy']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user/profile', [UserController::class, 'showUserProfile']);
    Route::put('/user/profile', [UserController::class, 'updateUserProfile']);
});

// Employer-only routes for managing own company's job offers
Route::middleware(['auth:sanctum',IsEmployer::class])->group(function () {
    Route::get('/employer/job-offers', [JobOfferController::class, 'index']);
    Route::post('/employer/job-offers', [JobOfferController::class, 'store']);
    Route::put('/employer/job-offers/{id}', [JobOfferController::class, 'update']);
    Route::delete('/employer/job-offers/{id}', [JobOfferController::class, 'destroy']);
});

Route::middleware(['auth:sanctum',IsEmployee::class])->group(function () {
    Route::post('/employee/applications/{offerId}', [ApplicationController::class, 'store']);
    Route::get('/employee/my-applications', [ApplicationController::class, 'myApplications']);
    Route::put('/employee/applications/{id}/motivation-letter', [ApplicationController::class, 'addMotivationLetter']);
    Route::delete('/employee/applications/{id}', [ApplicationController::class, 'destroy']);
});

Route::middleware(['auth:sanctum',IsEmployer::class])->group(function () {
    Route::get('/employer/applications/{offerId}', [ApplicationController::class, 'index']);
    Route::delete('/employer/applications/{offerId}/{applicationId}', [ApplicationController::class, 'rejectApplication']);
});

// Public routes for job seekers
Route::get('/job-offers', [JobOfferController::class, 'indexForJobSeekers']);
Route::get('/job-offers/company/{companyId}', [JobOfferController::class, 'getOffersByCompany']);
Route::get('/companies', [CompanyController::class, 'index']);
Route::get('/job-offers/{id}', [JobOfferController::class, 'show']);

Route::post('/login', [AuthenticatedSessionController::class, 'apiLogin']);

Route::middleware('auth:sanctum')->get('/user', function () {
    return auth()->user();
});
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');

Route::post('/register', [RegisteredUserController::class, 'store']);

