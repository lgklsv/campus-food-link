export function formatEstimatedTime(min: number, max: number) {
  return min === max ? `${min} min` : `${min}–${max} min`
}
