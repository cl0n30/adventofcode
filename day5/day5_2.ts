import * as fs from 'fs';

let input = fs.readFileSync("./day5.txt", "utf-8")
let lines = input.split("\r\n\r\n");
//console.log(lines);

interface Interval {
    destStart: number;
    srcStart:number;
    range:number;
}
let inputMaps = new Map<string, Interval[]>();

let seedLine = lines[0].split(": ")[1];
let seeds = seedLine.split(" ").map(seed=> +seed);

lines.shift();

lines.forEach((line, i)=> {
    let ivals:Interval[] = [];
    let split= line.split("\r\n");
    for (let j = 1; j < split.length; j++) {
        let mapline = split[j].split(" ");
        let ival:Interval = {
            destStart: +mapline[0],
            srcStart: +mapline[1],
            range: +mapline[2]
        }
        ivals.push(ival);
    }
    let name = split[0].split(" ")[0];
    inputMaps.set(name, ivals); 
})

let min = Infinity;
for (let i = 0; i < seeds.length; i+=2) {
    let seed = seeds[i];
    let range = seeds[i+1];
    for (let j = 0; j < range; j++) {
        let m = getMin(seed+j);
        if (m<min) {
            min = m;
        } 
    }
}
console.log(min);

function getMin(seed: number) {
    let currentVal = seed;
    inputMaps.forEach((maps, key)=> {
        for (let i = 0; i < maps.length; i++) {
            if (isBetween(currentVal, maps[i].srcStart, maps[i].range)) {
                currentVal = currentVal + (maps[i].destStart -maps[i].srcStart);
                break;
            } 
        }
    })
    return currentVal;
}

function isBetween(val: number, start: number, range: number) {
    return val >= start && val < start+range;
}
//console.log(inputMaps);
// seeds: 79 14 55 13

// seed-to-soil map:
// 50 98 2
// 52 50 48

// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15

// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4

// water-to-light map:
// 88 18 7
// 18 25 70

// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13

// temperature-to-humidity map:
// 0 69 1
// 1 0 69

// humidity-to-location map:
// 60 56 37
// 56 93 4