import { Sha256 as Sha2a } from 'std/hash/sha256.ts'
import { Sha512 as Sha2c } from 'std/hash/sha512.ts'
import { Sha3_256 as Sha3a, Sha3_384 as Sha3b, Sha3_512 as Sha3c } from 'std/hash/sha3.ts'
export { sha2a, sha2c, sha3a, sha3b, sha3c }

type HashFunc = (bin: Uint8Array | ArrayBuffer) => ArrayBuffer

type Sha2Hashers = typeof Sha2a | typeof Sha2c
type Sha3Hashers = typeof Sha3a | typeof Sha3b | typeof Sha3c

/**
 * `std/hash/sha256` and `std/hash/sha512` are adapted from emn178's implementation,
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
const sha2a = sha2Factory(Sha2a)

/** (`SHA2-512`) a shorthand of `std/hash/sha512` */
const sha2c = sha2Factory(Sha2c)

/** (`SHA3-256`) a shorthand of `std/hash/sha3.Sha3_256` */
const sha3a = sha3Factory(Sha3a)

/** (`SHA3-384`) a shorthand of `std/hash/sha3.Sha3_384` */
const sha3b = sha3Factory(Sha3b)

/** (`SHA3-512`) a shorthand of `std/hash/sha3.Sha3_512` */
const sha3c = sha3Factory(Sha3c)

