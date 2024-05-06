import { Operations } from "./constants";

export function randomize(arr) {
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
        : operation == Operations.BAGI ? multLevelGenerator
        : undefined
    return generator(level)
}

const timeLimits = [5,5,5,5,5,4,4,4,3,2.5,2]  // secs per ops by level

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
    let questions = []
    let timeLimit = 0
    // LEVEL 1, sub by 1
    if (level == 1) {
        for (let i = 1; i <= 9; i++) {
            questions.push(createSubQuiz(i,1))
        }
        timeLimit = questions.length * 5
    }
    // LEVEL 2, sub by 2
    else if (level == 2) {
        for (let i = 1; i <= 9; i++) {
            questions.push(createSubQuiz(i,2))
        }
        timeLimit = questions.length * 5
    }
    // LEVEL 3, add 2 to 8
    else if (level == 3) {
        questions.push(...subQuizGenerator(2,6))
        timeLimit = questions.length * 5
    }
    // LEVEL 4, add 3 to 9
    else if (level == 4) {
        questions.push(...subQuizGenerator(3,7))
        timeLimit = questions.length * 5
    }
    // LEVEL 5, add 4 to 11
    else if (level == 5) {
        questions.push(...subQuizGenerator(4,8))
        timeLimit = questions.length * 5
    }
    // LEVEL 6, add 5 to 13
    else if (level == 6) {
        questions.push(...subQuizGenerator(5,9))
        timeLimit = questions.length * 5
    }
    // LEVEL 7, add 6 results < 15
    else if (level == 7) {
        questions.push(...subQuizGenerator(2,7))
        timeLimit = questions.length * 5
    }
    // LEVEL 8, add 6 to 9 , results < 15
    else if (level == 8) {
        questions.push(...subQuizGenerator(2,8))
        timeLimit = questions.length * 4
    }
    // LEVEL 9, add 6 to 9 , results < 15
    else if (level == 9) {
        questions.push(...subQuizGenerator(2,8))
        timeLimit = questions.length * 4
    }
    // LEVEL 10, add 6 to 9 , results < 15
    else if (level == 10) {
        questions.push(...subQuizGenerator(2,9))
        timeLimit = questions.length * 4
    }
    // LEVEL 11, add 6 to 9 , results < 15
    else if (level == 11) {
        questions.push(...subQuizGenerator(1,8))
        timeLimit = questions.length * 4
    }
    // TOSM RED
    else if (level == 12) {
        questions.push(...subQuizGenerator(1,9))
        timeLimit = questions.length * 4
    }
    // TOSM YELLOW
    else if (level == 13) {
        questions.push(...subQuizGenerator(1,9))
        timeLimit = questions.length * 3
    }
    // TOSM GREEN
    else if (level == 14) {
        questions.push(...subQuizGenerator(1,9))
        timeLimit = questions.length * 2
    }
    // TOSM BLUE
    else if (level == 15) {
        questions.push(...subQuizGenerator(1,9))
        timeLimit = questions.length * 1.5
    }
    return {
        questions: randomize(questions),
        timeLimit: timeLimit
    }
}

function multLevelGenerator(level) {
    let questions = []
    let timeLimit = 0
    // LEVEL 1, sub by 1
    if (level == 1) {
        for (let i = 1; i <= 9; i++) {
            questions.push(createMultQuiz(i,1))
        }
        timeLimit = questions.length * 5
    }
    // LEVEL 2, mult by 2, result less than 10
    else if (level == 2) {
        for (let i = 1; i <= 4; i++) {
            questions.push(createMultQuiz(i,2))
        }
        timeLimit = questions.length * 5
    }
    // LEVEL 3, add 2 to 8
    else if (level == 3) {
        questions.push(...multQuizGenerator(2,6,15))
        timeLimit = questions.length * 5
    }
    // LEVEL 4, add 3 to 9
    else if (level == 4) {
        questions.push(...multQuizGenerator(2,7,25))
        timeLimit = questions.length * 5
    }
    // LEVEL 5, add 4 to 11
    else if (level == 5) {
        questions.push(...multQuizGenerator(3,8,40))
        timeLimit = questions.length * 5
    }
    // LEVEL 6, add 5 to 13
    else if (level == 6) {
        questions.push(...multQuizGenerator(4,9,60))
        timeLimit = questions.length * 5
    }
    // LEVEL 7, add 6 results < 15
    else if (level == 7) {
        questions.push(...multQuizGenerator(3,9,100))
        timeLimit = questions.length * 5
    }
    // LEVEL 8, add 6 to 9 , results < 15
    else if (level == 8) {
        questions.push(...multQuizGenerator(2,9,100))
        timeLimit = questions.length * 4
    }
    // LEVEL 9, add 6 to 9 , results < 15
    else if (level == 9) {
        questions.push(...subQuizGenerator(2,8))
        timeLimit = questions.length * 4
    }
    // LEVEL 10, add 6 to 9 , results < 15
    else if (level == 10) {
        questions.push(...subQuizGenerator(2,9))
        timeLimit = questions.length * 4
    }
    // LEVEL 11, add 6 to 9 , results < 15
    else if (level == 11) {
        questions.push(...subQuizGenerator(1,8))
        timeLimit = questions.length * 4
    }
    // TOSM RED
    else if (level == 12) {
        questions.push(...subQuizGenerator(1,9))
        timeLimit = questions.length * 4
    }
    // TOSM YELLOW
    else if (level == 13) {
        questions.push(...subQuizGenerator(1,9))
        timeLimit = questions.length * 3
    }
    // TOSM GREEN
    else if (level == 14) {
        questions.push(...subQuizGenerator(1,9))
        timeLimit = questions.length * 2
    }
    // TOSM BLUE
    else if (level == 15) {
        questions.push(...subQuizGenerator(1,9))
        timeLimit = questions.length * 1.5
    }
    return {
        questions: randomize(questions),
        timeLimit: timeLimit
    }
}

function divLevelGenerator(level) {
    let questions = []
    let timeLimit = 0
    // LEVEL 1, pembagian 2 dan 3 di bawah 10
    if (level == 1) {
        for (let i = 1; i <= 9; i++) {
            questions.push(createMultQuiz(i,1))
        }
        timeLimit = questions.length * 5
    }
    // LEVEL 2, mult by 2, result less than 10
    else if (level == 2) {
        for (let i = 1; i <= 4; i++) {
            questions.push(createMultQuiz(i,2))
        }
        timeLimit = questions.length * 5
    }
    // LEVEL 3, add 2 to 8
    else if (level == 3) {
        questions.push(...multQuizGenerator(2,6,15))
        timeLimit = questions.length * 5
    }
    // LEVEL 4, add 3 to 9
    else if (level == 4) {
        questions.push(...multQuizGenerator(2,7,25))
        timeLimit = questions.length * 5
    }
    // LEVEL 5, add 4 to 11
    else if (level == 5) {
        questions.push(...multQuizGenerator(3,8,40))
        timeLimit = questions.length * 5
    }
    // LEVEL 6, add 5 to 13
    else if (level == 6) {
        questions.push(...multQuizGenerator(4,9,60))
        timeLimit = questions.length * 5
    }
    // LEVEL 7, add 6 results < 15
    else if (level == 7) {
        questions.push(...multQuizGenerator(3,9,100))
        timeLimit = questions.length * 5
    }
    // LEVEL 8, add 6 to 9 , results < 15
    else if (level == 8) {
        questions.push(...multQuizGenerator(2,9,100))
        timeLimit = questions.length * 4
    }
    // LEVEL 9, add 6 to 9 , results < 15
    else if (level == 9) {
        questions.push(...subQuizGenerator(2,8))
        timeLimit = questions.length * 4
    }
    // LEVEL 10, add 6 to 9 , results < 15
    else if (level == 10) {
        questions.push(...subQuizGenerator(2,9))
        timeLimit = questions.length * 4
    }
    // LEVEL 11, add 6 to 9 , results < 15
    else if (level == 11) {
        questions.push(...subQuizGenerator(1,8))
        timeLimit = questions.length * 4
    }
    // TOSM RED
    else if (level == 12) {
        questions.push(...subQuizGenerator(1,9))
        timeLimit = questions.length * 4
    }
    // TOSM YELLOW
    else if (level == 13) {
        questions.push(...subQuizGenerator(1,9))
        timeLimit = questions.length * 3
    }
    // TOSM GREEN
    else if (level == 14) {
        questions.push(...subQuizGenerator(1,9))
        timeLimit = questions.length * 2
    }
    // TOSM BLUE
    else if (level == 15) {
        questions.push(...subQuizGenerator(1,9))
        timeLimit = questions.length * 1.5
    }
    return {
        questions: randomize(questions),
        timeLimit: timeLimit
    }
}

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
 
