<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    
public function index()
{
    $authors = Author::all(); // Ambil semua data authors
    return response()->json([
        'status' => 'success',
        'data' => $authors
    ]);
}
}
