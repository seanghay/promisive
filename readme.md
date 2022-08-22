# Promisive

Recursive `Promise`.

[![test](https://github.com/seanghay/promisive/actions/workflows/test.yml/badge.svg)](https://github.com/seanghay/promisive/actions/workflows/test.yml)
[![npm-publish](https://github.com/seanghay/promisive/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/seanghay/promisive/actions/workflows/npm-publish.yml)
[![npm](https://shields.io/npm/v/promisive)](https://npm.im/promisive)

```js
import { promisive } from "promisive";

await promisive({
  a: {
    b: [
      Promise.resolve({
        a: [{ a: Promise.resolve(1) }],
      }),
      Promise.resolve({
        a: [{ a: Promise.resolve(2) }],
      }),
    ],
  },
});

// this will resolve to

{
  "a": {
    "b": [
      {
        "a": [
          {
            "a": 1
          }
        ]
      },
      {
        "a": [
          {
            "a": 2
          }
        ]
      }
    ]
  }
}
```

### License

MIT

