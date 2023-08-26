import { Metadata } from 'next'
import Form from './components/form'

export const metadata: Metadata = {
  title: 'Contato'
}

export default async function ContactPage() {
  return (
    <section className="min-h-[calc(100vh-150px)] py-5 w-full flex flex-col container ">
      <b className="text-7xl font-dos mx-auto mt-5">FINESSE</b>
      <div className="flex my-auto justify-center">
        <p className="w-1/2 text-justify mx-5 flex items-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, architecto reiciendis
          maiores fuga assumenda atque! Consequatur, nihil amet. Quisquam architecto, voluptatibus
          quod impedit voluptates quasi ad nihil odit adipisci eveniet. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quaerat odit perferendis harum pariatur voluptates vel
          suscipit itaque impedit perspiciatis voluptatem nesciunt corporis nobis, reiciendis
          voluptas, quo exercitationem architecto voluptatum earum?
        </p>
        <Form />
      </div>
    </section>
  )
}
