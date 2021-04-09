const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()

const encodeText = (input: string) => textEncoder.encode(input)
const decodeText = (input: Uint8Array) => textDecoder.decode(input)

export { encodeText, decodeText }