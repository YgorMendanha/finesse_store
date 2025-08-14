import { Metadata } from "next";
import { Suspense } from "react";
import { ImSpinner10 } from "react-icons/im";
import { Banner } from "@/components/partials";
import { ProductsGrid } from "@/components/partials/productsGrid";
import { Product } from "@/server/products";

export const metadata: Metadata = {
  title: "Lista de Desejos",
};

export const revalidate = 3600;
export default async function Wishlist({
  params,
}: {
  params: Promise<{ lang: "pt" | "en" }>;
}) {
  const products = await Product.GetAll();
  const { lang } = await params;

  return (
    <>
      <Banner
        className="mb-3"
        title={lang === "en" ? "Wishlist" : "Favoritos"}
      />
      <section className="min-h-screen flex container">
        <Suspense
          fallback={<ImSpinner10 className="animate-spin text-2xl m-auto" />}
        >
          <ProductsGrid favoriteGrid products={products} />
        </Suspense>
      </section>
    </>
  );
}
