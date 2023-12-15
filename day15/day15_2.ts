import { getLines, tgetLines } from "../util";

interface lens {
    label: string;
    op: number;
    foc: number;
}

let lines = getLines(15, ",")
let hashmap: Map<number, lens[]> = new Map<number, lens[]>();
let lenses = lines.map(line=>{
    let lens:lens = {label: "", op: 0, foc: -1};
    if (line.indexOf("=") != -1) {
        lens.op = 1
    }
    if (line.indexOf("-") != -1) {
        lens.op = 2;
    }
    lens.label = line.split(/=|-/)[0]
    lens.foc = +line.split(/=|-/)[1] ?? -1
    return lens;
})

lenses.forEach(lens => put(hash(lens.label), lens))
let res = 0;
hashmap.forEach((value, key) => {
    let powers = value.map((lens, i) => {
        return (key +1) * (i+1) * lens.foc
    })
    if (powers.length > 0) {
        res += powers.reduce((ac, curr) => ac+curr)
    }
})
console.log(res);

function put(hash: number, lens:lens) {
    if (lens.op == 1) {//=
        let values = hashmap.get(hash) ?? [];
        let existing = values.findIndex(l => l.label == lens.label)
        if (existing == -1) {
            values.push(lens)
        } else {
            values[existing] = lens
        }
        hashmap.set(hash, values)
    } else {
        let values = hashmap.get(hash) ?? [];
        let existing = values.findIndex(l => l.label == lens.label)
        if (existing != -1) {
            values.splice(existing, 1)
        }
        hashmap.set(hash, values)
    }
}

function hash(s: string) {
    let curr = 0;
    for (let i = 0; i < s.length; i++) {
        curr += s.charCodeAt(i)
        curr *= 17;
        curr %= 256;
    }
    return curr;
}