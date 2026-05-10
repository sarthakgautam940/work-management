// Shared helpers for artifact components.

export const COLORS = {
  ink: "var(--learn-ink, #0F0F10)",
  inkDim: "var(--learn-ink-dim, #44403C)",
  inkMute: "var(--learn-ink-mute, #78716C)",
  inkGhost: "var(--learn-ink-ghost, #A8A29E)",
  line: "var(--learn-line, #E7E5E4)",
  lineStrong: "var(--learn-line-strong, #D6D3D1)",
  surface: "var(--learn-surface, #FFFFFF)",
  elevated: "var(--learn-elevated, #F4F4F2)",
  accent: "var(--learn-accent, #4F46E5)",
  accentSoft: "var(--learn-accent-soft, #EEF2FF)",
  success: "var(--learn-success, #15803D)",
  warning: "var(--learn-warning, #B45309)",
  danger: "var(--learn-danger, #B91C1C)",
} as const;

// Linearly map an x-value in domain [xMin, xMax] to a pixel x in [pxMin, pxMax].
export function mapX(x: number, xMin: number, xMax: number, pxMin: number, pxMax: number): number {
  return pxMin + ((x - xMin) / (xMax - xMin)) * (pxMax - pxMin);
}
// y-axis is inverted in SVG coordinate space.
export function mapY(y: number, yMin: number, yMax: number, pyMin: number, pyMax: number): number {
  return pyMax - ((y - yMin) / (yMax - yMin)) * (pyMax - pyMin);
}

// Sample a function over [xMin, xMax] producing N points. Skips Infinity / NaN.
export function sample(
  fn: (x: number) => number,
  xMin: number,
  xMax: number,
  n: number = 200,
): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let i = 0; i <= n; i++) {
    const x = xMin + ((xMax - xMin) * i) / n;
    const y = fn(x);
    if (Number.isFinite(y)) out.push([x, y]);
  }
  return out;
}

// Build an SVG path d-string from an array of (x, y) data points,
// already mapped to pixel coordinates.
export function pathD(points: Array<[number, number]>): string {
  if (points.length === 0) return "";
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i][0]} ${points[i][1]}`;
  }
  return d;
}
