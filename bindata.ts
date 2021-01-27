import { range } from 'baseutil/range.ts'
import { sumof } from 'baseutil/sum.ts'
export type { bit }
export { concat, encode, decode, encodeUint, decodeUint }

/**
 * bindata currently supports 8-bit, 16-bit, and 32-bit integers. 
 * Support for 64-bit integers requires support for bigint, which will be considered for addition in the future.
 */
type bit = 8 | 16 | 32

/** Concat multiple Uint8Array */
const concat = (...bins: Uint8Array[]): Uint8Array => {
    let length = 0
    for (const bin of bins) {
        length += bin.byteLength
    }
    const concated = new Uint8Array(length)
    for (const i of range(bins.length))
        concated.set(bins[i], i === 0 ? 0 : bins[i - 1].byteLength)
    return concated
}

/** Generate offsets corresponding to bit schema */
const getOffsets = (bits: bit[]): number[] => {
    let sum = 0
    const offset: number[] = []
    for (const i of range(bits.length)) {
        offset.push(i === 0 ? 0 : sum / 8)
        sum += bits[i]
    }
    return offset
}

/** Generate binary from integer array and bit schema */
const encode = (data: number[], schema: bit[]): ArrayBuffer => {
    const stream = new ArrayBuffer(sumof(schema) / 8)
    const view = new DataView(stream)
    const offsets = getOffsets(schema)
    const setters = {
        8: view.setUint8,
        16: view.setUint16,
        32: view.setUint32,
    }
    for (const i of range(schema.length)) {
        setters[schema[i]].bind(view)(offsets[i], data[i])
    }
    return stream
}

/** Generate integer array from binary and bit schema */
const decode = (stream: ArrayBuffer, schema: bit[]): number[] => {
    const data: number[] = new Array(schema.length)
    const view = new DataView(stream)
    const offsets = getOffsets(schema)
    const getters = {
        8: view.getUint8,
        16: view.getUint16,
        32: view.getUint32,
    }
    for (const i of range(schema.length)) {
        data[i] = getters[schema[i]].bind(view)(offsets[i])
    }
    return data
}

const encodeUint = (data: number, bit: bit): ArrayBuffer => encode([data], [bit])

const decodeUint = (stream: ArrayBuffer, bit: bit): number => decode(stream, [bit])[0]

