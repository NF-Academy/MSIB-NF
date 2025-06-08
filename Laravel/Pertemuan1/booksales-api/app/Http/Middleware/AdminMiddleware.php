<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Cek user sudah login dan role-nya 'admin'
        if (Auth::check() && Auth::user()->role === 'admin') {
            return $next($request);
        }

        // Kalau bukan admin, redirect atau abort 403
        abort(403, 'Access denied');
    }
}
