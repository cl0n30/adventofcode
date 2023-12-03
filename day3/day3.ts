import * as fs from 'fs';

let input = fs.readFileSync("./day3.txt", "utf-8")
let lines = input.split("\r\n");

// 12.......*..
// +.........34
// .......-12..
// ..78........
// ..*....60...
// 78.........9
// .5.....23..$
// 8...90*12...
// ............
// 2.2......12.
// .*.........*
// 1.1..503+.56
//925


//let specialChars =/[`!@#$%^&*()_\-+={};':"|,<>\/?~]/;
let digits = /^[0-9]+$/;
//getSpecial(input);

function getSpecial(input: string) {
    input = input.replace(/[0-9]|\.|\n|\r/g, "");
    console.log([... new Set(input)].join(""));
}

function isSpecial(c: string) {
    let special = "/*&+$-%=@#"
    return special.includes(c);
}

let result = 0;
let resultnumbers: string[]=[];
for (let i = 0; i < lines.length; i++) {
    let currLine = lines[i];
    let prevLine = lines[i-1] ?? undefined;
    let nextLine = lines[i+1] ?? undefined;

    let numbers = findNumbers(currLine);
    
    numbers.forEach(number => {
        resultnumbers.push(number.number);
        result += isNextToSymbol(number.number, number.startsAt, currLine, prevLine, nextLine);
    })
}
//console.log(resultnumbers);
console.log(result);

function findNumbers(line: string) {
    let result: {number: string, startsAt: number}[]= [];
    let number:string[] = [];

    for (let i = 0; i < line.length; i++) {
        if (digits.test(line[i])) {
            number.push(line[i]);
        } else {
            result.push({number: number.join(""), startsAt: i - (number.length)});
            number = [];   
        }
    }
    if (number.length > 0) {
        result.push({number: number.join(""), startsAt: line.length - (number.length)});
        number = [];
    }
    return result;
}

function isNextToSymbol(number: string, startsAt: number, currLine: string, prevLine?:string, nextLine?:string): number {
    let lineChars = [...currLine];
    let numDigits = [...number];
    if (isSpecial(lineChars[startsAt -1]) || isSpecial(lineChars[startsAt+number.length])) {
        return +number;
    }

    if (prevLine) {
        lineChars = [...prevLine];
        if (isSpecial(lineChars[startsAt -1]) || isSpecial(lineChars[startsAt+number.length])) {
            return +number;
        }
        for (let i = 0; i < numDigits.length; i++) {
            if (isSpecial(lineChars[startsAt+i])) {
                return +number;
            }
        }
    }

    if (nextLine) {
        lineChars = [...nextLine];
        if (isSpecial(lineChars[startsAt -1]) || isSpecial(lineChars[startsAt+number.length])) {
            return +number;
        }
        for (let i = 0; i < numDigits.length; i++) {
            if (isSpecial(lineChars[startsAt+i])) {
                return +number;
            }
        }
    }

    return 0;
}