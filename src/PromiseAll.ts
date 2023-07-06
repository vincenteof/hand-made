export function PromiseAll<T extends any[]>(
  promises: [...(Promise<any>[] & { [K in keyof T]: Promise<T[K]> })]
): Promise<T> {
  const len = promises.length
  const results: T = Array(len) as T
  let count = 0
  return new Promise((resolve, reject) => {
    if (len === 0) {
      resolve(results)
      return
    }
    promises.forEach((p, idx) => {
      if (!isPromise(p)) {
        p = Promise.resolve(p)
      }
      p.then((value) => {
        results[idx] = value
        count++
        if (count === len) {
          resolve(results)
        }
      }).catch((err) => reject(err))
    })
  })
}

function isPromise(obj: unknown) {
  return obj && Object.prototype.toString.call(obj) === '[object Promise]'
}
