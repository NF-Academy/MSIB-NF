<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Book::create([
            'title' => 'Pulang',
            'description' => 'Petualangan seorang pemuda kembali ke desa kelahirannya.',
            'price' => 40000,
            'stock' => 15,
            'cover_photo' => 'pulang.jpg',
            'genre_id' => 1,
            'author_id' => 1,
        ]);

        Book::create([
            'title' => 'Bumi',
            'description' => 'Novel petualangan dengan elemen fantasi.',
            'price' => 55000,
            'stock' => 10,
            'cover_photo' => 'bumi.jpg',
            'genre_id' => 2,
            'author_id' => 2,
        ]);

        Book::create([
            'title' => 'Laskar Pelangi',
            'description' => 'Kisah inspiratif tentang perjuangan anak-anak di Belitung.',
            'price' => 60000,
            'stock' => 25,
            'cover_photo' => 'laskar.jpg',
            'genre_id' => 3,
            'author_id' => 3,
        ]);

        Book::create([
            'title' => 'Pembunuhan di Orient Express',
            'description' => 'Novel misteri klasik karya Agatha Christie.',
            'price' => 45000,
            'stock' => 8,
            'cover_photo' => 'orient.jpg', // Perbaikan nama file
            'genre_id' => 4,
            'author_id' => 4,
        ]);

        Book::create([
            'title' => 'Pride and Prejudice',
            'description' => 'Kisah cinta dan prasangka di kalangan masyarakat Inggris abad ke-19.',
            'price' => 50000,
            'stock' => 15,
            'cover_photo' => 'pride.jpg',
            'genre_id' => 5,
            'author_id' => 5,
        ]);
    }
}
