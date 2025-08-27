<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
    public function showUserProfile()
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        if (auth()->id() !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($user);
    }

    public function updateUserProfile(updateUserRequest $request)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if (auth()->id() !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user->update($request->validated());

        return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
    }
}
