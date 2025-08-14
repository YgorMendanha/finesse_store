import { NextResponse } from 'next/server'
import prisma from '~/prisma/client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const auth = request.headers.get('Authentication')

  if (!auth) return new NextResponse('unauthorized', { status: 401 })
  const token = Buffer.from((auth.split(' ')[1] ?? ''), 'base64').toString('utf8')
  if (token !== process.env.NEXT_PUBLIC_TOKEN) return new NextResponse('unauthorized', { status: 401 })

  const id = searchParams.get('id')
  const search = searchParams.get('search')

  if (id) {
    const idNum = Number(id)
    if (Number.isNaN(idNum)) return NextResponse.json(null, { status: 400 })
    const data = await prisma.product.findUnique({ where: { id: idNum } })
    if (!data) return NextResponse.json(null, { status: 404 })
    return NextResponse.json(data)
  }

  if (search) {
    const q = search.trim()
    const data = await prisma.product.findMany({
      where: {
        OR: [
          { namePT: { contains: q, mode: 'insensitive' } },
          { colorPT: { contains: q, mode: 'insensitive' } },
          { nameEN: { contains: q, mode: 'insensitive' } },
          { colorEN: { contains: q, mode: 'insensitive' } }
        ]
      }
    })
    if (!data || data.length === 0) return NextResponse.json([], { status: 404 })
    return NextResponse.json(data)
  }

  const data = await prisma.product.findMany()
  return NextResponse.json(data)
}
