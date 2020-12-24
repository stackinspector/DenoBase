import { Sha256 } from 'std/hash/sha256.ts'
import { Sha512 } from 'std/hash/sha512.ts'
import { Sha3_256, Sha3_384, Sha3_512 } from 'std/hash/sha3.ts'
export { sha2a, sha2c, sha3a, sha3b, sha3c }

type HashFunc = (bin: Uint8Array | ArrayBuffer) => ArrayBuffer

type Sha2Hashers = typeof Sha256 | typeof Sha512
type Sha3Hashers = typeof Sha3_256 | typeof Sha3_384 | typeof Sha3_512

/**
 * `std/hash/sha256` and `std/hash/sha512` are adapted from the emn178 implementation,
 * which returns `number[]` with the method `digest()`.
 * We should use the method `arrayBuffer()` to get the `ArrayBuffer`.
 */
const sha2Factory = (Hasher: Sha2Hashers): HashFunc => (bin) => {
    const hasher = new Hasher()
    hasher.update(bin)
    return hasher.arrayBuffer()
}

/**
 * `std/hash/sha3` is ported and rewrapped from the Golang standard library implementation
 * and does not suffer from the problem above.
 */
const sha3Factory = (Hasher: Sha3Hashers): HashFunc => (bin) => {
    const hasher = new Hasher()
    hasher.update(bin)
    return hasher.digest()
}

/** (`SHA2-256`) a shorthand of `std/hash/sha256` */
const sha2a = sha2Factory(Sha256)

/** (`SHA2-512`) a shorthand of `std/hash/sha512` */
const sha2c = sha2Factory(Sha512)

/** (`SHA3-256`) a shorthand of `std/hash/sha3.Sha3_256` */
const sha3a = sha3Factory(Sha3_256)

/** (`SHA3-384`) a shorthand of `std/hash/sha3.Sha3_384` */
const sha3b = sha3Factory(Sha3_384)

/** (`SHA3-512`) a shorthand of `std/hash/sha3.Sha3_512` */
const sha3c = sha3Factory(Sha3_512)

