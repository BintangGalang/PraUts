<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::firstOrCreate(
            ['slug' => 'laptop-gaming-rog'], // cek berdasarkan slug
            [
                'category_id' => 1,
                'name' => 'Laptop Gaming ROG',
                'description' => 'Laptop gaming high performance dengan RTX 4060',
                'price' => 25000000,
                'stock' => 10,
                'img' => 'products/laptop.jpg',
            ]
        );

        // Tambahkan product lain dengan cara yang sama
    }
}
