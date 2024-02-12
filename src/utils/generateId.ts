export default function generateId(prefix?: string, length: number = 18) {
  const valFixedInteger = Math.floor(10 ** (length - 1) + Math.random() * (10 ** length - 10 ** (length - 1) - 1));

  return `${prefix ? `${prefix} -` : ''}${valFixedInteger.toString(36).replace(/[^a-z0-9]+/g, '')}`;
}