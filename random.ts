export { randInt, randEl }

const randInt = (n: number): number => Math.floor(Math.random() * n)

const randEl = <T>(list: T[]): T => list[randInt(list.length)]

// API returns text: `Set 1: #, #, #, ...`
const randOrgIntSet = async (range: number, count = 1): Promise<number[]> =>
    (await (await fetch("https://www.random.org/integer-sets/?" + new URLSearchParams({
        sets: String(1),
        num: String(count),
        min: String(0),
        max: String(range - 1),
        seqnos: 'on',
        commas: 'on',
        sort: 'on',
        order: 'index',
        format: 'plain',
        rnd: 'new'
    }).toString())).text()).slice(7).split(', ').map(Number)

const randOrgEls = async <T>(list: T[], count = 1): Promise<T[]> => (await randOrgIntSet(list.length, count)).map(n => list[n])

