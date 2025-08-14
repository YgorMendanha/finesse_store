import { Metadata } from "next";

import { BannerHome } from "@/components/home/banner";
import { BannerCategories } from "@/components/home/bannerCategories";
export const metadata: Metadata = {
  title: "Home",
};

export const revalidate = 3600;



export default async function Home({
  params,
}: {
  params: Promise<{ lang: "pt" | "en" }>;
}) {

  const { lang } = await params;

 

  return (
    <>
      <BannerHome />
    
      <BannerCategories lang={lang} />
    
    </>
  );
}
