type TaskCreator = () => Promise<any>

export function PromiseScheduler(max: number) {
  const pending: TaskCreator[] = []
  let runningCount = 0

  function runTask(task: TaskCreator) {
    runningCount++
    return task()
      .then((result) => {
        runningCount--
        if (pending.length > 0) {
          runTask(pending.shift()!)
        }
        return result
      })
      .catch((err) => {
        runningCount--
        if (pending.length > 0) {
          runTask(pending.shift()!)
        }
        throw err
      })
  }

  function add(task: TaskCreator): Promise<any> {
    return new Promise((resolve, reject) => {
      const taskWithCtx = () => task().then(resolve, reject)
      if (runningCount < max) {
        runTask(taskWithCtx)
      } else {
        pending.push(taskWithCtx)
      }
    })
  }

  return {
    add,
  }
}
