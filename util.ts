import * as fs from "fs";

export function getLines(day: number) {
    return fs.readFileSync(`./day${day}.txt`, "utf-8").split("\r\n");
}

export function tgetLines(day: number) {
    return fs.readFileSync(`./day${day}_test.txt`, "utf-8").split("\r\n");
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
