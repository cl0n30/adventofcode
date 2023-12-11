import { getColumns, getLines, tgetLines } from "../util";

interface pos {
    x:number,
    y:number
}

let lines = getLines(11);
let columns = getColumns(lines);

let expandedLines: number[] = [];
let expandedColumns: number[] = [];
for (let i = 0; i < lines.length; i++) {
    if (lines[i].indexOf("#") == -1) {
        expandedLines.push(i)
    } 
}

for (let i = 0; i < columns.length; i++) {
    if (columns[i].indexOf("#") == -1) {
        expandedColumns.push(i)
    } 
}
let expansionSize = 1000000;
let positions:pos[] = []

let expX = 0;
for (let x = 0; x < lines.length; x++) {
    let expY = 0;
    for (let y = 0; y < columns.length; y++) {
        if (lines[x][y] == "#") {
            positions.push({x:expX, y:expY})
        }
        if (expandedColumns.includes(y)) {
            expY += expansionSize;
        } else {
            expY++;
        }
    }
    if (expandedLines.includes(x)) {
        expX += expansionSize;
    } else {
        expX++;
    }
}

let distances: number[] = [];
positions.forEach((pos, i)=> {
    positions.forEach((other, j) => {
        if (i < j) {
            distances.push(manhattenDist(pos, other))
        }
    })
} );
let result = distances.reduce((acc, curr) => acc+curr)
console.log(result);


function manhattenDist(p:pos, q:pos) {
    return Math.abs(p.x - q.x) + Math.abs(p.y - q.y);
}

// ...#......
// .......#..
// #.........
// ..........
// ......#...
// .#........
// .........#
// ..........
// .......#..
// #...#.....