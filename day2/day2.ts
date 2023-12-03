import * as fs from 'fs';

let input = fs.readFileSync("./day2.txt", "utf-8")
let lines = input.split("\r\n");

const rc = 12;
const gc = 13;
const bc = 14;

let result = 0;
lines.forEach(line => {
  result += gamePossible(line)
})
console.log(result);

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green

function gamePossible(line: string) {
  let split = line.split(": ");
  let id = +split[0].split(" ")[1];
  let turns = split[1].split("; ");
  for (const turn of turns) {
    let cube = getDrawnCubes(turn);
    if (cube.red > rc || cube.green > gc || cube.blue > bc) {
      return 0;
    }
  }
  return id;
}

function getDrawnCubes(turn: string) {
  let drawn = turn.split(", ");
  let cubes = {
    red: 0,
    green: 0,
    blue: 0
  }
  drawn.forEach((draw) => {
    let amountColor = draw.split(" ");
    if (amountColor[1].startsWith("red")) {cubes.red += +amountColor[0]}
    if (amountColor[1].startsWith("green")) {cubes.green += +amountColor[0]}
    if (amountColor[1].startsWith("blue")) {cubes.blue += +amountColor[0]}
  })
  return cubes;
} 
