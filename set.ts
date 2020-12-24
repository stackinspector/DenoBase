export { intersect, intersectMul }

/** Get intersection of 2 sets. */
const intersect = <T>(foo: Set<T>, bar: Set<T>): Set<T> => {
    const result = new Set<T>()
    for (const el of bar) {
        if (foo.has(el)) result.add(el)
    }
    return result
}

/**
 * Get intersection of multiple sets.
 * @todo Improve performance by referring to the lodash implementation rather than `reduce` directly.
 */
const intersectMul = <T>(...sets: Set<T>[]): Set<T> => sets.reduce(intersect)

