import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import prisma from '../../../../prisma/client'

export async function POST() {
  const headersList = headers()
  const athentication = headersList.get('Authentication')

  if (
    !athentication ||
    Buffer.from(athentication?.split(' ')[1]!, 'base64').toString('utf8') !==
      process.env.NEXT_PUBLIC_TOKEN
  ) {
    return new Response('unauthorized', {
      status: 401
    })
  }

  try {
    const data = await prisma.cart.create({})

    const response = {
      data: {
        id: data.id
      },
      code: '201'
    }
    return new Response(JSON.stringify(response), {
      status: 201
    })
  } catch (error: any) {
    if (error?.code === 'P2002') {
      const response = { code: 'P2002', message: error.meta.target }
      return new Response(JSON.stringify(response), {
        status: 400
      })
    }
  }
}

export async function PATCH(request: Request) {
  const headersList = headers()
  const athentication = headersList.get('Authentication')

  if (
    !athentication ||
    Buffer.from(athentication?.split(' ')[1]!, 'base64').toString('utf8') !==
      process.env.NEXT_PUBLIC_TOKEN
  ) {
    return new Response('unauthorized', {
      status: 401
    })
  }

  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get('id')) || undefined

  try {
    const data: {
      userId?: number
      products?: string
    } = await request.json()

    const response = await prisma.cart.update({
      where: { id },
      data
    })

    const responseFormat = {
      data: response,
      code: '200'
    }

    return new Response(JSON.stringify(responseFormat), {
      status: 200
    })
  } catch (error: any) {
    console.log(error)
    if (error?.code === 'P2002') {
      const response = { code: 'P2002', message: error.meta.target }
      return new Response(JSON.stringify(response), {
        status: 400
      })
    }
  }
}
