<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Register user baru
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6|confirmed', // password_confirmation wajib dikirim
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'customer', // default role misal customer
        ]);

        return response()->json(['status' => 'success', 'user' => $user], 201);
    }

    // Login user dan buat token
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'token' => $token,
        ]);
    }

    // Logout (revoke token)
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['status' => 'success', 'message' => 'Logged out']);
    }
}
