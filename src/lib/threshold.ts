export type Threshold<T> = [min: number, value: T];

/**
 * Returns the value of the first threshold whose `min` is strictly less than
 * `value` (i.e. `value > min`). Thresholds must be ordered from highest `min`
 * to lowest. Falls back to `fallback` when no threshold matches.
 */
export function pickByThreshold<T>(
  value: number,
  thresholds: Threshold<T>[],
  fallback: T
): T {
  for (const [min, result] of thresholds) {
    if (value > min) return result;
  }
  return fallback;
}
