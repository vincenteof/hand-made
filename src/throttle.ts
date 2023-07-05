type Procedure = (...args: any[]) => void

export function throttle<F extends Procedure>(
  func: F,
  options?: { wait: number }
) {
  const { wait = 300 } = options || {}
  let executable = true
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (executable) {
      func.apply(this, args)
      executable = false
      setTimeout(() => {
        executable = true
      }, wait)
    }
  }
}
