<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\GenreController;
use Illuminate\Support\Facades\Route;

// Route publik untuk Read All dan Show (index, show)
Route::apiResource('authors', AuthorController::class)->only(['index', 'show']);
Route::apiResource('genres', GenreController::class)->only(['index', 'show']);

// Route yang dilindungi middleware admin untuk Create, Update, Destroy
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::apiResource('authors', AuthorController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('genres', GenreController::class)->only(['store', 'update', 'destroy']);
});

// Route untuk books, misalnya hanya index (bisa diakses semua)
Route::get('/books', [BookController::class, 'index']);
