import { featchApi } from "../api";
import { ProductInterface } from "@/types";
import { Response } from "@/types/response";

export class Cart {
  static async Create() {
    const reponse: Response = await featchApi("/api/cart", {
      method: "POST",
    });
    return reponse;
  }

  static async Update(
    id: number,
    payload: {
      products?: ProductInterface[];
      userId?: number | null;
    }
  ) {
    const reponse: Response = await featchApi(`/api/cart?id=${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return reponse;
  }

  static async Edit(
    id: number,
    payload: {
      name: string;
      email: string;
      oldpassword?: string;
      newpassword?: string;
      cellphone: string;
    }
  ) {
    const reponse: Response = await featchApi(`/api/user?id=${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return reponse;
  }
}
