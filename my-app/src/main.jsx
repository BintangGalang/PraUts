import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./utils/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductProvider } from "./utils/ProductContext";
import { AuthProvider } from "./utils/AuthContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 4. Bungkus aplikasi Anda dengan QueryClientProvider */}
      <QueryClientProvider client={queryClient}>
           <AuthProvider>
        <CartProvider>
          {/* 5. Bungkus aplikasi Anda dengan ProductProvider */}
          <ProductProvider>
            <App />
            <Toaster position="top-right" />
          </ProductProvider>
        </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);