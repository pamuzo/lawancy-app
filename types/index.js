import {
  cartItemSchema,
  insertCartSchema,
  insertProductSchema,
} from "@/lib/validator";
import { z } from "zod";

export const Product = z.object({
  ...insertProductSchema.shape,
  id: z.string(),
  name: z.string(),
  rating: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const Cart = z.object({ insertCartSchema });
export const CartItems = z.object({ cartItemSchema });
