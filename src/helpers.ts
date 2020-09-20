export function toNumber(
  value: string | number | undefined,
  defaultValue: number
): number {
  if (value === undefined) {
    return defaultValue
  }

  const val = typeof value === 'number' ? value : parseInt(value, 10)

  return Number.isNaN(val) ? defaultValue : val
}
