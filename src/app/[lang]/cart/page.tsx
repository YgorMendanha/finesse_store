import { Metadata } from "next";
import { FormChekout } from "./components/formCheckout";
import { TableCheckout } from "./components/tableCheckout";

export const metadata: Metadata = {
  title: "Carrinho",
};

export default async function CartPage({
  params,
}: {
  params: Promise<{ lang: "pt" | "en" }>;
}) {
  const { lang } = await params;

  return (
    <section className="min-h-[calc(100vh-150px)] container">
      <h1 className="m-5 mt-10 text-3xl">
        {lang === "en" ? "Cart" : "Carrrinho"}
      </h1>
      <section className="flex flex-col-reverse xl:flex-row  ">
        <TableCheckout />
        <FormChekout />
      </section>
    </section>
  );
}
