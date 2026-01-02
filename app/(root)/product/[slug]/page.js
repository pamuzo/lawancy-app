export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/actions/product.action";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import ProductImages from "@/components/shared/product/product-images";

const ProductDetailsPage = async ({ params }) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return (
    <>
      <section>
        <div className="grid grid-col-1 md:grid-cols-5">
          {/* Image colum */}
          <div className="md:col-span-2">
            <ProductImages images={product.imageUrl} />
          </div>

          {/* Product details column */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className="h3-bold">{product.name}</h1>
              <p>
                {product.rating} of {product.numReviews} reviews
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 ">
                <p className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2 text-center font-medium">
                  ${product.price}
                </p>
              </div>
            </div>
            <div className="mt-10">
              <p className="font-semibold">Description</p>
              <p className="mt-2 text-sm text-gray-600">
                {product.description}
              </p>
            </div>
          </div>
          {/* Action Column  */}
          <div>
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex justify-between">
                  <div>Price:</div>
                  <p className="font-semibold">${product.price}</p>
                </div>

                <div className="mb-2 flex justify-between">
                  <div>Status:</div>
                  {product.stock > 0 ? (
                    <Badge variant={"outline"}>In Stock</Badge>
                  ) : (
                    <Badge variant={"destructive"}>Out of Stock</Badge>
                  )}
                </div>
                {product.stock > 0 && (
                  <Button className="w-full py-2 rounded-md">
                    Add to Cart
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductDetailsPage;
