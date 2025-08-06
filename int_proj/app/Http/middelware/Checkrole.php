<?php

namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;

class IsEmployer
{
    /**
     * checks role for only admin authorized routes.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function isEmployer($request, Closure $next)
    {
        if ($request->user()->role !== 'employer') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    }

}
