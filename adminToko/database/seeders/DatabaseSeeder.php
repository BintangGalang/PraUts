<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Hanya buat user jika email belum ada
        User::firstOrCreate(
            ['email' => 'test@example.com'], // cek berdasarkan email
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
                'remember_token' => Str::random(10),
            ]
        );

        // Seeder lain bisa dipanggil di sini
        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
        ]);
    }
}
