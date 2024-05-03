import { Operations } from "./constants";

export function randomize(arr) {
    arr = arr
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    return arr;
};

export function generateQuiz(level,operation) {
    if (operation == Operations.TAMBAH) {
        return addLevelGenerator(level)
    }
}

function addLevelGenerator(level) {
    // LEVEL 1, add by 1, results < 10
    let questions = []
    let timeLimit = 0
    if (level == 1) {
        for (let i = 1; i <= 8; i++) {
            questions.push(createAddQuiz(i,1))
        }
        timeLimit = questions.length * 5
    }
    // LEVEL 2, add by 2, results < 10
    else if (level == 2) {
        for (let i = 1; i <= 7; i++) {
            questions.push(createAddQuiz(i,2))
        }
        timeLimit = questions.length * 5
    }
    // LEVEL 3, add 2 to 5 , results < 8
    else if (level == 3) {
        questions.push(...addQuizGenerator(2,5,8))
        timeLimit = questions.length * 5
    }
    // LEVEL 4, add 3 to 6 , results < 9
    else if (level == 4) {
        questions.push(...addQuizGenerator(3,6,9))
        timeLimit = questions.length * 5
    }
    // LEVEL 5, add 4 to 7 , results < 11
    else if (level == 5) {
        questions.push(...addQuizGenerator(4,7,11))
        timeLimit = questions.length * 5
    }
    // LEVEL 6, add 5 to 8 , results < 13
    else if (level == 6) {
        questions.push(...addQuizGenerator(5,8,13))
        timeLimit = questions.length * 5
    }
    // LEVEL 7, add 6 to 9 , results < 15
    else if (level == 7) {
        questions.push(...addQuizGenerator(6,9,15))
        timeLimit = questions.length * 5
    }
    // LEVEL 8, add 6 to 9 , results < 15
    else if (level == 8) {
        questions.push(...addQuizGenerator(1,6,20))
        timeLimit = questions.length * 4
    }
    // LEVEL 9, add 6 to 9 , results < 15
    else if (level == 9) {
        questions.push(...addQuizGenerator(2,7,20))
        timeLimit = questions.length * 4
    }
    // LEVEL 10, add 6 to 9 , results < 15
    else if (level == 10) {
        questions.push(...addQuizGenerator(3,8,20))
        timeLimit = questions.length * 4
    }
    // LEVEL 11, add 6 to 9 , results < 15
    else if (level == 11) {
        questions.push(...addQuizGenerator(4,9,20))
        timeLimit = questions.length * 4
    }
    // TOSM RED
    else if (level == 12) {
        questions.push(...addQuizGenerator(1,9,20))
        timeLimit = questions.length * 4
    }
    // TOSM YELLOW
    else if (level == 13) {
        questions.push(...addQuizGenerator(1,9,20))
        timeLimit = questions.length * 3
    }
    // TOSM GREEN
    else if (level == 13) {
        questions.push(...addQuizGenerator(1,9,20))
        timeLimit = questions.length * 2
    }
    // TOSM BLUE
    else if (level == 13) {
        questions.push(...addQuizGenerator(1,9,20))
        timeLimit = questions.length * 1.5
    }
    return {
        questions: randomize(questions),
        timeLimit: timeLimit
    }
}

function createAddQuiz(a,b) {
    return {
        b1 : a,
        b2 : b,
        soal : a+" + "+b,
        ans: a + b
    }
}

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
 
