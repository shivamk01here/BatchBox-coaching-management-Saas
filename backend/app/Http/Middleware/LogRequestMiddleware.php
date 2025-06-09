<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LogRequestMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        \Illuminate\Support\Facades\Log::info('Incoming request', [
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'body' => $request->all(),
            'ip' => $request->ip(),
        ]);
    
        return $next($request);
    }
}
