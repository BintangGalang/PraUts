import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";
import { ShoppingCart, Eye } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      {/* 🖼️ Gambar Produk */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={
            product.img_url?.startsWith("http")
              ? product.img_url
              : `http://127.0.0.1:8000/storage/${product.img_url}`
          }
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* 🔘 Overlay saat hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-3">
          <Link
            to={`/product/${product.id}`}
            className="p-2 bg-white/90 rounded-full shadow hover:bg-green-600 hover:text-white transition-all"
            title="Lihat Detail"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="p-2 bg-white/90 rounded-full shadow hover:bg-green-600 hover:text-white transition-all"
            title="Tambah ke Keranjang"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 🧾 Info Produk */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg truncate">
          {product.name}
        </h3>
        <p className="text-green-600 font-bold text-base mt-1">
          Rp {product.price.toLocaleString("id-ID")}
        </p>

        {/* Badge kategori */}
        {product.category?.name && (
          <span className="inline-block mt-3 bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
            {product.category.name}
          </span>
        )}
      </div>

      {/* 🔹 Efek bayangan tambahan di bawah kartu */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
}
