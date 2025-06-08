<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\AuthorAdminController;
use App\Http\Controllers\Admin\GenreAdminController;
use Illuminate\Support\Facades\Route;

// Halaman awal
Route::get('/', function () {
    return view('welcome');
});

// Dashboard (hanya user login & terverifikasi)
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Manajemen profil (hanya untuk user login)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Fitur ADMIN (hanya user login + admin role)
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Author management
    Route::get('/authors', [AuthorAdminController::class, 'index'])->name('authors.index');
    Route::get('/authors/create', [AuthorAdminController::class, 'create'])->name('authors.create'); // halaman form create
    Route::post('/authors', [AuthorAdminController::class, 'store'])->name('authors.store');
    Route::get('/authors/{author}/edit', [AuthorAdminController::class, 'edit'])->name('authors.edit'); // halaman form edit
    Route::put('/authors/{author}', [AuthorAdminController::class, 'update'])->name('authors.update');
    Route::delete('/authors/{author}', [AuthorAdminController::class, 'destroy'])->name('authors.destroy');

    // Genre management
    Route::get('/genres', [GenreAdminController::class, 'index'])->name('genres.index');
    Route::get('/genres/create', [GenreAdminController::class, 'create'])->name('genres.create'); // halaman form create
    Route::post('/genres', [GenreAdminController::class, 'store'])->name('genres.store');
    Route::get('/genres/{genre}/edit', [GenreAdminController::class, 'edit'])->name('genres.edit'); // halaman form edit
    Route::put('/genres/{genre}', [GenreAdminController::class, 'update'])->name('genres.update');
    Route::delete('/genres/{genre}', [GenreAdminController::class, 'destroy'])->name('genres.destroy');
});

// Route auth dari Laravel Breeze
require __DIR__.'/auth.php';
