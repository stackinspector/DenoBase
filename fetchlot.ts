import { range } from 'baseutil/range.ts'
export type { Dict, Ports, Output }
export { worker }

type Dict = Record<string, unknown>

interface Port<Input> {
    url: (input: Input) => string
    valid: ((resp: Dict, input: Input) => boolean)[]
    proc: (data: unknown, input: Input) => unknown
}

type Ports<Input> = Map<string, Port<Input>>

type OutputType = 'meta' | 'data' | 'error' | 'crash'

type Output = (type: OutputType, message: unknown) => void

const worker = async <Input>(input: Input, ports: Ports<Input>, output: Output): Promise<void> => {
    for (const [type, port] of ports) {
        for (const retry of range(3)) {
            try {

                const resp = await (await fetch(port.url(input))).text()
                output('meta', { type, input, content: resp })

                const parsed = JSON.parse(resp) as Dict

                try {
                    for (const vaild of range(port.valid.length)) {
                        if (!(port.valid[vaild](parsed, input))) throw vaild
                    }
                } catch (e) {
                    if (typeof e === 'number') output('error', { type, input, retry: retry, content: e })
                    else throw e
                    continue
                }

                output('data', { type, input, content: port.proc(parsed.data, input) })
                break

            } catch (e) {
                output('crash', { type, input, retry: retry, content: (e instanceof Error ? e.stack : e) })
                continue
            }
        }
    }
}

