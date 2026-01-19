"use server";

import { CartItems } from "@/types";

export async function addItemToCart(CartItems) {
  return {
    success: true,
    message: "Item added to cart",
  };
}
