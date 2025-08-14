"use client";

import { Suspense } from "react";
import { BsBag, BsFillHeartFill } from "react-icons/bs";
import { ImSpinner10 } from "react-icons/im";
import Menu from "./partials/menu";
import SearchImput from "./partials/searchImput";
import { SelectLang } from "./partials/selectLang";
import { UserModalComponent } from "./partials/userModal";
import { CustomLink } from "@/components/partials";
import { getDictionary } from "@/utils/functions/getDictionary";
import { Product } from "@/server/products";

export default function Header({ lang }: { lang: "pt" | "en" }) {
  const dict = getDictionary(lang);

  const getget = async () => {
    const products = await Product.GetAll();
    console.log(products);
  };

  return (
    <header className="w-full border-b-2 bg-slate-50 sticky top-0 z-50 border-indigo-500">
      <div className="container h-20 flex justify-between items-center ">
        <section className="flex items-center">
          <Suspense
            fallback={<ImSpinner10 className="animate-spin text-2xl m-auto" />}
          >
            <Menu />
          </Suspense>
          <CustomLink href={"/"}>
            <b className="text-4xl " onClick={getget}>
              FINESSE
            </b>
          </CustomLink>
          <nav className="mx-5 items-center hidden md:flex">
            <CustomLink href={"/shop"}>
              <p className="mx-4 text-lg hover:border-b-2 hover:border-indigo-500">
                {dict.shop}
              </p>
            </CustomLink>
            <CustomLink
              href={"/contact"}
              className="mx-4 cursor-pointer text-lg hover:border-b-2 hover:border-indigo-500"
            >
              {dict.contact}
            </CustomLink>
          </nav>
        </section>
        <section className="flex text-xl items-center">
          <Suspense
            fallback={<ImSpinner10 className="animate-spin text-2xl m-auto" />}
          >
            <SearchImput className="hidden md:inline-block" />
          </Suspense>
          <CustomLink
            aria-label={dict.visitYourFavoriteProducts}
            href={"/wishlist"}
          >
            <BsFillHeartFill className="mx-4 hidden md:inline-block" />
          </CustomLink>
          <CustomLink aria-label={dict.viewTheItemsInYourCart} href={"/cart"}>
            <BsBag />
          </CustomLink>
          <UserModalComponent />
          <SelectLang />
        </section>
      </div>
    </header>
  );
}
