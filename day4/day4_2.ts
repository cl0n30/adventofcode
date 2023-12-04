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
// 1 instance of card 1, 
// 2 instances of card 2, 
// 4 instances of card 3, 
// 8 instances of card 4, 
// 14 instances of card 5, 
// 1 instance of card 6. 
// In total, this example pile of scratchcards causes you to ultimately have 30 scratchcards!

let cards = lines.map(line => line.split(": ")[1])
let cardCounts = new Array(cards.length).fill(1);
let result = 0;

for (let i = 0; i < cardCounts.length; i++) {
    for (let j = 0; j < cardCounts[i]; j++) {
        let won = cardPoints(cards[i])
        addWon(won, i);
    }
}

result = cardCounts.reduce((acc, val) => acc + val, 0)
console.log(result);

function addWon(won: number,cardIndex: number) {
    for (let j = cardIndex, i = 1; i <= won; i++) {
        cardCounts[j+i]++;
    }
}

function cardPoints(card: string) {
    let winning = card.split(" | ")[0].split(" ");
    let own = card.split(" | ")[1];
    let won = 0;

    own.split(" ").forEach(number => {
        if (number != "" &&winning.includes(number)) {
            won++;
        }
    })
    return won;
}
