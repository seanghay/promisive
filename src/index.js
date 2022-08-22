import { flatten, unflatten } from 'flat'

const isObject = value => value !== null &&
  (typeof value === 'object' || typeof value === 'function');

function isPromise(value) {
  return value instanceof Promise ||
    (
      isObject(value) &&
      typeof value.then === 'function' &&
      typeof value.catch === 'function'
    );
}

export async function promisive(input) {

  if (input == null) {
    return input
  }

  if (Array.isArray(input)) {
    return Promise.all(
      input.map(
        item => promisive(item),
      )
    );
  }

  if (isPromise(input)) {
    return input.then(resolved => promisive(resolved));
  }

  if (isObject(input)) {
    const flattened = flatten(input);
    const entries = await Promise.all(
      Object.entries(flattened).map(([key, value]) => {
        if (isPromise(value)) {
          return promisive(value).then(resolved => [key, resolved])
        }
        return [key, value]
      })
    )
    return unflatten(Object.fromEntries(entries))
  }

  return input;
}
