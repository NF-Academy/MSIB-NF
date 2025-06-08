<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with('user', 'book')->get();

        if ($transactions->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resource data not found!"
            ], 200);
        }

        return response()->json([
            "success" => true,
            "message" => "Get all resources",
            "data" => $transactions
        ]);
    }

    public function store(Request $request)
    {
        // 1. validator & cek validator
        $validator = Validator::make($request->all(), [
            'book_id' => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'data' => $validator->errors()
            ], 422);
        }

        // 2. generate orderNumber -> unique | ORD-023948302
        $uniqueCode = "ORD-" . Strtoupper(uniqid());

        // 3. ambil user yang sedang login & cek login (apakah ada data user?)
        $user = auth('api')->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized!'
            ], 401);
        }

        // 4. mencari data buku dari request
        $book = Book::find($request->book_id);
        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Book not found!'
            ], 404);
        }

        // 5. cek stok buku
        if ($book->stock < $request->quantity) {
            return response()->json([
                'success' => false,
                'message' => 'Stok barang tidak cukup!'
            ], 400);
        }

        // 6. hitung total harga = price * quantity
        $totalAmount = $book->price * $request->quantity;

        // 7. kurangi stok buku (update)
        $book->stock -= $request->quantity;
        $book->save();

        // 8. simpan data transaksi
        $transactions = Transaction::create([
            'order_number' => $uniqueCode,
            'customer_id' => $user->id,
            'book_id' => $request->book_id,
            'total_amount' => $totalAmount
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Transaction created successfully!',
            'data' => $transactions
        ], 201);
    }

    public function update(Request $request, $id)
    {
        // Cari transaksi yang akan diperbarui
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json([
                "success" => false,
                "message" => "Transaksi tidak ditemukan."
            ], 404);
        }

        // 1. Validasi input
        $validator = Validator::make($request->all(), [
            'book_id' => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'data' => $validator->errors()
            ], 422);
        }

        // 2. Ambil user yang sedang login & cek login (apakah ada data user?)
        $user = auth('api')->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized!'
            ], 401);
        }

        // if ($transaction->customer_id !== $user->id) {
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'Anda tidak berhak mengubah transaksi ini.'
        //     ], 403); 
        // }

        // Dapatkan buku lama yang terkait dengan transaksi ini
        $oldBook = Book::find($transaction->book_id);
        if (!$oldBook) {
            return response()->json([
                'success' => false,
                'message' => 'Buku lama transaksi tidak ditemukan.'
            ], 500);
        }

        // Ambil buku baru dari request
        $newBook = Book::find($request->book_id);
        if (!$newBook) {
            return response()->json([
                'success' => false,
                'message' => 'Buku baru tidak ditemukan!'
            ], 404);
        }

        $oldQuantity = $transaction->quantity;
        $newQuantity = $request->quantity;

        // Penyesuaian stok buku
        if ($oldBook->id === $newBook->id) {
            $stockDifference = $newQuantity - $oldQuantity;

            if ($newBook->stock < $stockDifference) {
                return response()->json([
                    'success' => false,
                    'message' => 'Stok barang tidak cukup untuk perubahan ini!'
                ], 400);
            }
            $newBook->stock -= $stockDifference;
            $newBook->save();
        } else {
            $oldBook->stock += $oldQuantity;
            $oldBook->save();

            // Kurangi stok buku baru
            if ($newBook->stock < $newQuantity) {
                return response()->json([
                    'success' => false,
                    'message' => 'Stok buku baru tidak cukup!'
                ], 400);
            }
            $newBook->stock -= $newQuantity;
            $newBook->save();
        }

        // Hitung total harga baru
        $totalAmount = $newBook->price * $newQuantity;

        // Perbarui data transaksi
        $transaction->update([
            'book_id' => $request->book_id,
            'quantity' => $request->quantity,
            'total_amount' => $totalAmount,
        ]);

        // Muat ulang relasi setelah update jika diperlukan untuk respons
        $transaction->load('user', 'book');

        return response()->json([
            'success' => true,
            'message' => 'Transaksi berhasil diperbarui!',
            'data' => $transaction
        ], 200);
    }

    public function show($id)
    {
        $transaction = Transaction::with('user', 'book')->find($id);

        if (!$transaction) {
            return response()->json([
                "success" => false,
                "message" => "Transaksi tidak ditemukan."
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Detail transaksi ditemukan.",
            "data" => $transaction
        ], 200);
    }

    public function destroy($id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json([
                "success" => false,
                "message" => "Transaksi tidak ditemukan."
            ], 404);
        }

        $transaction->delete();

        return response()->json([
            "success" => true,
            "message" => "Transaksi berhasil dihapus!"
        ], 200);
    }
}
