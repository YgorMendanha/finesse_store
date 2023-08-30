import en from '@/dictionary/en.json'
import pt from '@/dictionary/pt.json'

export const getDictionary = (locale: 'pt' | 'en') => {
  if (locale === 'pt') {
    return pt
  }
  return en
}
