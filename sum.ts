export { sumof }

/**
 * returns the sum of every number in the given number array
 * @todo bigint[] compatible. failed: <N extends number | bigint>(array: N[]): N
 */
const sumof = (array: number[]): number => array.reduce((a, b) => a + b)

