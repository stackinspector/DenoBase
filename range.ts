export { range }

/**
 * A python-like range object implemented with generator function
 * @todo reverse version
 * @todo swap parameter positions with number of parameters
 */
const range = function* (end: number, start = 0, step = 1) {
    for (let i = start; i < end; i += step) yield i
}

