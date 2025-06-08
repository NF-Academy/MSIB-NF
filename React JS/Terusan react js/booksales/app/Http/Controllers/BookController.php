<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Genre;
use App\Models\Author;

class BookController extends Controller
{
    public function index()
    {
        // $data = new Book();
        // $books = $data->getBooks();

        // digunakan untuk menampilkan di view
        // $books = Book::all();
        // return view('books', ['books' => $books]);

        // digunakan untuk response di JSON
        $books = Book::with('genre', 'author')->get();

        if ($books->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resource data not found!",
                "data" => null
            ], 200);
        }

        return response()->json([
            "success" => true,
            "message" => "Get All Resource",
            "data" => $books
        ], 200);
    }


    //digunakan untuk menambahkan data
    public function store(Request $request)
    {
        //validator
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:100',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'cover_photo' => 'required|image|mimes:jpeg,jpg,png|max:2048',
            'genre_id' => 'required|exists:genres,id',
            'author_id' => 'required|exists:authors,id'
        ]);

        // check validator eror
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // upload image
        $image = $request->file('cover_photo');
        $image->store('books', 'public');

        // insert data
        $book = Book::create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'cover_photo' => $image->hashName(),
            'genre_id' => $request->genre_id,
            'author_id' => $request->author_id,
        ]);

        // response
        return response()->json([
            "success" => true,
            "message" => "Resource added successfully!",
            "data" => $book
        ], 201);
    }


    // kode untuk mengambil data berdasarkan id
    public function show(string $id)
    {
        $book = Book::with('genre', 'author')->find($id);

        // respone untuk data tidak ditemukan
        if (!$book) {
            return response()->json([
                "success" => false,
                "message" => "Resource not found",
            ], 404);
        }

        // response data ditemukan
        return response()->json([
            "success" => true,
            "message" => "Get detail resource",
            "data" => $book
        ], 200);
    }


    //kode untuk update data
    public function update(string $id, Request $request)
    {
        // mencari data
        $book = Book::find($id);
        if (!$book) {
            return response()->json([
                "success" => false,
                "message" => "Resource not found",
            ], 404);
        }

        // validator
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:100',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'cover_photo' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
            'genre_id' => 'required|exists:genres,id',
            'author_id' => 'required|exists:authors,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        // data diupdate
        $data = [
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'genre_id' => $request->genre_id,
            'author_id' => $request->author_id
        ];

        // handle image (upload & delete image)
        if ($request->hasFile('cover_photo')) {
            $image = $request->file('cover_photo');
            $image->store('books', 'public');

            if ($book->cover_photo) {
                Storage::disk('public')->delete('books/' . $book->cover_photo);
            }

            $data['cover_photo'] = $image->hashName();
        }

        // update data baru ke database
        $book->update($data);

        return response()->json([
            "success" => true,
            "message" => "Resource updated successfully!.",
            "data" => $book
        ], 200);
    }

    // diguanakan untuk menghapus data
    public function destroy(string $id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json([
                "success" => false,
                "message" => "Resource not found.",
                "data" => $book
            ], 200);
        }

        if ($book->cover_photo) {
            Storage::disk('public')->delete('books/' . $book->cover_photo);
        }

        $book->delete();
        return response()->json([
            "success" => true,
            "message" => "Delete resource successfully!.",
        ], 200);
    }
}
