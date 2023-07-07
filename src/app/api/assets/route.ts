import { featchApi } from '@/server/api'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const nameFile = searchParams.get('image')

  const filePath = path.join(process.cwd(), `/public/images/${nameFile}`)
  const imageBuffer = fs.createReadStream(filePath)

  // @ts-ignore: Return File in Api
  const response = new NextResponse(imageBuffer)
  response.headers.set('content-type', 'image/png')
  return response
}
