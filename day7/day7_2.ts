import { getLines, tgetLines } from "../util";

let lines = getLines(7);
let strength = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2","J"]

//6839

let types: string[][] = [[],[],[],[],[],[],[]] 
for (let i = 0; i < lines.length; i++) {
    let card = lines[i].split(" ")[0];
    let type = getType(card); 
    types[type].push(lines[i])   
}
types.forEach(type=>type.sort(compare))
let result = types.flat()

let bid = result.map(line=> +line.split(" ")[1])
let r = bid.map((b, i) => {
    return +b * (bid.length -i)
});
let res = r.reduce((acc, curr) => acc + curr)
//250506580

console.log(res);

function compare(a: string, b: string) {
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
    let unique = Array.from(new Set(cards.split(""))).length;
    
    if (unique == 5) {
        if (cards.indexOf("J") > -1) {
            return 5 //one pair
        }
        return 6 //high card
    }

    if (unique == 4) {//1P or 3
        if (getJokers(cards) == 2 || getJokers(cards) == 1) {
            return 3;
        }
        return 5
    }

    if (unique == 3) {//2P 1J:FH, 2J:4 or 3 or 1/3J: 4
        if (mostOccuring(cards) == 3) {
            if (getJokers(cards)==1 || getJokers(cards) == 3) {
                return 1
            }
            return 3;
        }
        if (getJokers(cards)==1) {//FH
            return 2
        }

        if (getJokers(cards)==2) {
            return 1
        }        

        return 4
    }

    //4, 1/5J:5 or FH, 2/3J: 5
    if (unique == 2) {
        if (mostOccuring(cards) == 4) {
            if (getJokers(cards) ==1 || getJokers(cards) ==4) {
                return 0
            }
            return 1
        }

        if(getJokers(cards) == 3 || getJokers(cards) == 2) {
            return 0;
        }
        //FH or 4
        return 2
    }

    return 0
}

function mostOccuring(cards: string) {
    let cuniq = Array.from(new Set(cards.split("")))
    let maxCount = 0;
    for (let i = 0; i < cuniq.length; i++) {
        let count = 0;
        [...cards].forEach(card=> {
            if (cuniq[i]==card) {
                count++;
            }
        })
        if (count > maxCount) {
            maxCount = count;
        }          
    }
    return maxCount;
}

function getJokers(cards: string) {
    return cards.match(/[J]/g)?.length ?? 0;
}
