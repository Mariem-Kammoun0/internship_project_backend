<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\CompanyController;

Route::middleware(['auth:sanctum', 'employer'])->group(function () {
    Route::post('/company', [CompanyController::class, 'store']);
    Route::get('/company', [CompanyController::class, 'showMyCompany']);
    Route::put('/company', [CompanyController::class, 'update']);
    Route::delete('/company', [CompanyController::class, 'destroyMyCompany']);
});
