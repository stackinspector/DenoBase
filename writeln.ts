import { encodeText } from './textcodec.ts'
export { writeln, writelnSync }

/** asynchronously write the given string as a line to the target text file */
const writeln = async (text: string, target: string): Promise<void> =>
    await Deno.writeFile(target, encodeText(text + '\n'), { append: true })

/** synchronously write the given string as a line to the target text file */
const writelnSync = (text: string, target: string): void =>
    Deno.writeFileSync(target, encodeText(text + '\n'), { append: true })

