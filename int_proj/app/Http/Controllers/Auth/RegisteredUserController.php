<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'surname' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'confirmed', 'min:8'],
                'role' => ['required', 'string', 'in:employer,employee'],
            ]);

            $user = User::create([
                'name' => $request->name,
                'surname' => $request->surname,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role,
                'status' => 'unemployed',
            ]);

            event(new Registered($user));

            // For API requests, don't auto-login, just return success
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'message' => 'Registration successful',
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'surname' => $user->surname,
                        'email' => $user->email,
                        'role' => $user->role,
                    ]
                ], 201);
            }

            Auth::login($user);
            return ;

        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::alert($e->getMessage());
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $e->errors()
                ], 422);
            }
            throw $e;
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                \Log::alert($e->getMessage());
                return response()->json([
                    'message' => 'Registration failed',
                    'error' => $e->getMessage()
                ], 500);
            }
            throw $e;
        }
    }
}
