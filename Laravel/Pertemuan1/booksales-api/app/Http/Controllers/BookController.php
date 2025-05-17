<?php

namespace App\Http\Controllers;

use App\Models\Book;

class BookController extends Controller
{
    public function index()
    {
        // Ambil semua buku beserta relasi author
        $books = Book::with('author')->get();

        // Kembalikan data dalam format JSON
        return response()->json([
            'status' => 'success',
            'data' => $books
        ]);
    }
}

