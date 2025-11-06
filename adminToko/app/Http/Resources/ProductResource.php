<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request): array
    {
        // Format data produk
        return [
        'id' => $this->product_id,
        'name' => $this->name,
        'slug' => $this->slug,
        'description' => $this->description,
        'price' => (float) $this->price,
        'stock' => (int) $this->stock,
        'img'         => $this->img,
        'img_url' => $this->img ? url('storage/' . $this->img) : null,
        'category' => [
        'id' => $this->category_id,
        'name' => $this->category?->category,
        ],
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
        ];
    }
}
