export function RoundNumber (score: number): number {
  if (score === 0) return 0; // hindari division by zero / NaN
  return Number(score.toFixed(0));
}

export function TitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}