import { createHash, SupportedAlgorithm } from 'std/hash/mod.ts'
export { hash }

/** a shorthand of `std/hash` (rust wasm) */
const hash = (bin: Uint8Array | ArrayBuffer, alg: SupportedAlgorithm): ArrayBuffer => {
    const hasher = createHash(alg)
    hasher.update(bin)
    return hasher.digest()
}

