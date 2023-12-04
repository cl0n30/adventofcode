import * as fs from 'fs';

let input = fs.readFileSync("./day1_2.txt", "utf-8")

const split = input.split("\r\n");
let result = 0;
split.forEach(line => {
  let dig = digits(line);
  result = result + +(dig[0] + dig[dig.length-1])
});
console.log(result);
//56465
//55902

function digits(line:string) {
  let res: string[] = [];
  [...line].forEach((_, i) => {
    if (line.startsWith("one", i) || line.startsWith("1", i)) {res = res.concat("1")}
    if (line.startsWith("two", i) || line.startsWith("2", i)) {res = res.concat("2")}
    if (line.startsWith("three", i) || line.startsWith("3", i)) {res = res.concat("3")}
    if (line.startsWith("four", i) || line.startsWith("4", i)) {res = res.concat("4")}
    if (line.startsWith("five", i) || line.startsWith("5", i)) {res = res.concat("5")}
    if (line.startsWith("six", i) || line.startsWith("6", i)) {res = res.concat("6")}
    if (line.startsWith("seven", i) || line.startsWith("7", i)) {res = res.concat("7")}
    if (line.startsWith("eight", i) || line.startsWith("8", i)) {res = res.concat("8")}
    if (line.startsWith("nine", i) || line.startsWith("9", i)) {res = res.concat("9")}
  })
  return res;
}

function readFiles() {
    try {
      input = fs.readFileSync("./day1.txt", "utf-8");
    } catch (err) {
      throw err;
    }
  }