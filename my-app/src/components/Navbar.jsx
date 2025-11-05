import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../utils/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          My Shop
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Beranda
          </Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
            <ShoppingCart />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
