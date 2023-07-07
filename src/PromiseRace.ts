export function PromiseRace<T extends Array<Promise<any>>>(
  promises: T
): Promise<T extends Array<Promise<infer U>> ? U : never> {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve, reject)
    })
  })
}
