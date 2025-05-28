<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\GenreController;
use Illuminate\Support\Facades\Route;

// Publik (Register dan Login)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Publik: Read-only Author, Genre, Book
Route::apiResource('authors', AuthorController::class)->only(['index', 'show']);
Route::apiResource('genres', GenreController::class)->only(['index', 'show']);
Route::apiResource('books', BookController::class)->only(['index', 'show']);

// Logout bisa untuk semua user yang sudah login
Route::middleware(['auth:sanctum'])->post('/logout', [AuthController::class, 'logout']);

// Admin routes
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::apiResource('authors', AuthorController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('genres', GenreController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('books', BookController::class)->only(['destroy']);
});

// Customer routes
Route::middleware(['auth:sanctum', 'customer'])->group(function () {
    Route::apiResource('books', BookController::class)->only(['store', 'update']);
});
