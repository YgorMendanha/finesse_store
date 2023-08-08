export async function featchApi<T = Response>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}${input}`, {
    ...init,
    headers: { Authentication: `Bearer ${Buffer.from(process.env.NEXT_PUBLIC_TOKEN!).toString('base64')}` }
  })
  const result = data.json()

  return result as T
}
