function randomDelay() {
  return Math.floor(Math.random() * 1000)
}
// 模拟 asyncAdd API
function asyncAdd(
  a: number,
  b: number,
  cb: (ret: number) => void,
  _errCb: (err: unknown) => void
) {
  setTimeout(() => {
    cb(a + b)
  }, randomDelay())
}

function asyncAddWithPromise(a: number, b: number) {
  return new Promise<number>((resolve, reject) => {
    asyncAdd(a, b, resolve, reject)
  })
}
// 要求 sum 能在最短的时间里返回以上结果
export async function sum(args: number[]) {
  let results: number[] = args.filter(Boolean)
  if (results.length === 0) {
    return Promise.resolve(0)
  }
  if (results.length === 1) {
    return Promise.resolve(results[0])
  }
  while (results.length > 1) {
    let startIndex = results.length % 2 === 0 ? 0 : 1
    const promises: Promise<number>[] = []
    for (let i = startIndex; i < results.length; i += 2) {
      promises.push(asyncAddWithPromise(results[i], results[i + 1]))
    }
    const subResults = (await Promise.all(promises)).filter(Boolean)
    if (startIndex === 0) {
      results = subResults
    } else {
      results = [results[0], ...subResults]
    }
  }

  return results[0]
}
