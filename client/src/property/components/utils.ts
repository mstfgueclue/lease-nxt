export function formatPrice(num: number) {
  return new Intl.NumberFormat("de-DE").format(num);
}
