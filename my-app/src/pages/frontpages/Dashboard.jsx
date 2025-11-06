import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import ProductCard from "../../components/ProductCard";
import { Search } from "lucide-react"; // ikon pencarian lucide-react

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    apiClient.get("/products").then((res) => {
      setProducts(res.data.data || []);
    });
  }, []);

  // Filter produk berdasarkan input pencarian
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-6">
      {/* 🔍 Search Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center border border-green-600 rounded-lg px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-green-500">
          <Search className="text-green-600 mr-2 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* 🔹 Produk Unggulan */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Produk Unggulan
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-center">Produk tidak ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
