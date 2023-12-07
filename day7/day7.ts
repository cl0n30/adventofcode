import { getLines, tgetLines } from "../util";

let lines = getLines(7);
let strength = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
let s = ["A", "K", "Q", "J", "T", 9, 8, 7, 6, 5, 4, 3, 2]
lines.sort(compare).reverse();
//console.log(strength.sort());

console.log(lines);
// 32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483
let types: string[][] = [[],[],[],[],[],[],[]] 
for (let i = 0; i < lines.length; i++) {
    let card = lines[i].split(" ")[0];
    let type = getType(card); 
    console.log("type");
    console.log(type);
    types[type].push(lines[i])   
}
console.log(types);
types.forEach(type=>type.sort(compare))
console.log(types);
let result = types.flat()


let bid = result.map(line=> +line.split(" ")[1])
console.log(bid);
let r = bid.map((b, i) => {
    //console.log(bid.length -i);
    return +b * (bid.length -i)
});
console.log(r);
let res = r.reduce((acc, curr) => acc + curr)

console.log(res);

function compare(a: string, b: string) {
    let arr = [...a];
    for (let i = 0; i < a.length; i++) {
        if(strength.indexOf([...a][i].toUpperCase()) < strength.indexOf([...b][i].toUpperCase())) {
            return -1
        }
        if(strength.indexOf([...a][i].toUpperCase()) > strength.indexOf([...b][i].toUpperCase())) {
            return 1;
        }
        
    }

    return 0;
}

function getType(cards: string) {
    console.log("unique")
    console.log(new Set(cards.split("")).size);
    let unique = new Set(cards.split("")).size
    if (unique == 1) {
        return 0;
    }
    if (unique == 5) {
        return 6;
    }
    if (unique == 2) { //FH or 4
        let c = cards[0];
        let count = 0;
        [...cards].forEach(card=> {
            if (card == c) {
                count++;
            }
        })
        if (count == 1 || count == 4) { //four
            return 1
        } else {
            return 2; //FH
        }
    }

    if (unique == 4) { //one pair
        return 5;
    }
    
    let cuniq = Array.from(new Set(cards.split("")));
    
    for (let i = 0; i < cuniq.length; i++) {
        let count = 0;
        [...cards].forEach(card=> {
            if (cuniq[i].indexOf(card) > -1) {
                count++;
            }
        })
        if (count == 3) {
            return 3; //three
        }
        
    }
    return 4;
    

    console.log(unique);
}