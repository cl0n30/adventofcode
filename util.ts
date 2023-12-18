import * as fs from "fs";
import { Point } from "./types";

export function getLines(day: number, separator: string = "\r\n") {
    return fs.readFileSync(`./day${day}.txt`, "utf-8").split(separator);
}

export function tgetLines(day: number, separator: string = "\r\n") {
    return fs.readFileSync(`./day${day}_test.txt`, "utf-8").split(separator);
}

export function getColumns(lines: string[]) {
    let columns: string[] = [];
    for (let i = 0; i < lines[0].length; i++) {
        let column: string[] = [];
        for (let j = 0; j < lines.length; j++) {
            column.push(lines[j][i]);
        }
        columns.push(column.join(""));
        column = [];
    }
    return columns;
}

export function extractNumbers(line: string): number[] {
    let numbers: number[] = [];
    let currNumber: number[] = [];
    [...line].forEach((char) => {
        if (/[0-9]/.test(char)) {
            currNumber.push(+char);
        } else {
            if (currNumber.length > 0) {
                numbers.push(+currNumber.join(""));
                currNumber = [];
            }
        }
    });
    if (currNumber.length > 0) {
        numbers.push(+currNumber.join(""));
    }
    return numbers;
}

export function replaceChar(s: string, position: number, char: string) {
    let chars = [...s];
    chars[position] = char;
    return chars.join("");
}

export function floodFill<T>(
    startX: number,
    startY: number,
    grid: T[][],
    border: T,
    fill: T
) {
    let queue: Point[] = [];
    queue.push(new Point(startX, startY));
    while (queue.length > 0) {
        let n = queue.shift()!;
        if (grid[n.x][n.y] != border && grid[n.x][n.y] != fill) {
            grid[n.x][n.y] = fill;
            queue.push(new Point(n.x - 1, n.y)); //N
            queue.push(new Point(n.x + 1, n.y)); //S
            queue.push(new Point(n.x, n.y - 1)); //W
            queue.push(new Point(n.x, n.y + 1)); //E
        }
    }
}

//Gaußsche Trapezformel
export function areaTrapezoid(trapezoid: Point[]) {
    let area = 0;
    for (let i = 0; i < trapezoid.length; i++) {
        let curr = trapezoid[i];
        let next = trapezoid[(i + 1) % trapezoid.length];
        area += (curr.y + next.y) * (curr.x - next.x);
    }
    area = Math.abs(area) / 2;
    return area;
}
