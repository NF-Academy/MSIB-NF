<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CustomerMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Cek user sudah login dan role customer
        if ($request->user() && $request->user()->role === 'customer') {
            return $next($request);
        }

        return response()->json(['message' => 'Forbidden. Customers only.'], 403);
    }
}
