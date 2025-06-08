<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GenreController extends Controller
{
    public function index()
    {
        $genres = Genre::all();
        return response()->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $genres
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:genres,name',
            'description' => 'nullable|string',
        ], [
            'name.required' => 'Nama genre wajib diisi.',
            'name.string' => 'Nama genre harus berupa teks.',
            'name.max' => 'Nama genre tidak boleh lebih dari 255 karakter.',
            'name.unique' => 'Nama genre ini sudah ada.',
            'description.string' => 'Deskripsi harus berupa teks.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => "Validasi Gagal",
                "errors" => $validator->errors()
            ], 422);
        }

        $genre = Genre::create($request->all());

        return response()->json([
            "success" => true,
            "message" => "Genre berhasil ditambahkan",
            "data" => $genre
        ], 201);
    }

    public function show($id)
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                "success" => false,
                "message" => "Genre tidak ditemukan."
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Detail genre ditemukan.",
            "data" => $genre
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                "success" => false,
                "message" => "Genre tidak ditemukan."
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:genres,name,' . $id,
            'description' => 'nullable|string',
        ], [
            'name.required' => 'Nama genre wajib diisi.',
            'name.string' => 'Nama genre harus berupa teks.',
            'name.max' => 'Nama genre tidak boleh lebih dari 255 karakter.',
            'name.unique' => 'Nama genre ini sudah ada.',
            'description.string' => 'Deskripsi harus berupa teks.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => "Validasi Gagal",
                "errors" => $validator->errors()
            ], 422);
        }

        $genre->update($request->all());

        return response()->json([
            "success" => true,
            "message" => "Genre berhasil diperbarui!",
            "data" => $genre
        ], 200);
    }

    public function destroy($id)
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                "success" => false,
                "message" => "Genre tidak ditemukan."
            ], 404);
        }

        $genre->delete();

        return response()->json([
            "success" => true,
            "message" => "Genre berhasil dihapus!"
        ], 200);
    }
}
