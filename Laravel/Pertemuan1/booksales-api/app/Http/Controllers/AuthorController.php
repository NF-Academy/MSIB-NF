<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    // Read all authors
    public function index()
    {
        $authors = Author::all();
        return response()->json([
            'status' => 'success',
            'data' => $authors
        ]);
    }

    // Create a new author
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        // Simpan data
        $author = Author::create([
            'name' => $request->name
        ]);

        // Response
        return response()->json([
            'status' => 'success',
            'data' => $author
        ], 201);
    }
}
