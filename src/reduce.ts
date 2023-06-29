export function reduce<T, R>(arr: T[], reducer: (acc: R, cur: T) => R, initialValue: R) {
    let result = initialValue
    for (const elem of arr) {
        result = reducer(result, elem)
    }
    return result
}
