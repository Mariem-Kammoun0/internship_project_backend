<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsEmployer
{
    /**
     * Ensure the authenticated user has the employer role.
     */
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() || $request->user()->role !== 'employer') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    }
}


