type DeepAwaited<T> = 
  T extends  (...args: any[]) => any ? T:
  T extends PromiseLike<infer U> 
  ? DeepAwaited<U> : T extends ArrayLike<infer E> 
  ? Array<DeepAwaited<E>> : T extends object ? {
    [K in keyof T]: DeepAwaited<T[K]>
  }: T;

export function promisive<T>(input: T): Promise<DeepAwaited<T>>