<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsEmployee
{
    /**
     * Ensure the authenticated user has the employee role.
     */
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() || $request->user()->role !== 'employee') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    }
}


