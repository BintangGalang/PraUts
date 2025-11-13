import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import ProductCard from "../../components/ProductCard";
import { Search, PackageX } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* 🔍 Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0 relative">
            Dashboard Produk
            <span className="block w-16 h-1 bg-green-600 rounded-full mt-1"></span>
          </h1>

          <div className="w-full sm:w-80">
            <div className="flex items-center border border-green-600 rounded-full px-4 py-2 bg-white shadow-md focus-within:ring-2 focus-within:ring-green-400 transition">
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
        </div>

        {/* 🔹 Produk Unggulan */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
            🌟 Produk Unggulan
          </h2>
          <p className="text-gray-500 text-sm">
            {filteredProducts.length} produk ditemukan
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <PackageX className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-lg font-medium">Produk tidak ditemukan</p>
            <p className="text-sm text-gray-400 mt-1">
              Coba ubah kata kunci pencarian kamu.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="transform hover:scale-[1.03] transition-transform duration-300"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
