import { Metadata } from "next";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import { ProductsSection } from "@/components/home";
import { BannerHome } from "@/components/home/banner";
import { BannerCategories } from "@/components/home/bannerCategories";
import { Product } from "@/server/products";
import ShuffleProducts from "@/utils/functions/ShuffleProducts";
import { getDictionary } from "@/utils/functions/getDictionary";

export const metadata: Metadata = {
  title: "Home",
};

export const revalidate = 3600;

async function getDeviceType() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") ?? "";

  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  const deviceType = result.device?.type ?? "desktop"; // 'mobile' | 'tablet' | 'desktop'
  return { deviceType };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "pt" | "en" }>;
}) {
  const products = await Product.GetAll();
  const { lang } = await params;

  const dict = getDictionary(lang);
  const promotionProduct = ShuffleProducts(products);

  const { deviceType } = await getDeviceType();

  return (
    <>
      <BannerHome />
      <ProductsSection
        title={dict.popularProducts}
        products={promotionProduct}
        deviceType={deviceType}
      />
      <BannerCategories lang={lang} />
      <ProductsSection
        title={dict.ourProducts}
        products={products}
        deviceType={deviceType}
      />
    </>
  );
}
