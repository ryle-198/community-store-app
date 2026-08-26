export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function isValidPhone(value: string): boolean {
  return /^[\d+\-\s()]{7,}$/.test(value.trim());
}

export function isPositiveNumber(value: string): boolean {
  const n = Number(value);
  return !Number.isNaN(n) && n >= 0;
}
