import { getLatestProducts } from "@/lib/actions/product.action";
import ProductList from "@/components/shared/product/productList";
import Hero from "@/components/Hero";
import { signOut } from "@/auth";
import { signOutUser } from "@/lib/actions/user.action";
export const runtime = "nodejs";

export default async function Home() {
  const latestProducts = await getLatestProducts();
  return (
    <main>
      <Hero />
      <ProductList data={latestProducts} title="New Products" limit={4} />
    </main>
  );
}
