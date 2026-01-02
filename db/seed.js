"use server";

export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import "dotenv/config";
import sampleData from "./sample-data.js";

async function main() {
  await prisma.product.deleteMany(); // Clear existing data

  await prisma.product.createMany({
    data: sampleData.products,
  });
  console.log("Database seeded successfully.");
}
main();
