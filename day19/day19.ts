import { getLines, tgetLines } from "../util";

class Part {
    constructor(public x:number,
        public m:number,
        public a:number,
        public s:number){}
}

class Workflow {
    constructor(public name:string,
        public ops:Operation[],
        public goto:string){}
}

class Operation{
    constructor(public category:string,
        public lessthan:boolean,
        public value:number,
        public goto: string){}
}

let input =getLines(19);
let inworkflows = input.slice(0, input.indexOf(""))
let inparts = input.slice(input.indexOf("")+1)

let workflows = inworkflows.map(wf=> {
    let workflow = new Workflow(wf.split("{")[0], [], "");
    let flow = wf.split("{")[1];
    let ops = flow.split(",");
    let operations: Operation[] = [];
    for(let i = 0; i < ops.length; i++) {
        if (i == ops.length -1) {
            workflow.goto = ops[i].replace("}", "")
        } else {
            let lessthan = ops[i].indexOf("<") != -1;
            if (lessthan) {
                let name = ops[i].split("<")[0];
                let value = +ops[i].split("<")[1].split(":")[0]
                let goto = ops[i].split("<")[1].split(":")[1]
                operations.push(new Operation(
                    name, lessthan, value, goto
                ))
            } else {
                let name = ops[i].split(">")[0];
                let value = +ops[i].split(">")[1].split(":")[0]
                let goto = ops[i].split(">")[1].split(":")[1]
                operations.push(new Operation(
                    name, lessthan, value, goto
                ))
            }
        }
    }
    workflow.ops = operations;
    return workflow;
})

let parts = inparts.map(part => {
    part = part.replace(/\{|\}/g, "")
    let cats = part.split(",");
    return new Part(+cats[0].split("=")[1], +cats[1].split("=")[1], +cats[2].split("=")[1], +cats[3].split("=")[1])
})

let wfMap = new Map<string, Workflow>();
workflows.forEach(wf => {
    wfMap.set(wf.name, wf)
})

let acc = parts.filter(part => accepted(part)).map(part=> part.a+part.m+part.s+part.x)
console.log(acc.reduce((acc, curr)=> acc+curr));

function accepted(part:Part) {
    let next = gotoNext(wfMap.get("in")!, part);
    while(!/A|R/.test(next)) {
        next = gotoNext(wfMap.get(next)!, part)
    }
    return next == "A";
}

function gotoNext(wf: Workflow, part:Part) {
    let goto:string|undefined;
    for (let i = 0; i < wf.ops.length; i++) {
        goto = execOp(wf.ops[i], part);
        if (goto) {
            break;
        }
    }
    if (!goto) {
        return wf.goto;
    } else {
        return goto
    }
}

function execOp(op:Operation, part: Part):string|undefined {
    let partValue:number = part[op.category as keyof Part];
    if (op.lessthan) {
        if (partValue < op.value) {
            return op.goto;
        }
    } else {
        if (partValue > op.value) {
            return op.goto;
        }
    }
    return undefined;
}
