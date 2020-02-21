export default function currencyFilter(value, currency = 'RUB') {
  return Intl.NumberFormat('ru-GB', {
    style: 'currency',
    currency
  }).format(value)
}
