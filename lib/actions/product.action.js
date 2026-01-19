"use server";

import { covertToPlainObject } from "../utils";
import { prisma } from "@/lib/prisma"; // get latest products
//import { prisma } from "../db/prisma";

// get alatest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    // take: 5,
  });
  return covertToPlainObject(data);
}

// get Sigle Product by Slug
export async function getProductBySlug(slug) {
  return await prisma.product.findUnique({
    where: { slug },
  });
}
