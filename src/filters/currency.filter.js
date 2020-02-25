import store from '@/store'

export default function currencyFilter(value, currency = 'RUB') {
  const locale = store.getters['info/info'].locale || 'en-US'

  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(value)
}
