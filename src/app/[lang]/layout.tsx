import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Layout } from "@/components/layout";
import { ContextProvider } from "@/context";

import "./globals.css";
import "react-multi-carousel/lib/styles.css";
import "react-slideshow-image/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";

const rob = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: "500",
  variable: "--font-rob",
});

export const metadata: Metadata = {
  title: {
    template: "%s - FINESSE",
    default: "FINESSE",
  },
  description:
    "Exemplo de e-commerce desenvolvido para o portifolio do Ygor Mendanha",
  keywords: "e-commerce, Ygor Mendanha, next 13",
  authors: [{ name: "Ygor Mendanha", url: "https://www.ygormendanha.com.br" }],
  openGraph: {
    title: "FINESSE",
    description:
      "Exemplo de e-commerce desenvolvido para o portifolio do Ygor Mendanha",
    url: "https://finesse-store.vercel.app/",
    siteName: "FINESSE",
    images: [
      {
        url: "/images/banner/product-3-1.png",
        width: 800,
        height: 800,
      },
      {
        url: "/images/banner/product-3-1.png",
        width: 1800,
        height: 1800,
        alt: "Image Product",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FINESSE",
    description:
      "Exemplo de e-commerce desenvolvido para o portifolio do Ygor Mendanha",
    creator: "@YgorMendanha",
    images: ["/images/banner/product-3-1.png"],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: "pt" | "en" }>;
}) {
  const { lang } = await params;
  let formatLang: "pt-BR" | "en-US" = "pt-BR";
  if (lang === "en") {
    formatLang = "en-US";
  } else if (lang === "pt") {
    formatLang = "pt-BR";
  }

  return (
    <html>
      <body lang={formatLang} className={`${rob.className}`}>
        <ContextProvider>
          <Layout lang={lang}>{children}</Layout>
        </ContextProvider>
        <Analytics />
      </body>
    </html>
  );
}
