"use server";

export const runtime = "nodejs";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "../lib/prisma.js";
import "dotenv/config";
import sampleData from "./sample-data.js";

async function main() {
  await prisma.product.deleteMany(); // Clear existing data
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({
    data: sampleData.products,
  });

  await prisma.user.createMany({
    data: sampleData.user,
  });
  console.log("Database seeded successfully.");
}
main();
