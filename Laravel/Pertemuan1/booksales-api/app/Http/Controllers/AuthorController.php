<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    // Read all authors
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
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $author = Author::create([
            'name' => $request->name
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $author
        ], 201);
    }

    // Show a specific author
    public function show($id)
    {
        $author = Author::find($id);
        if (!$author) {
            return response()->json([
                'status' => 'error',
                'message' => 'Author not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $author
        ]);
    }

    // Update a specific author
    public function update(Request $request, $id)
    {
        $author = Author::find($id);
        if (!$author) {
            return response()->json([
                'status' => 'error',
                'message' => 'Author not found'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $author->update([
            'name' => $request->name
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $author
        ]);
    }

    // Delete a specific author
    public function destroy($id)
    {
        $author = Author::find($id);
        if (!$author) {
            return response()->json([
                'status' => 'error',
                'message' => 'Author not found'
            ], 404);
        }

        $author->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Author deleted successfully'
        ]);
    }
}
