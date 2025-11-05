import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import { useCart } from "../../utils/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    apiClient.get(`/products/${id}`).then((res) => setProduct(res.data.data));
  }, [id]);

  if (!product) return <p>Memuat...</p>;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <img
        src={
          product.img_url?.startsWith("http")
            ? product.img_url
            : `http://127.0.0.1:8000/storage/${product.img_url}`
        }
        alt={product.name}
        className="w-full h-80 object-cover rounded-xl"
      />
      <div>
        <h1 className="text-2xl font-bold mb-3">{product.name}</h1>
        <p className="text-gray-700 mb-3">{product.description}</p>
        <h3 className="text-lg font-semibold text-green-600 mb-4">
          Rp {product.price.toLocaleString("id-ID")}
        </h3>
        <button
          onClick={() => addToCart(product)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}
