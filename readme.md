# Promisive

Recursive `Promise`.

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

// will resolve to

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

