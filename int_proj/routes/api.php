<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobOfferController;
use App\Http\Controllers\ApplicationController;


Route::middleware(['auth:sanctum', 'employer'])->group(function () {
    Route::post('/company', [CompanyController::class, 'store']);
    Route::get('/company', [CompanyController::class, 'showMyCompany']);
    Route::put('/company', [CompanyController::class, 'update']);
    Route::delete('/company', [CompanyController::class, 'destroyMyCompany']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user/profile', [UserController::class, 'showUserProfile']);
    Route::put('/user/profile', [UserController::class, 'updateUserProfile']);
});

Route::middleware(['auth:sanctum', 'employer'])->group(function () {
    Route::get('/job-offers', [JobOfferController::class, 'index']);
    Route::post('/job-offers', [JobOfferController::class, 'store']);
    Route::put('/job-offers/{id}', [JobOfferController::class, 'update']);
    Route::delete('/job-offers/{id}', [JobOfferController::class, 'destroy']);
});

Route::middleware(['auth:sanctum','employee'])->group(function () {
    Route::post('/applications/{offerId}', [ApplicationController::class, 'store']);
    Route::get('/my-applications', [ApplicationController::class, 'myApplications']);
    Route::put('/applications/{id}/motivation-letter', [ApplicationController::class, 'addMotivationLetter']);
    Route::delete('/applications/{id}', [ApplicationController::class, 'destroy']);
});

Route::middleware(['auth:sanctum', 'employer'])->group(function () {
    Route::get('/applications/{offerId}/Applications', [ApplicationController::class, 'index']);
    Route::delete('/applications/{offerId}/Applications/{applicationId}', [ApplicationController::class, 'rejectApplication']);
});

//public routes
Route::get('/job-offers', [JobOfferController::class, 'indexForJobSeekers']);
Route::get('/job-offers/company/{companyId}', [JobOfferController::class, 'getOffersByCompany']);
Route::get('/companies', [CompanyController::class, 'index']);
Route::get('/job-offers/{id}', [JobOfferController::class, 'show']);
