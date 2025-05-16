<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book; // ← penting

class BookSeeder extends Seeder
{
    public function run(): void
    {
        Book::insert([
            ['title' => 'Harry Potter and the Sorcerer\'s Stone', 'author_id' => 1],
            ['title' => '1984', 'author_id' => 2],
            ['title' => 'The Hobbit', 'author_id' => 3],
            ['title' => 'Murder on the Orient Express', 'author_id' => 4],
            ['title' => 'The Da Vinci Code', 'author_id' => 5],
        ]);
    }
}
