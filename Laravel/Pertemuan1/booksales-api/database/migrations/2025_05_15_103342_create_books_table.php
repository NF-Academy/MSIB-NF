<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            
            // Foreign key ke tabel authors
            $table->foreignId('author_id')
                ->constrained('authors') // bisa juga tanpa parameter jika nama tabel sesuai
                ->onDelete('cascade');

            // Foreign key ke tabel genres
            $table->foreignId('genre_id')
                ->constrained('genres')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
