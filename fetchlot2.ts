import { range } from "./range.ts"

export type Dict = Record<string, unknown>

type OutputType = "meta" | "data" | "error" | "crash"

type VaildFunc<Input> = (resp: Dict, input: Input) => [boolean, unknown]

export type Port<Input> = {
    port: string,
    url: (input: Input) => string,
    valid: Record<string, VaildFunc<Input>>,
    proc: (resp: Dict, input: Input) => unknown,
}

export type Model<Input> = {
    type: OutputType
    time: number
    offset: number
    port: string
    input: Input
    retry: number
    content: unknown
}

export type Output<Input> = (input: Input, message: Model<Input>) => void

export const worker = async <Input>(input: Input, { port, url, valid, proc }: Port<Input>, output: Output<Input>, maxretry = 3) => {
    for (const retry of range(maxretry)) {
        const time = Number(new Date())
        const output2 = (type: OutputType, content: unknown) => output(input, {
            type, time, offset: Number(new Date()) - time,
            port, input, retry, content
        })

        try {
            const resp = await fetch(url(input))
            const text = await resp.text()
            output2("meta", text)

            const parsed = JSON.parse(text) as Dict
            let error = false
            for (const [name, func] of Object.entries(valid)) {
                const [result, detail] = func(parsed, input)
                if (result) continue
                output2("error", [name, detail])
                error = true
            }
            if (error) continue

            output2("data", proc(parsed, input))
            break
        } catch (e) {
            output2("crash", (e instanceof Error ? e.stack : e))
            continue
        }
    }
}
