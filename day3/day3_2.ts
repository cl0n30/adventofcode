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
//6756

let digits = /^[0-9]+$/;

function isNextToGear(c: string) {
    let special = "*"
    return special.includes(c);
}
let gears = new Map<string, number[]>();

let result = 0;
for (let i = 0; i < lines.length; i++) {
    let currLine = lines[i];
    let prevLine = lines[i-1] ?? undefined;
    let nextLine = lines[i+1] ?? undefined;

    let numbers = findNumbers(currLine);
    
    numbers.forEach(number => {
        isNextToSymbol(number.number, number.startsAt, i, currLine, prevLine, nextLine);
    })
}

gears.forEach((value, key) => {
    if (value && value.length == 2) {
        result += value[0] * value[1];
    }
})

//console.log(gears);
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

function gearSet(x: number, y: number, newNumber: number) {
    let currentNumbers = gears.get(`${x}_${y}`);
    currentNumbers = (currentNumbers ?? []).concat([newNumber]);
    if (newNumber != 0) {
        gears.set(`${x}_${y}`, currentNumbers);
    }
}

function isNextToSymbol(number: string, startsAt: number, currLineIndex: number, currLine: string, prevLine?:string, nextLine?:string) {
    let lineChars = [...currLine];
    let numDigits = [...number];

    if (isNextToGear(lineChars[startsAt -1])) {
        gearSet(currLineIndex,startsAt -1,+number);
        return;
    }

    if (isNextToGear(lineChars[startsAt+number.length])) {
        gearSet(currLineIndex,startsAt +number.length,+number);
        return;
    }

    if (prevLine) {
        lineChars = [...prevLine];
        let prevlineindex = currLineIndex-1;
        if (isNextToGear(lineChars[startsAt -1])) {
            gearSet(prevlineindex,startsAt -1,+number);
            return;
        }
    
        if (isNextToGear(lineChars[startsAt+number.length])) {
            gearSet(prevlineindex,startsAt +number.length,+number);
            return;
        }
        
        for (let i = 0; i < numDigits.length; i++) {
            if (isNextToGear(lineChars[startsAt+i])) {
                gearSet(prevlineindex,startsAt +i,+number);
                return;
            }
        }
    }

    if (nextLine) {
        lineChars = [...nextLine];
        let nextlineindex = currLineIndex+1;
        if (isNextToGear(lineChars[startsAt -1])) {
            gearSet(nextlineindex,startsAt -1,+number);
            return;
        }
    
        if (isNextToGear(lineChars[startsAt+number.length])) {
            gearSet(nextlineindex,startsAt +number.length,+number);
            return;
        }
        
        for (let i = 0; i < numDigits.length; i++) {
            if (isNextToGear(lineChars[startsAt+i])) {
                gearSet(nextlineindex,startsAt +i,+number);
                return;
            }
        }
    }
    return;
}