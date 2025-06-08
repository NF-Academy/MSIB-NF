<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AuthorController extends Controller
{
    public function index()
    {
        // $data = new Author();
        // $authors = $data ->getAuthors();

        // $authors = Author::all();
        // return view('authors', ['authors' => $authors]);

        $authors = Author::all();

        if ($authors->isEmpty()) {
            return response()->json([
                "success" => true,
                "massage" => "Resource data not found!",
                "data" => null
            ], 200);
        }

        return response()->json([
            "success" => true,
            "massage" => "Get All Resource",
            "data" => $authors
        ], 200);
    }

    //digunakan untuk menambahkan data
    public function store(Request $request)
    {
        //validator
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:50',
            'photo' => 'required|image|mimes:jpeg,jpg,png|max:2048',
            'biografi' => 'required|string'
        ]);

        //check validator eror
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        //upload image
        $image = $request->file('photo');
        $image->store('author', 'public');

        //insert data
        $author = Author::create([
            'nama' => $request->nama,
            'photo' => $image->hashName(),
            'biografi' => $request->biografi
        ]);

        //response
        return response()->json([
            'success' => true,
            'message' => 'Resource added successfully!',
            'data' => $author
        ], 201);
    }

    // source code mengambil data berdasarkan id
    public function show(string $id)
    {
        $author = Author::find($id);

        // respone untuk data tidak ditemukan
        if (!$author) {
            return response()->json([
                "success" => false,
                "message" => "resource not found"
            ], 404);
        }

        // response data ditemukan
        return response()->json([
            "success" => true,
            "mesagge" => "Get detail resource",
            "data" => $author
        ], 200);
    }


    public function update(string $id, Request $request)
    {
        $author = Author::find($id);
        if (!$author) {
            return response()->json([
                "success" => false,
                "message" => "Resource not found",
            ], 404);
        }

        // validator
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:50',
            'biografi' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        // data diupdate
        $data = [
            'nama' => $request->nama,
            'biografi' => $request->biografi,
        ];

        // handle image (upload & delete image)
        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $image->store('author', 'public');

            if ($author->photo) {
                Storage::disk('public')->delete('author/' . $author->photo);
            }

            $data['photo'] = $image->hashName();
        }

        // update data baru ke database
        $author->update($data);

        return response()->json([
            "success" => true,
            "message" => "Resource updated successfully!.",
            "data" => $author
        ], 200);
    }

    // diguanakan untuk menghapus data
    public function destroy(string $id)
    {
        $author = Author::find($id);

        if (!$author) {
            return response()->json([
                "success" => false,
                "message" => "Resource not found.",
                "data" => $author
            ], 200);
        }

        if ($author->cover_photo) {
            Storage::disk('public')->delete('author/' . $author->cover_photo);
        }

        $author->delete();
        return response()->json([
            "success" => true,
            "message" => "Delete resource successfully!.",
        ], 200);
    }
}
