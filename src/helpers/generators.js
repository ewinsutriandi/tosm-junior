import { Operations } from "./constants";

function randomize(arr) {
    arr = arr
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    return arr;
};

export function generateQuiz(level,operation) {
    const generator = 
          operation == Operations.TAMBAH ? generateAddPairs
        : operation == Operations.KURANG ? generateSubPairs
        : operation == Operations.KALI ? generateMultPairs
        : operation == Operations.BAGI ? generateDivPairs
        : undefined
    return generateQuestions(generator,level)
}

const starThresholds = [
    4,3,2.5,2
]

const maxLevel = 7

const createQuiz = (a,b) => ({b1: a, b2: b,})
const createAddQuiz = (a,b) => 
    ({ ...createQuiz(a,b), soal: a+" + "+b, ans: a + b})
const createSubQuiz = (a,b) => 
    ({ ...createQuiz(a,b), soal: a+" - "+b, ans: a - b})
const createMultQuiz = (a,b) => 
    ({ ...createQuiz(a,b), soal: a+" × "+b, ans: a * b})
const createDivQuiz = (a,b) => 
    ({ ...createQuiz(a,b), soal: a+" ÷ "+b, ans: a / b})

const generateAddPairs = n => [...Array(n).keys()]
  .flatMap(x => [...Array(n).keys()].map(y => [x + 1, y + 1]))
  .map(([a, b]) => createAddQuiz(a, b));

const generateSubPairs = n => [...Array(n).keys()]
  .flatMap(x => [...Array(n).keys()].map(y => [x + 1, y + 1]))
  .filter(([a, b]) => a > b)
  .map(([a, b]) => createSubQuiz(a, b));

const generateMultPairs = n => [...Array(n).keys()]
  .flatMap(x => [...Array(n).keys()].map(y => [x + 1, y + 1]))
  .filter(([a,b]) => a != 1 || b != 1)
  .map(([a, b]) => createMultQuiz(a, b));

const generateDivPairs = n => [...Array(n).keys()]
  .flatMap(x => [...Array(n).keys()].map(y => [x + 1, y + 1]))
  .filter(([a,b]) => a != 1 || b != 1)
  .map(([a, b]) => createDivQuiz(a*b, b));

const generateQuestions = (generator,level) => {
    let questions = []
    const n = level + (9 - maxLevel)
    if (generator) {
        questions = generator(n)
    }
    return {
        questions: randomize(questions),
        timeLimit: questions.length * 4,
        starThres : starThresholds.map((t)=> questions.length * t)
    }
}

 
