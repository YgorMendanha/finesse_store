import { Metadata } from 'next'
import { FormChekout } from './components/formCheckout'
import { TableCheckout } from './components/tableCheckout'

export const metadata: Metadata = {
  title: 'Carrinho'
}

export default function CartPage() {
  return (
    <section className="min-h-[calc(100vh-150px)] container">
      <h1 className="m-5 mt-10 text-3xl">Carrinho</h1>
      <section className="flex">
        <TableCheckout />
        <FormChekout />
      </section>
    </section>
  )
}
