<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasFactory;

    public static function getGenres()
    {
        return [
            ['id' => 1, 'name' => 'Fiction'],
            ['id' => 2, 'name' => 'Non-Fiction'],
            ['id' => 3, 'name' => 'Fantasy'],
            ['id' => 4, 'name' => 'Biography'],
            ['id' => 5, 'name' => 'Mystery']
        ];
    }
}
