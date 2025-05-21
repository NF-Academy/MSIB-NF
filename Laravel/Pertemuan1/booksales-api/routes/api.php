<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\GenreController;
use Illuminate\Support\Facades\Route;

Route::middleware('api')->group(function () {
    // Read all
    Route::get('/books', [BookController::class, 'index']);
    Route::get('/authors', [AuthorController::class, 'index']);
    Route::get('/genres', [GenreController::class, 'index']);

    // Create
    Route::post('/authors', [AuthorController::class, 'store']);
    Route::post('/genres', [GenreController::class, 'store']);
});
