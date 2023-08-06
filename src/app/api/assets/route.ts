import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import { featchApi } from '@/server/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const nameFile = searchParams.get('image')

  const filePath = path.join(process.cwd(), `/public/images/products/${nameFile}`)
  const imageBuffer = fs.createReadStream(filePath)

  // @ts-ignore: Return File in Api
  const response = new NextResponse(imageBuffer)
  response.headers.set('content-type', 'image/jpg')
  response.headers.set('Cache-Control', 's-maxage=31536000')
  return response
}
