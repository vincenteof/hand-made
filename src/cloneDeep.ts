type Primitive =
  | undefined
  | null
  | boolean
  | string
  | number
  | Function
  | Date
  | RegExp

type DeepImmutable<T> = T extends Primitive
  ? T
  : T extends Array<infer U>
  ? DeepImmutableArray<U>
  : DeepImmutableObject<T>

interface DeepImmutableArray<T> extends ReadonlyArray<DeepImmutable<T>> {}

type DeepImmutableObject<T> = {
  readonly [K in keyof T]: DeepImmutable<T[K]>
}

export function cloneDeep<T>(value: T, hash = new WeakMap()): DeepImmutable<T> {
  if (typeof value !== 'object' || value === null) {
    return value as DeepImmutable<T>
  }

  if (value instanceof Date) {
    return new Date(value.valueOf()) as DeepImmutable<T>
  }

  if (value instanceof RegExp) {
    return new RegExp(value) as DeepImmutable<T>
  }

  if (hash.has(value)) {
    return hash.get(value)
  }

  if (Array.isArray(value)) {
    const clonedArr: unknown[] = []
    hash.set(value, clonedArr)
    value.forEach((x) => {
      clonedArr.push(cloneDeep(x, hash))
    })
    return clonedArr as DeepImmutable<T>
  }

  const cloneObj = {} as T
  hash.set(value, cloneObj)
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      cloneObj[key] = cloneDeep((value as any)[key], hash)
    }
  }
  return cloneObj as DeepImmutable<T>
}
