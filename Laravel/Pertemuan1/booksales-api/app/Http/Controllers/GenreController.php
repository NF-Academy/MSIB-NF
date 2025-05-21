<?php 
namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    // Read all genres
    public function index()
    {
        $genres = Genre::all();

        return response()->json([
            'status' => 'success',
            'data' => $genres
        ]);
    }

    // Create new genre
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        // Simpan data
        $genre = Genre::create([
            'name' => $request->name
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $genre
        ], 201);
    }
}
