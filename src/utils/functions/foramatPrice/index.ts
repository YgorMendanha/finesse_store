interface formatPriceProps {
  value: number
  currency: 'USD' | 'BRL'
  language: 'pt-BR' | 'en-US'
}

export function formatPrice({ value = 0, currency, language }: formatPriceProps) {
  const formated = value.toLocaleString(language, { style: 'currency', currency })
  return formated
}
