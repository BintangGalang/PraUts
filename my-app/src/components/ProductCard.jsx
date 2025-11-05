import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col">
      <img
        src={
          product.img_url?.startsWith("http")
            ? product.img_url
            : `http://127.0.0.1:8000/storage/${product.img_url}`
        }
        alt={product.name}
        className="h-40 w-full object-cover rounded-lg mb-3"
      />
      <h3 className="font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">
        Rp {product.price.toLocaleString("id-ID")}
      </p>

      <div className="mt-auto flex justify-between items-center">
        <Link
          to={`/product/${product.id}`}
          className="text-blue-600 text-sm hover:underline"
        >
          Lihat Detail
        </Link>
        <button
          onClick={() => addToCart(product)}
          className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition"
        >
          + Keranjang
        </button>
      </div>
    </div>
  );
}
