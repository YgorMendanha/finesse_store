export interface ProductInterface {
  id: number
  namePT: string
  categortyPT: string
  colorPT: string
  nameEN: string
  categortyEN: string
  colorEN: string
  price: number
  ratings: number
  variants: number[]
  description: string
  stock: number
  images: string[]
  qty?: number
}
