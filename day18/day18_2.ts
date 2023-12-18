import { Point } from "../types";
import { getLines, areaTrapezoid, tgetLines } from "../util";

let lines = getLines(18);
interface Dig {
    direction:number;
    meters: number;
}

let digs: Dig[] = lines.map(line => {
    let split = line.split(" ");
    let color = split[2].replace(/\(|\)/g, "");
    let convert = convertHex(color);
    return {
        direction: convert.dir,
        meters: convert.value,
    }
})

let points: Point[] = [];

let x = 0
let y = 0
digs.forEach(dig => {
    let newCoords = digDirection(x, y, dig.direction, dig.meters);
    x = newCoords.newX;
    y = newCoords.newY;
    points.push(new Point(x, y));
})

let trench = digs.map(dig => dig.meters);
let trenchLength = trench.reduce((acc, curr) => acc+curr);

console.log(pick(areaTrapezoid(points), trenchLength))

//Picks theorem: A = I + R/2 - 1
//A from Gauss
//I = A - R/2 + 1
//I + R = A + R/2 + 1
function pick(area:number, boundary:number) {
    return area + (boundary/2) + 1;
}

function convertHex(hex:string) {
    let arr = [...hex.slice(1)]
    let dir = arr.pop() ?? "-1";
    let value = parseInt(arr.join(""), 16);
    return {
        dir: +dir,
        value: value
    }
}

function digDirection(startX:number, startY:number, direction:number, meters:number) {
    switch(direction) {
        case 3: {
            startX-=meters;
            break;
        }
        case 0: {
            startY+=meters;
            break;
        }
        case 1: {
            startX+=meters;
            break;
        }
        case 2: {
            startY-=meters;
            break;
        }
    }
    return {newX: startX, newY: startY}
}
