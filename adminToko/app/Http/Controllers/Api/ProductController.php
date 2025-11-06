<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all products with their category
        $products = Product::with('category')->paginate(10);
        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    $request->validate([
        'name'        => 'required|string|max:150',
        'description' => 'nullable|string',
        'category_id' => 'required|exists:categories,category_id',
        'price'       => 'required|numeric',
        'stock'       => 'required|integer',
        'img'         => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $imgPath = null;

    if ($request->hasFile('img')) {
        // simpan ke storage/app/public/products
        $imgPath = $request->file('img')->store('products', 'public');
    }

    $product = Product::create([
        'name'        => $request->name,
        'description' => $request->description,
        'category_id' => $request->category_id,
        'price'       => $request->price,
        'stock'       => $request->stock,
        'img'         => $imgPath, // simpan path
        'slug'        => Str::slug($request->name),
    ]);

    return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Get product by ID with its category
        $product = Product::with('category')->findOrFail($id);
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
    $product = Product::findOrFail($id);

    $request->validate([
        'name'        => 'required|string|max:150',
        'description' => 'nullable|string',
        'category_id' => 'required|exists:categories,category_id',
        'price'       => 'required|numeric',
        'stock'       => 'required|integer',
        'img'         => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $imgPath = $product->img; // default tetap pakai gambar lama

    if ($request->hasFile('img')) {
        $imgPath = $request->file('img')->store('products', 'public');
    }

    $product->update([
        'name'        => $request->name,
        'description' => $request->description,
        'category_id' => $request->category_id,
        'price'       => $request->price,
        'stock'       => $request->stock,
        'img'         => $imgPath,
        'slug'        => \Illuminate\Support\Str::slug($request->name),
    ]);

    return new ProductResource($product);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Find and delete the product
        $product = Product::find($id);

        if ($product) {
            $product->delete();
            return response()->json(['message' => 'Product deleted successfully']);
        }

        return response()->json(['message' => 'Product not found'], 404);
    }
}
