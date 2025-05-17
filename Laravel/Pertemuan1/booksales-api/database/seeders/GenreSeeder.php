<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Genre;   // ← Pastikan baris ini ada

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Genre::insert([
            ['name' => 'Fiction'],
            ['name' => 'Non-Fiction'],
            ['name' => 'Science Fiction'],
            ['name' => 'Biography'],
            ['name' => 'Mystery'],
        ]);
    }
}
