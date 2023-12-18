import { floodFill, getLines, tgetLines } from "../util";

let lines = getLines(18);
interface Dig {
    direction:string;
    meters: number;
    color:string;
}

let digs: Dig[] = lines.map(line => {
    let split = line.split(" ");
    return {
        direction: split[0],
        meters: +split[1],
        color: split[2]
    }
})
console.log(getMax(digs));
let max = getMax(digs);

let grid:string[][] = Array.from(Array((max[0]+max[2])*2), () => new Array((max[1]+max[3])*2).fill("."))

let x = (max[0]+max[2])/2;
let y = (max[1]+max[3])/2;
digs.forEach(dig => {
    let newCoords = digDirection(x, y, dig.direction, dig.meters, grid);
    x = newCoords.newX;
    y = newCoords.newY;
})

floodFill<string>(((max[0]+max[2])/2) -1, (max[1]+max[3])/2, grid, "#", "#")
console.log(getSpace(grid))

function getSpace(grid:string[][]) {
    let size = 0;
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            if (grid[x][y] == "#") {
                size++;
            }
        }
    }
    return size;
}

function digDirection(startX:number, startY:number, direction:string, meters:number, grid:string[][]) {
    let currX = startX;
    let currY = startY;
    for (let m = 0; m < meters; m++) {
        grid[currX][currY] = "#"
        switch(direction) {
            case "U": {
                currX--;
                break;
            }
            case "R": {
                currY++;
                break;
            }
            case "D": {
                currX++;
                break;
            }
            case "L": {
                currY--;
                break;
            }
        }
    }
    return {newX: currX, newY: currY}
}

function getMax(digs: Dig[]) {
    let max: number[]= []
    let n = digs.filter(dig => dig.direction == "U").map(dig => dig.meters)
    let e = digs.filter(dig => dig.direction == "R").map(dig => dig.meters)
    let s = digs.filter(dig => dig.direction == "D").map(dig => dig.meters)
    let w = digs.filter(dig => dig.direction == "L").map(dig => dig.meters)
    max.push(n.reduce((acc, curr)=> acc+curr))
    max.push(e.reduce((acc, curr)=> acc+curr))
    max.push(s.reduce((acc, curr)=> acc+curr))
    max.push(w.reduce((acc, curr)=> acc+curr))
    return max;
}

// R 6 (#70c710)
// D 5 (#0dc571)
// L 2 (#5713f0)
// D 2 (#d2c081)
// R 2 (#59c680)
// D 2 (#411b91)
// L 5 (#8ceee2)
// U 2 (#caa173)
// L 1 (#1b58a2)
// U 2 (#caa171)
// R 2 (#7807d2)
// U 3 (#a77fa3)
// L 2 (#015232)
// U 2 (#7a21e3)