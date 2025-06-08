<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Author;
use Illuminate\Http\Request;

class AuthorAdminController extends Controller
{
    public function index()
    {
        $authors = Author::paginate(10);
        return view('admin.authors.index', compact('authors'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        Author::create(['name' => $request->name]);

        return redirect()->back()->with('success', 'Author added successfully.');
    }
}
