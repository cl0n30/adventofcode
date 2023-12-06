import * as fs from "fs";

export function getLines(day: number) {
    return fs.readFileSync(`./day${day}.txt`, "utf-8").split("\r\n");
}

export function tgetLines(day: number) {
    return fs.readFileSync(`./day${day}_test.txt`, "utf-8").split("\r\n");
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
