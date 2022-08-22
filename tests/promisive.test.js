import { promisive } from '..'
import { describe, it, expect } from 'vitest'

describe('promisive', () => {

  it('should resolve non object', async () => {
    expect(await promisive(1)).toBe(1);
    expect(await promisive(null)).toBe(null);
    expect(await promisive(undefined)).toBe(undefined);
  })

  it('should resolve array', async () => {

    console.log(
      JSON.stringify(
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
      }),
      0,
      2
    ))

    const result = await promisive([
      { a: Promise.resolve(1) },
      { a: { b: [Promise.resolve(1)] } },
      {
        a: {
          b: [
            Promise.resolve({
              a: [
                { a: Promise.resolve(1) }
              ]
            }),
            Promise.resolve({
              a: [
                { a: Promise.resolve(1) }
              ]
            })
          ]
        }
      },
    ])

    expect(result).toEqual([
      { a: 1 },
      { a: { b: [1] } },
      {
        a: {
          b: [
            { a: [{ a: 1 }] },
            { a: [{ a: 1 }] }
          ]
        }
      }
    ])
  })

  it('should resolve nested promises', async () => {
    const input = {
      a: 1,
      b: 2,
      c: (async () => 3)(),
      d: {
        e: {
          f: {
            g: [
              Promise.resolve(4),
              Promise.resolve(5),
              Promise.resolve(6),
            ],
          }
        }
      },
      e: {
        f: [
          { a: Promise.resolve(4), b: 10 }
        ]
      }
    };

    const result = await promisive(input);
    expect(result).toEqual({
      a: 1,
      b: 2,
      c: 3,
      d: {
        e: { f: { g: [4, 5, 6] } }
      },
      e: { f: [{ a: 4, b: 10 }] }
    })
  })


})