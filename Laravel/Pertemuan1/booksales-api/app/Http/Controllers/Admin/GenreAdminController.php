<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use Illuminate\Http\Request;

class GenreAdminController extends Controller
{
    public function index()
    {
        $genres = Genre::paginate(10);
        return view('admin.genres.index', compact('genres'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        Genre::create(['name' => $request->name]);

        return redirect()->back()->with('success', 'Genre added successfully.');
    }
}
