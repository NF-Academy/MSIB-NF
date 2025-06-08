<?php

namespace Database\Seeders;

use App\Models\Genre;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Genre::create([
            'name' => 'Fiksi',
            'description' => 'Kategori genre untuk karya sastra naratif yang bersifat imajinatif.',
        ]);

        Genre::create([
            'name' => 'Fantasi',
            'description' => 'Genre yang menggunakan elemen magis, supranatural, dan dunia imajiner sebagai bagian penting dari plot, tema, dan setting.',
        ]);

        Genre::create([
            'name' => 'Drama',
            'description' => 'Genre sastra yang dimaksudkan untuk dipentaskan, biasanya menampilkan konflik dan emosi melalui dialog dan tindakan.',
        ]);

        Genre::create([
            'name' => 'Misteri',
            'description' => 'Genre fiksi yang berpusat pada pemecahan teka-teki atau kejahatan yang tidak diketahui.',
        ]);

        Genre::create([
            'name' => 'Romantis',
            'description' => 'Genre yang fokus pada hubungan emosional dan cinta antara karakter utama.',
        ]);
    }
}
