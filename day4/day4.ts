import * as fs from 'fs';

let input = fs.readFileSync("./day4.txt", "utf-8")
let lines = input.split("\r\n");

// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
//winning|own
//card 1: 8
// Card 2 has two winning numbers (32 and 61), so it is worth 2 points.
// Card 3 has two winning numbers (1 and 21), so it is worth 2 points.
// Card 4 has one winning number (84), so it is worth 1 point.
// Card 5 has no winning numbers, so it is worth no points.
// Card 6 has no winning numbers, so it is worth no points.

// So, in this example, the Elf's pile of scratchcards is worth 13 points.

let cards = lines.map(line => line.split(": ")[1])
let result = 0;
cards.forEach(card => result += cardPoints(card))
console.log(result)

function cardPoints(card: string) {
    let winning = card.split(" | ")[0].split(" ");
    let own = card.split(" | ")[1];
    let power = -1;

    own.split(" ").forEach(number => {
        if (number != "" &&winning.includes(number)) {
            power++;
        }
    })
    if (power < 0) {
        return 0;
    }
    return 2 ** power;
}