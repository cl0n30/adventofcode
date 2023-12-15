import { getLines, tgetLines } from "../util";

let lines = getLines(15, ",")
let hashes = lines.map(line => hash(line))
let res = hashes.reduce((acc, curr) => acc + curr)
console.log(res);

function hash(s: string) {
    let curr = 0;
    for (let i = 0; i < s.length; i++) {
        curr += s.charCodeAt(i)
        curr *= 17;
        curr %= 256;
    }
    return curr;
}