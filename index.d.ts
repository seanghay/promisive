export type DeepAwaited<T> = T extends object ? {
  [P in keyof T]: DeepAwaited<Awaited<T[P]>>
}: Awaited<T>

export function promisive<T>(input: T): DeepAwaited<T>