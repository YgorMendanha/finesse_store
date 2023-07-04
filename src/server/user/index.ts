import { featchApi } from '../api'

export class User {
  static async login(props: { user: string; password: string }) {
    const reponse = await featchApi('api/user', {
      method: 'POST',
      body: JSON.stringify(props)
    })

    return reponse
  }
}
