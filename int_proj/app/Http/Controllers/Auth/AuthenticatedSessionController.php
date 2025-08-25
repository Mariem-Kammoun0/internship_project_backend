<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Illuminate\Http\JsonResponse;


class AuthenticatedSessionController extends Controller
{
    public function apiLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

            $user = Auth::user();

        $token = $user->createToken('frontend')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token,
        ]);

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

public function destroy(Request $request)
{
    try {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Not authenticated'], 401);
        }

        // Supprimer tous les tokens
        $user->tokens()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);

    } catch (\Exception $e) {
        \Log::error('Logout error: ' . $e->getMessage());
        return response()->json([
            'message' => 'Logout failed',
            'error' => $e->getMessage()
        ], 500);
    }
}
}
