import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { ZodError } from "zod";
import * as z from "zod";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// convert a prima date to string
export function covertToPlainObject(value) {
  return JSON.parse(JSON.stringify(value));
}

// Format number to decimal Places
export function formatToDecimalPlaces(num) {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

{
  /* Left side - Image */
}
export function LeftMotion({ children, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="hidden md:flex md:w-1/2 bg-cover bg-center"
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function RightMotion({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-1 flex-col  items-center px-6 py-14 "
    >
      {children}
    </motion.div>
  );
}

// Format error message

export async function formatError(error) {
  /* ---------------- Zod Validation ---------------- */

  if (error instanceof ZodError) {
    let messages = "";
    for (const e of error.issues) {
      messages += e.message + ". ";
    }
    return messages.trim();
  }
  // -------------------------Prisma Validation---------------
  if (error.name === "PrismaClientKnownRequestError") {
    if (error.code === "P2002") {
      return "This email is already registered😡";
    }
  }
  return "An error occurred during sign up.😠";
}
