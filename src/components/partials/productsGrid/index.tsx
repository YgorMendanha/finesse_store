"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineShopping } from "react-icons/ai";
import { z } from "zod";
import { CardProduct } from "../cardProduct";
import { useFavoriteProducts } from "@/hooks/useFavoriteProducts";
import { Product } from "@/server/products";
import { ProductInterface } from "@/types";
import { getDictionary } from "@/utils/functions/getDictionary";

const createFilterFormShema = z.object({
  sort: z.string(),
});

type Inputs = z.infer<typeof createFilterFormShema>;

export function ProductsGrid({
  products,
  favoriteGrid,
}: {
  products: ProductInterface[];
  favoriteGrid?: boolean;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [productsFormated, setProductsFormated] = useState<ProductInterface[]>(
    []
  );

  const { favoriteProducts } = useFavoriteProducts();

  const colorsQuery = searchParams.get("color");
  const categoryQuery = searchParams.get("category");
  const minValueQuery = searchParams.get("minValue");
  const maxValueQuery = searchParams.get("maxValue");
  const sortQuery = searchParams.get("sort");
  const searchQuery = searchParams.get("search");

  const [dict, setDict] = useState(
    {} as {
      standard: string;
      largestToSmallestValue: string;
      lowestToHighestValue: string;
      noProducts: string;
    }
  );

  const { lang }: { lang?: "pt" | "en" } = useParams();

  useEffect(() => {
    selectLang(lang);
  }, [lang]);

  async function selectLang(params?: "pt" | "en") {
    if (params) {
      const dict = getDictionary(params);
      setDict(dict);
    }
  }

  const { register, setValue } = useForm<Inputs>({
    resolver: zodResolver(createFilterFormShema),
  });

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    return params.toString();
  };

  useEffect(() => {
    if (sortQuery) {
      setValue("sort", sortQuery);
    } else {
      setValue("sort", "");
    }
  }, [sortQuery]);

  useEffect(() => {
    searchQueryProducts();
  }, [searchQuery]);

  async function searchQueryProducts() {
    if (searchQuery) {
      const searchProducts = await Product.Search(searchQuery);
      setProductsFormated(searchProducts);
    } else {
      setProductsFormated(products);
    }
  }

  // Filter Products
  useEffect(() => {
    filterProducts();
  }, [
    colorsQuery,
    categoryQuery,
    minValueQuery,
    maxValueQuery,
    sortQuery,
    favoriteGrid,
    favoriteProducts,
  ]);

  async function filterProducts() {
    let productsFormatedTemp: ProductInterface[] = [];

    if (colorsQuery) {
      products.map((product) => {
        JSON.parse(colorsQuery).map((color: string) => {
          if (color === (lang === "en" ? product.colorEN : product.colorPT)) {
            productsFormatedTemp.push(product);
          }
        });
      });
    }

    if (categoryQuery) {
      if (productsFormatedTemp.length > 0) {
        const filterProductsFormated: ProductInterface[] = [];
        productsFormatedTemp.map((product) => {
          JSON.parse(categoryQuery).map((category: string) => {
            if (
              category ===
              (lang === "en" ? product.categortyEN : product.categortyPT)
            ) {
              filterProductsFormated.push(product);
            }
          });
        });
        productsFormatedTemp = filterProductsFormated;
      } else {
        products.map((product) => {
          JSON.parse(categoryQuery).map((category: string) => {
            if (
              category ===
              (lang === "en" ? product.categortyEN : product.categortyPT)
            ) {
              productsFormatedTemp.push(product);
            }
          });
        });
      }
    }

    if (minValueQuery || maxValueQuery) {
      if (productsFormatedTemp.length > 0) {
        const filterProductsFormated = productsFormatedTemp.filter(
          (p) =>
            parseFloat(minValueQuery?.replace(/(\d{1,2})$/, ".$1") || "0") <=
              p.price &&
            p.price <=
              parseFloat(maxValueQuery?.replace(/(\d{1,2})$/, ".$1") || "99999")
        );
        productsFormatedTemp = filterProductsFormated;
      } else {
        const filterProductsFormated = products.filter(
          (p) =>
            parseFloat(minValueQuery?.replace(/(\d{1,2})$/, ".$1") || "0") <=
              p.price &&
            p.price <=
              parseFloat(maxValueQuery?.replace(/(\d{1,2})$/, ".$1") || "99999")
        );
        productsFormatedTemp = filterProductsFormated;
      }
    }

    if (sortQuery) {
      if (productsFormatedTemp.length > 0) {
        const filterProductsFormated =
          sortQuery === "asc"
            ? productsFormatedTemp.sort((a, b) => a.price - b.price)
            : productsFormatedTemp.sort((a, b) => b.price - a.price);

        productsFormatedTemp = filterProductsFormated;
      } else {
        const filterProductsFormated =
          sortQuery === "asc"
            ? products.sort((a, b) => a.price - b.price)
            : products.sort((a, b) => b.price - a.price);

        productsFormatedTemp = filterProductsFormated;
      }
    }

    if (!colorsQuery && !categoryQuery && !minValueQuery && !maxValueQuery) {
      favoriteGrid
        ? setProductsFormated(favoriteProducts)
        : setProductsFormated(products);
    } else {
      favoriteGrid
        ? setProductsFormated(favoriteProducts)
        : setProductsFormated([...new Set(productsFormatedTemp)]);
    }
  }

  return (
    <div className="w-full flex flex-col ">
      <select
        {...register("sort")}
        onChange={(e) =>
          router.push("?" + createQueryString("sort", e.target.value))
        }
        className="ml-auto border-2 text-end appearance-none rounded outline-10 outline-indigo-500 cursor-pointer p-1"
      >
        <option value="">{dict.standard}</option>
        <option value="desc">{dict.largestToSmallestValue}</option>
        <option value="asc">{dict.lowestToHighestValue}</option>
      </select>
      {productsFormated.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-3">
          {productsFormated.map((product) => {
            return (
              <CardProduct
                className="mx-auto"
                product={product}
                key={product.id}
              />
            );
          })}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center flex-col">
          <h3 className="text-xl">{dict.noProducts}</h3>
          <AiOutlineShopping className="text-9xl text-gray-400 " />
        </div>
      )}
    </div>
  );
}
