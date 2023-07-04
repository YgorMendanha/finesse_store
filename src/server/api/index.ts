export async function featchApi<T = Response>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${input}`, init)
  const result = data.json()

  return result as T
}
