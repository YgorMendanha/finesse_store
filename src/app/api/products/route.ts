import prisma from '../../../../prisma/client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const id = searchParams.get('id')
  const search = searchParams.get('search')

  if (id) {
    const data = await prisma.product.findUnique({ where: { id: Number(id) } })
    if (!data) {
      return new Response(JSON.stringify(data), {
        status: 404
      })
    }
    return new Response(JSON.stringify(data), {
      status: 200
    })
  }

  if (search) {
    const data = await prisma.product.findMany({
      where: {
        name: { search: search.replace(/ /g, '|') },
        color: { search: search.replace(/ /g, '|') }
      }
    })

    if (!data) {
      return new Response(JSON.stringify(data), {
        status: 404
      })
    }
    return new Response(JSON.stringify(data), {
      status: 200
    })
  }

  const data = await prisma.product.findMany()

  return new Response(JSON.stringify(data), {
    status: 200
  })
}
