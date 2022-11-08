/*
 * @Description:
 * @Author: wangchao
 * @Date: 2022-11-08 20:50:11
 */
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency"
});
export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
