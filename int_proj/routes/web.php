<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployerController;
use Illuminate\Support\Facades\Auth;

// Route::get('/api/auth/check', function () {
//     return response()->json([
//         'authenticated' => Auth::check(),
//         'user' => Auth::user()
//     ]);
// })->middleware('web');

// Route::get('/', function () {
//     return view('welcome');
// });

// Route::get('/dashboard', function () {
//     return view('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });


// //mailing test
 Route::get('/test-email', function () {
    Mail::raw('This is a test email from Laravel.', function ($message) {
         $message->to('mariemkammoun01@gmail.com')
                 ->subject('Test Email');
     });

     return 'Test email sent!';
 });

// require __DIR__.'/auth.php';
