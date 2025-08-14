import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { DetailsProducts } from "./components/detailsPrtoducts";
import { Breadcrumb } from "@/components/partials/breadCrumb";
import { Product } from "@/server/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idProduct: string; lang: "pt" | "en" }>;
}): Promise<Metadata> {
  const { lang, idProduct } = await params;
  const product = await Product.GetById({ idProduct });

  return {
    title: lang === "en" ? product.nameEN : product.namePT,
    description: product.description,
    openGraph: {
      title: lang === "en" ? product.nameEN : product.namePT,
      description: product.description,
      url: "https://finesse-store.vercel.app/",
      siteName: "FINESSE",
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
        },
        {
          url: product.images[0],
          width: 1800,
          height: 1800,
          alt: "Image Product",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: lang === "en" ? product.nameEN : product.namePT,
      description: product.description,
      creator: "@YgorMendanha",
      images: [product.images[0]],
    },
  };
}

export const revalidate = 3600;
export default async function Shop({
  params,
}: {
  params: Promise<{ idProduct: string; lang: "pt" | "en" }>;
}) {
  const { lang, idProduct } = await params;
  const product = await Product.GetById({ idProduct: idProduct });

  if (!product) {
    return redirect("/shop");
  }

  return (
    <section className="min-h-[calc(100vh-150px)] flex flex-col justify-center container">
      <Breadcrumb
        className="mb-5"
        URLs={[
          { name: lang === "en" ? "Shop" : "Loja", url: "/shop" },
          { name: lang === "en" ? product.nameEN : product.namePT, url: "#" },
        ]}
      />
      <section className="items-start flex flex-col lg:flex-row">
        <picture className="relative w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] p-5 m-auto lg:m-0">
          <Image
            className="border-4 rounded-md border-indigo-500"
            src={product.images[0]}
            alt="product"
            fill
          />
        </picture>
        <DetailsProducts product={product} />
      </section>
    </section>
  );
}
