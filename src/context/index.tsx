"use client";

import { useParams } from "next/navigation";
import { JSX, useCallback, useEffect, useReducer, useState } from "react";
import { createContext } from "use-context-selector";
import Reducers from "./reducer";
import { Notification } from "@/components/partials";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Cart } from "@/server/cart";
import { User } from "@/server/user";
import { ContextType, ProductInterface, State, UserInterface } from "@/types";
import { CartInterface } from "@/types/cart";
import { getDictionary } from "@/utils/functions/getDictionary";

const intialState: State = {
  favoriteProducts: [],
  user: {} as UserInterface,
  loading: { userLoading: false, cartLoading: false },
  cart: {} as CartInterface,
};

export const context = createContext({} as ContextType);

export function ContextProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(Reducers, intialState);
  const [favoriteProductsStorage, setFavoriteProductsStorage] = useLocalStorage<
    ProductInterface[]
  >("Y.M.Finesse-favoriteProducts", []);
  const [userStorage, setUserStorage] = useLocalStorage<UserInterface>(
    "Y.M.Finesse-User",
    {} as UserInterface
  );
  const [cartStorage, setCartStorage] = useLocalStorage<CartInterface>(
    "Y.M.Finesse-Cart",
    {} as CartInterface
  );

  //transition
  const [dict, setDict] = useState(
    {} as {
      invalidInformation: string;
      weWereUnableToLogIn: string;
      welcome: string;
      hasAlreadyBeenRegistered: string;
      weCouldntCreateYourUser: string;
      updatedInformation: string;
      weWereUnableToUpdateYourUser: string;
      thereWasAnErrorCreatingYourCart: string;
      weWereUnableToCreateYourCart: string;
      weWereUnableToUpdateYourCart: string;
      weWereUnableToAddThisProduct: string;
    }
  );

  const { lang }: { lang?: "pt" | "en" } = useParams();

  useEffect(() => {
    selectLang(lang);
  }, [lang]);

  function selectLang(params?: "pt" | "en") {
    if (params) {
      const dict = getDictionary(params);
      setDict(dict);
    }
  }

  // user
  useEffect(() => {
    if (userStorage.id) {
      dispatch({
        type: "USER",
        payload: userStorage,
      });
    } else if (window.sessionStorage.getItem("Y.M.Finesse-User")) {
      dispatch({
        type: "USER",
        payload: JSON.parse(window.sessionStorage.getItem("Y.M.Finesse-User")!),
      });
    }
  }, []);

  const LoginUser = useCallback(
    async (props: {
      data: { email: string; password: string };
      saveLogin: boolean;
    }) => {
      LoadingChange("user", true);
      try {
        const response = await User.Login(props.data);

        if (!response?.data?.id) {
          if (response.code === "401") {
            Notification.user({
              content: dict.invalidInformation,
              type: "error",
            });
          }
          return LoadingChange("user", false);
        }
        if (props.saveLogin) {
          setUserStorage(response.data);
          dispatch({
            type: "USER",
            payload: response.data,
          });
        } else {
          window.sessionStorage.setItem(
            "Y.M.Finesse-User",
            JSON.stringify(response.data)
          );
          dispatch({
            type: "USER",
            payload: response.data,
          });
        }
        Notification.user({
          content: dict.weWereUnableToLogIn + response.data.name,
          type: "success",
        });
      } catch (error) {
        console.log(error);
        Notification.user({ content: dict.weWereUnableToLogIn, type: "info" });
      }
      LoadingChange("user", false);
    },
    []
  );

  const LogoutUser = useCallback(async () => {
    LoadingChange("user", true);
    dispatch({
      type: "USER",
      payload: {} as UserInterface,
    });
    window.localStorage.removeItem("Y.M.Finesse-User");
    window.sessionStorage.removeItem("Y.M.Finesse-User");
    LoadingChange("user", false);
  }, []);

  const CreateUser = useCallback(
    async (props: {
      data: {
        name: string;
        email: string;
        password: string;
        cellphone: string;
      };
      saveLogin: boolean;
    }) => {
      LoadingChange("user", true);
      try {
        const response = await User.Create(props.data);
        if (response.code !== "201") {
          if (response.code === "P2002" && Array.isArray(response.message)) {
            LoadingChange("user", false);
            return response.message.map((input) =>
              Notification.user({
                content: input + dict.hasAlreadyBeenRegistered,
                type: "error",
              })
            );
          }
        }
        if (props.saveLogin) {
          setUserStorage(response.data);
          dispatch({
            type: "USER",
            payload: response.data,
          });
        } else {
          window.sessionStorage.setItem(
            "Y.M.Finesse-User",
            JSON.stringify(response.data)
          );
          dispatch({
            type: "USER",
            payload: response.data,
          });
        }
      } catch (e) {
        console.error(e);

        Notification.user({
          content: dict.weCouldntCreateYourUser,
          type: "info",
        });
      }
      LoadingChange("user", false);
    },
    []
  );

  const EditUser = useCallback(
    async (
      id: number,
      props: {
        name: string;
        email: string;
        oldpassword: string;
        newpassword: string;
        cellphone: string;
      }
    ) => {
      LoadingChange("user", true);
      try {
        const response = await User.Edit(id, {
          ...props,
          oldpassword: Buffer.from(props.oldpassword).toString("base64"),
          newpassword: Buffer.from(props.newpassword).toString("base64"),
        });
        if (!response?.data?.id) {
          if (response.code === "401") {
            Notification.user({
              content: dict.invalidInformation,
              type: "error",
            });
          }
          return LoadingChange("user", false);
        }
        dispatch({
          type: "USER",
          payload: response.data,
        });
        Notification.user({
          content: dict.updatedInformation,
          type: "success",
        });
      } catch (e) {
        console.error(e);
        Notification.user({
          content: dict.weWereUnableToUpdateYourUser,
          type: "info",
        });
      }
      LoadingChange("user", false);
    },
    []
  );

  // cart
  useEffect(() => {
    if (state.user.id && state.cart.id && !state.cart.userId) {
      UpdateCart(cartStorage.id, { userId: state.user.id });
    }
    if (cartStorage.id) {
      dispatch({
        type: "CART",
        payload: cartStorage,
      });
    } else {
      CreateCart();
    }
  }, [state.user.id]);

  const CreateCart = useCallback(async () => {
    LoadingChange("cart", true);
    try {
      const response = await Cart.Create();
      if (response.code !== "201") {
        Notification.user({
          content: dict.thereWasAnErrorCreatingYourCart,
          type: "info",
        });
      }
      if (response.data.id) {
        setCartStorage(response.data);
        dispatch({
          type: "CART",
          payload: response.data,
        });
      }
      LoadingChange("cart", false);
    } catch (e) {
      console.error(e);
      Notification.user({
        content: dict.weWereUnableToCreateYourCart,
        type: "info",
      });
    }
    LoadingChange("cart", false);
  }, []);

  const UpdateCart = useCallback(
    async (
      id: number,
      payload: {
        products?: ProductInterface[];
        userId?: number | null;
      }
    ) => {
      LoadingChange("cart", true);
      try {
        const response = await Cart.Update(id, payload);

        if (response?.data?.id) {
          setCartStorage(response.data);
          dispatch({
            type: "CART",
            payload: response.data,
          });
        }
        if (response.code === "P2025") {
          CreateCart();
        }
        LoadingChange("cart", false);
      } catch (error) {
        console.log(error);
        Notification.user({
          content: dict.weWereUnableToUpdateYourCart,
          type: "info",
        });
      }
      LoadingChange("cart", false);
    },
    []
  );

  const AddToCart = useCallback(
    async (payload: ProductInterface) => {
      LoadingChange("cart", true);
      try {
        const products = Array.isArray(state.cart.products)
          ? [...state.cart.products, payload]
          : [payload];
        const response = await Cart.Update(state.cart.id, { products });

        if (response.data.id) {
          setCartStorage(response.data);
          dispatch({
            type: "CART",
            payload: response.data,
          });
        }
        LoadingChange("cart", false);
      } catch (error) {
        console.log(error);
        Notification.user({
          content: dict.weWereUnableToAddThisProduct,
          type: "info",
        });
      }
      LoadingChange("cart", false);
    },
    [state.cart]
  );

  // favorite products
  useEffect(() => {
    if (favoriteProductsStorage.length > 0) {
      dispatch({
        type: "FAVORITE_PRODUCT",
        payload: favoriteProductsStorage,
      });
    }
  }, []);

  const ChangeFavoriteProducts = useCallback(
    async (product: ProductInterface) => {
      try {
        const favoriteProducts: ProductInterface[] = favoriteProductsStorage;
        const removeFavoriteProducts = favoriteProductsStorage.find(
          (f) => f.id === product.id
        );

        if (removeFavoriteProducts) {
          const newFavoriteProducts = favoriteProductsStorage.filter(
            (favProduct) => favProduct.id !== product.id
          );
          setFavoriteProductsStorage(newFavoriteProducts);
          dispatch({
            type: "FAVORITE_PRODUCT",
            payload: newFavoriteProducts,
          });
          return;
        }
        setFavoriteProductsStorage([...favoriteProducts, product]);
        dispatch({
          type: "FAVORITE_PRODUCT",
          payload: [...favoriteProducts, product],
        });
        return;
      } catch (e) {
        console.log(e);
      }
    },
    [favoriteProductsStorage]
  );

  // loading
  const LoadingChange = useCallback(
    (loading: "user" | "cart", newState: boolean) => {
      switch (loading) {
        case "user":
          dispatch({
            type: "LOADING",
            payload: { ...state.loading, userLoading: newState },
          });
          return;
        case "cart":
          dispatch({
            type: "LOADING",
            payload: { ...state.loading, cartLoading: newState },
          });
          return;

        default:
          return;
      }
    },
    [state.loading.userLoading]
  );

  return (
    <context.Provider
      value={{
        state,
        dispatch,
        ChangeFavoriteProducts,
        CreateUser,
        LoginUser,
        EditUser,
        LogoutUser,
        CreateCart,
        UpdateCart,
        AddToCart,
      }}
    >
      {children}
    </context.Provider>
  );
}
