export const RANGE_FALLBACK_ARRAY = [0]

export const range = (start: number, end: number, step = 1) => {
  if (end < start || step < 1) return RANGE_FALLBACK_ARRAY

  const len = Math.floor((end - start) / step) + 1

  return Array(len)
    .fill(undefined)
    .map((_, idx) => start + idx * step)
}
