"use client";
import { ShoppingCart } from "lucide-react";
import { useBaseStore } from "@/stores/base-store";
import dynamic from "next/dynamic";
const CartDrawer = dynamic(() =>
  import("./cart-sheet").then((comp) => comp.CartSheet)
);

export function CartButton() {
  const cartItems = useBaseStore().cartItems;
  const cartItemsSize = Object.keys(cartItems).length;

  return (
    <div className="relative">
      <p className="bg-red-500 rounded-full absolute -top-2 -right-2 text-white h-5 text-sm w-5 flex items-center justify-center">
        {cartItemsSize}
      </p>
      {cartItemsSize > 0 ? (
        <CartDrawer>
          <ShoppingCart />
        </CartDrawer>
      ) : (
        <ShoppingCart />
      )}
    </div>
  );
}
