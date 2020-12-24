import { Shake256 } from 'std/hash/sha3.ts'
export { shake256 }

/** a shorthand of `std/hash/sha3.Shake256` */
const shake256 = (bin: Uint8Array | ArrayBuffer, bytesize: number): ArrayBuffer => {
    const hasher = new Shake256(bytesize * 8)
    hasher.update(bin)
    return hasher.digest()
}

