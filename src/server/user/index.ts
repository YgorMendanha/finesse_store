import { featchApi } from '../api'
import { Response } from '@/types/response'

export class User {
  static async Create(payload: {
    name: string
    email: string
    password: string
    cellphone: string
  }) {
    const reponse: Response = await featchApi('/api/user', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    return reponse
  }

  static async Login(payload: { email: string; password: string }) {
    const reponse: Response = await featchApi(
      `/api/user?email=${payload.email}&password=${payload.password}`,
      {
        method: 'GET'
      }
    )
    return reponse
  }

  static async Edit(
    id: number,
    payload: {
      name: string
      email: string
      oldpassword?: string
      newpassword?: string
      cellphone: string
    }
  ) {
    const reponse: Response = await featchApi(`/api/user?id=${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    })
    return reponse
  }
}
