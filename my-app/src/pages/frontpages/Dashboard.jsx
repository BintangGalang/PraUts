import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import ProductCard from "../../components/ProductCard";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiClient.get("/products").then((res) => {
      setProducts(res.data.data || []);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Produk Unggulan</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">Memuat produk...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
