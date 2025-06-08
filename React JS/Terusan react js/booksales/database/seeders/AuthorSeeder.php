<?php

namespace Database\Seeders;

use App\Models\Author;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AuthorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Author::create([
            'nama' => 'Tere Liye',
            'photo' => 'tere_liye.jpg',
            'biografi' => 'Penulis novel fiksi populer dengan berbagai genre.'
        ]);

        Author::create([
            'nama' => 'J.R.R. Tolkien',
            'photo' => 'tolkien.jpg',
            'biografi' => 'Pengarang novel fantasi epik seperti The Lord of the Rings.'
        ]);

        Author::create([
            'nama' => 'Andrea Hirata',
            'photo' => 'andrea_hirata.jpg',
            'biografi' => 'Penulis novel inspiratif yang terkenal dengan Laskar Pelangi.'
        ]);

        Author::create([
            'nama' => 'Agatha Christie',
            'photo' => 'agatha_christie.jpg',
            'biografi' => 'Ratu novel kriminal dan misteri.'
        ]);

        Author::create([
            'nama' => 'Jane Austen',
            'photo' => 'jane_austen.jpg',
            'biografi' => 'Novelis Inggris yang terkenal dengan karya-karya tentang kehidupan sosial dan romansa.'
        ]);
    }
}
