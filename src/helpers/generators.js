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
          operation == Operations.TAMBAH ? addLevelGenerator
        : operation == Operations.KURANG ? subLevelGenerator
        : operation == Operations.KALI ? multLevelGenerator
        : operation == Operations.BAGI ? divLevelGenerator
        : undefined
    return generator(level)
}

const timeLimits = [5,5,5,5,5,4,4,4,3,2.5,2]  // secs per ops by level

const createQuiz = (a,b) => ({b1: a, b2: b,})
const createAddQuiz = (a,b) => 
    ({ ...createQuiz(a,b), soal: a+" + "+b, ans: a + b})
const createSubQuiz = (a,b) => 
    ({ ...createQuiz(a,b), soal: a+" - "+b, ans: a - b})
const createMultQuiz = (a,b) => 
    ({ ...createQuiz(a,b), soal: a+" × "+b, ans: a * b})
const createDivQuiz = (a,b) => 
    ({ ...createQuiz(a,b), soal: a+" ÷ "+b, ans: a / b})


function addQuizGenerator(lower,upper,max_result) {
    let daftar_soal = []
    for (let i = lower; i <=upper; i++) {
        for (let j=lower; j <=upper; j++) {
            if (i+j <= max_result) {                
                daftar_soal.push(createAddQuiz(i,j))
            }
        }
    }
    return daftar_soal
};
function subQuizGenerator(lower,upper) {
    let daftar_soal = []
    for (let i = lower; i <=upper; i++) {
        for (let j=lower; j <= upper; j++) {               
            daftar_soal.push(createSubQuiz(i+j,j))
        }
    }
    return daftar_soal
};
function multQuizGenerator(lower,upper,max_result) {
    let daftar_soal = []
    for (let i = lower; i <=upper; i++) {
        for (let j=lower; j <= upper; j++) {               
            if (i*j <= max_result) {                
                daftar_soal.push(createMultQuiz(i,j))
            }
        }
    }
    return daftar_soal
};
function divQuizGenerator(lower,upper,max_result) {
    let daftar_soal = []
    for (let i = lower; i <=upper; i++) {
        for (let j=lower; j <= upper; j++) {               
            if (i*j <= max_result) {                
                daftar_soal.push(createDivQuiz(i*j,j))
            }
        }
    }
    return daftar_soal
};

function addLevelGenerator(level) {
    let questions = 
          level == 1 ? Array.from(Array(8).keys()).map((x)=> createAddQuiz(x+1,1)) // 1-8 + 1 5secs per ops
        : level == 2 ? Array.from(Array(7).keys()).map((x)=> createAddQuiz(x+1,2)) // 1-7 + 2
        : level == 3 ? addQuizGenerator(2,5,8)  
        : level == 4 ? addQuizGenerator(3,6,9)
        : level == 5 ? addQuizGenerator(4,7,11)
        : level == 6 ? addQuizGenerator(5,8,13) // 4 secs per ops
        : level == 7 ? addQuizGenerator(6,9,15)
        : level == 8 ? addQuizGenerator(3,9,20)  
        : level == 9 ? addQuizGenerator(1,9,20)  // 3 secs per ops
        : level == 10 ? addQuizGenerator(1,9,20) // 2.5 secs per ops
        : level == 11 ? addQuizGenerator(1,9,20) // 2 secs per ops
        : []

    return {
        questions: randomize(questions),
        timeLimit: questions.length * timeLimits[level]
    }
}

function subLevelGenerator(level) {
    let questions = 
          level == 1 ? Array.from(Array(8).keys()).map((x)=> createSubQuiz(x+2,1)) // 1-9 - 1 5secs per ops
        : level == 2 ? Array.from(Array(7).keys()).map((x)=> createSubQuiz(x+3,2)) // 1-9 - 2
        : level == 3 ? Array.from(Array(6).keys()).map((x)=> createSubQuiz(x+4,3)) // 1-9 - 3  
        : level == 4 ? subQuizGenerator(2,7)
        : level == 5 ? subQuizGenerator(3,8)
        : level == 6 ? subQuizGenerator(4,9) // 4 secs per ops
        : level == 7 ? subQuizGenerator(3,9)
        : level == 8 ? subQuizGenerator(2,8)  
        : level == 9 ? subQuizGenerator(1,9)  // 3 secs per ops
        : level == 10 ? subQuizGenerator(1,9) // 2.5 secs per ops
        : level == 11 ? subQuizGenerator(1,9) // 2 secs per ops
        : []

    return {
        questions: randomize(questions),
        timeLimit: questions.length * timeLimits[level]
    }
}

function multLevelGenerator(level) {
    let questions = 
          level == 1 ? Array.from(Array(9).keys()).map((x)=> createMultQuiz(x+1,1)) // 1-9 x 1 5secs per ops
        : level == 2 ? Array.from(Array(9).keys()).map((x)=> createMultQuiz(x+1,2)) // 1-9 x 2
        : level == 3 ? multQuizGenerator(2,5,15)
        : level == 4 ? multQuizGenerator(2,6,20)
        : level == 5 ? multQuizGenerator(3,7,35)
        : level == 6 ? multQuizGenerator(2,8,50) // 4 secs per ops
        : level == 7 ? multQuizGenerator(3,9,65)
        : level == 8 ? multQuizGenerator(2,9,80)  
        : level == 9 ? multQuizGenerator(1,9,100)  // 3 secs per ops
        : level == 10 ? multQuizGenerator(1,9,100) // 2.5 secs per ops
        : level == 11 ? multQuizGenerator(1,9,100) // 2 secs per ops
        : []

    return {
        questions: randomize(questions),
        timeLimit: questions.length * timeLimits[level]
    }
}

function divLevelGenerator(level) {
    let questions = 
          level == 1 ? Array.from(Array(5).keys()).map((x)=> createDivQuiz((x+1)*2,2)) // 1-9 / 2 5secs per ops
        : level == 2 ? Array.from(Array(5).keys()).map((x)=> createDivQuiz((x+1)*3,3)) // 1-9 / 3
        : level == 3 ? divQuizGenerator(2,5,15)
        : level == 4 ? divQuizGenerator(2,6,20)
        : level == 5 ? divQuizGenerator(3,7,35)
        : level == 6 ? divQuizGenerator(2,8,50) // 4 secs per ops
        : level == 7 ? divQuizGenerator(3,9,65)
        : level == 8 ? divQuizGenerator(2,9,80)  
        : level == 9 ? divQuizGenerator(1,9,100)  // 3 secs per ops
        : level == 10 ? divQuizGenerator(1,9,100) // 2.5 secs per ops
        : level == 11 ? divQuizGenerator(1,9,100) // 2 secs per ops
        : []

    return {
        questions: randomize(questions),
        timeLimit: questions.length * timeLimits[level]
    }
}

 
