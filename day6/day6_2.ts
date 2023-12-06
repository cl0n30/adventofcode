import * as fs from 'fs';

let input = fs.readFileSync("./day6.txt", "utf-8")
let lines = input.split("\r\n");

// Time:      7  15   30
// Distance:  9  40  200
let time = lines[0].split(":");
let dist = lines[1].split(":");
time = [time[1].trim().split(/\s+/).join("")]
dist = [dist[1].trim().split(/\s+/).join("")]
let result: number[] = [];
for (let i = 0; i < time.length; i++) {
    let numberFinished: number = 0;
    let d = +dist[i];
    let t = +time[i];

    for (let j = 1; j < t; j++) {
        let maxDist = (t - j) * j;
        if (maxDist > d) {
            numberFinished++;
        }
    }
    result.push(numberFinished)
}
console.log(result.reduce((acc, curr) => acc*curr))