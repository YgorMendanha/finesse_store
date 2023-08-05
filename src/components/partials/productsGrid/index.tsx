import { ProductInterface } from '@/types/products'
import { CardProduct } from '../cardProduct'

export function ProductsGrid({ products }: { products: ProductInterface[] }) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3">
      {products.map((product) => {
        return <CardProduct className="mx-auto" product={product} key={product.id} />
      })}
    </div>
  )
}
