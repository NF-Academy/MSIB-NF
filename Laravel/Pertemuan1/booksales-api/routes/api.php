<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\GenreController;
use Illuminate\Support\Facades\Route;

Route::middleware('api')->group(function () {
    // Route untuk book (hanya index, karena tidak pakai resource)
    Route::get('/books', [BookController::class, 'index']);

    // Route resource lengkap untuk authors dan genres
    Route::apiResource('authors', AuthorController::class);
    Route::apiResource('genres', GenreController::class);
});
