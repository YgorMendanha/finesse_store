import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import prisma from '../../../../prisma/client'

export async function POST(request: Request) {
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

  const payload: {
    name: string
    email: string
    password: string
    cellphone: string
  } = await request.json()

  const { email, name, password } = payload

  if (
    !name ||
    !password ||
    !email ||
    name.length === 0 ||
    password.length === 0 ||
    email.length === 0
  ) {
    return new Response('Invalid Payload', {
      status: 400
    })
  }

  try {
    const data = await prisma.user.create({ data: payload })

    const response = {
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        cellphone: data.cellphone
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

export async function GET(request: Request) {
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
  const email = searchParams.get('email')
  const password = searchParams.get('password')

  if (!password || !email || password.length === 0 || email.length === 0) {
    return new Response('Invalid Payload', {
      status: 400
    })
  }

  try {
    const data = await prisma.user.findUnique({ where: { email } })

    if (data?.password !== password) {
      const response = { code: '401', message: 'Invalid Password' }
      return new Response(JSON.stringify(response), {
        status: 401
      })
    }

    const response = {
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        cellphone: data.cellphone
      },
      code: '200'
    }
    return new Response(JSON.stringify(response), {
      status: 200
    })
  } catch (error: any) {
    console.log(error)
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

  const payload: {
    name: string
    email: string
    oldpassword: string
    newpassword: string
    cellphone: string
  } = await request.json()

  const { email, name, newpassword, oldpassword } = payload
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get('id')) || undefined

  if (!name || !email || name.length === 0 || email.length === 0) {
    return new Response('Invalid Payload', {
      status: 400
    })
  }

  try {
    var data: {
      name: string
      email: string
      oldpassword?: string
      newpassword?: string
      password?: string
      cellphone: string
    } = payload

    if (newpassword.length > 0 && oldpassword.length > 0) {
      const user = await prisma.user.findUnique({ where: { id } })
      if (user?.password === oldpassword) {
        data = { ...payload, password: newpassword }
        delete data.oldpassword
        delete data.newpassword
      } else {
        const response = { code: '401', message: 'Invalid Password' }
        return new Response(JSON.stringify(response), {
          status: 401
        })
      }
    } else {
      delete data.oldpassword
      delete data.newpassword
    }

    const response = await prisma.user.update({ where: { id }, data })

    const responseFormat = {
      data: {
        id: response.id,
        name: response.name,
        email: response.email,
        cellphone: response.cellphone
      },
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
