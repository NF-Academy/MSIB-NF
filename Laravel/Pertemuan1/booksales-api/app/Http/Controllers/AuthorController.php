<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    // Read all authors dengan pagination
    public function index()
    {
        $authors = Author::paginate(10); // 10 data per halaman
        return response()->json([
            'status' => 'success',
            'data' => $authors
        ]);
    }

    // Create a new author
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $author = Author::create($validated);

        return response()->json([
            'status' => 'success',
            'data' => $author
        ], 201);
    }

    // Show a specific author via route model binding
    public function show(Author $author)
    {
        return response()->json([
            'status' => 'success',
            'data' => $author
        ]);
    }

    // Update a specific author
    public function update(Request $request, Author $author)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $author->update($validated);

        return response()->json([
            'status' => 'success',
            'data' => $author
        ]);
    }

    // Delete a specific author
    public function destroy(Author $author)
    {
        $author->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Author deleted successfully'
        ]);
    }

    // Optional: Search authors by name
    public function search(Request $request)
    {
        $query = $request->query('q');

        $authors = Author::where('name', 'like', "%{$query}%")->paginate(10);

        return response()->json([
            'status' => 'success',
            'data' => $authors
        ]);
    }
}
