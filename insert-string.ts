/* TODO enhance performance by using string[] as string builders */
export const insert = (template: string, content: Map<string, string>) => {
    let current = template
    for (const [key, val] of content) {
        const splited = current.split(key)
        if (splited.length !== 1) {
            if (splited.length !== 2) throw new Error(`split error when key=${key}`)
            const [foo, bar] = splited
            current = foo + val + bar
        }
    }
    return current
}
