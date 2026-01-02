import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

export default function ProductCard({ product: Product }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link
          href={`/product/${Product.slug}`}
          className="text-lg font-medium hover:underline"
        >
          <Image
            src={Product.imageUrl[0]}
            alt={Product.name}
            width={300}
            height={300}
            priority={true}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="text-xs">{Product.brand}</div>
        <Link
          href={`/product/${Product.slug}`}
          className="text-sm hover:underline"
        >
          <h2 className="text-sm font-medium">{Product.name} </h2>
        </Link>
        <div className="flex-between gap-4">
          <p>{Product.rating}⭐</p>
          {Product.stock > 0 ? (
            <p className="text-green-600 font-bold">
              <span className="">$</span>
              {Product.price}
            </p>
          ) : (
            <p className="text-red-600 font-medium">Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
