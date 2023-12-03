import * as fs from 'fs';

let input = fs.readFileSync("./day2.txt", "utf-8")
let lines = input.split("\r\n");

interface Cubes {
  red: number,
  green: number,
  blue: number
}

let result = 0;
lines.forEach(line => {
  result += cubePower(minCubeGame(line))
})
console.log(result);

function cubePower(cubes: Cubes) {
  return (cubes.red * cubes.green * cubes.blue)
}

function minCubeGame(line: string) {
  let split = line.split(": ");
  let turns = split[1].split("; ");
  let minCubes = {
    red: 0,
    green: 0,
    blue: 0
  }
  for (const turn of turns) {
    let cube = getDrawnCubes(turn);
    if (cube.red > minCubes.red) {minCubes.red = cube.red;}
    if (cube.green > minCubes.green) {minCubes.green = cube.green;}
    if (cube.blue > minCubes.blue) {minCubes.blue = cube.blue;}
  }
  return minCubes;
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
