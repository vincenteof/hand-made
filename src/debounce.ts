type Procedure = (...args: any[]) => void

export function debounce<F extends Procedure>(
  func: F,
  options?: { timeout?: number }
) {
  const { timeout = 300 } = options || {}

  let timer: NodeJS.Timeout | null = null
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
      timer = null
    }, timeout)
  } as F
}
