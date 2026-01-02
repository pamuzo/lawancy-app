import { getLatestProducts } from "@/lib/actions/product.action";
import ProductList from "@/components/shared/product/productList";

export default async function Home() {
  const latestProducts = await getLatestProducts();
  return (
    <main>
      <h1>Welcome to Lawancy App</h1>
      <ProductList data={latestProducts} title="New Products" limit={4} />
    </main>
  );
}
