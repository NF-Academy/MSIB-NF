<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('admin123'),
            'role' => 'admin'
        ]);

        User::create([
            'name' => 'customer1',
            'email' => 'customer1@example.com',
            'password' => bcrypt('customer123'),
            'role' => 'customer'
        ]);

        User::create([
            'name' => 'customer2',
            'email' => 'customer2@example.com',
            'password' => bcrypt('customer123'),
            'role' => 'customer'
        ]);
    }
}
