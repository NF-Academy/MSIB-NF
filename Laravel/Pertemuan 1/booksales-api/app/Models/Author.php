<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    public static function getAuthors()
    {
        return [
            ['id' => 1, 'name' => 'J.K. Rowling'],
            ['id' => 2, 'name' => 'George Orwell'],
            ['id' => 3, 'name' => 'J.R.R. Tolkien'],
            ['id' => 4, 'name' => 'Isaac Asimov'],
            ['id' => 5, 'name' => 'Agatha Christie']
        ];
    }
}
