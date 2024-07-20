<script setup>
import { ref, onUnmounted } from 'vue'
import Timer from '../components/Timer.vue'
import SoalViewer from '../components/SoalViewer.vue'
import Keyboard from '../components/Keyboard.vue'
import HomeButton from '../components/HomeButton.vue'
import { generateQuiz,maxLevel } from '../helpers/generators.js'
import { useStore } from '../store/index'
import { OperationDesc } from '../helpers/constants'
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useStore()

const GameState = Object.freeze({
  PICK_LEVEL: -1,
  BEFORE_START: 0,
  IN_GAME: 1,
  WON: 2,
  LOSE_BY_MISTAKE: 3,
  LOSE_TIME_UP: 4,
});

const ansTemp = ref("")
const gameState = ref(GameState.BEFORE_START)
const startTime = ref(0)
const curLevel = ref(1)
const curIdx = ref(0)
const corrCnt = ref(0)
const wrongAnsw = ref(0)

let questions
let timeLimit
let starThreshold
let gameStat

const goHome = () => router.push({ path: '/' })

// Questions related
function initLevel() {
  //console.log("init level: "+curLevel.value)
  let levelQuizObj = generateQuiz(curLevel.value, store.current_ops)
  //console.log("level: ", levelQuizObj)
  questions = levelQuizObj.questions
  timeLimit = levelQuizObj.timeLimit
  starThreshold = levelQuizObj.starThres
  curIdx.value = 0
  corrCnt.value = 0
  ansTemp.value = ""
  wrongAnsw.value = {}
}

// Prompt to pick level if necessary
if (store.maxOpsLevel > 1) {
  gameState.value = GameState.PICK_LEVEL
}

initLevel()

let allowInput = true
const onKeyup = (e) => onKey(e.key)

window.addEventListener('keyup', onKeyup)

onUnmounted(() => {
  window.removeEventListener('keyup', onKeyup)
})

function onKey(key) {
  if (!allowInput) return
  //console.log('Key up: '+key)
  if (/^[0-9]$/.test(key) && gameState.value == GameState.IN_GAME) {
    // console.log('Digit detected: '+key)
    ansTemp.value += key
    // console.log('ansTemp: '+ansTemp.value)
    evaluateKeyPress()
  }
}

function onTimeUpdate(time) {
  //console.log('time',time)
}

function onTimeIsUp() {
  console.log('Time is up!!')
  endGame(GameState.LOSE_TIME_UP)
}

// gameplay related

function evaluateKeyPress() {
  let curQuiz = questions[curIdx.value]
  let corrAns = curQuiz.ans + ""
  if (ansTemp.value !== '') {
    // if user has already typed a corrent answer, OR
    // if user typed a wrong first digit of answer
    // trigger answer func
    if (ansTemp.value === corrAns || !corrAns.startsWith(ansTemp.value)) {
      answer()
    }
  }
}

let mistake = {}

function answer() {
  let curQuiz = questions[curIdx.value]
  if (ansTemp.value === curQuiz.ans + "") {
    corrCnt.value++
    ansTemp.value = ""
    if (curIdx.value + 1 < questions.length) {
      curIdx.value++
    } else {
      endGame(GameState.WON)
    }
  } else {
    mistake = {
      quiz: curQuiz,
      ans: ansTemp.value
    }
    endGame(GameState.LOSE_BY_MISTAKE)
  }
}

function prepareFirstGame(level) {
  curLevel.value = level
  initLevel()
  gameState.value = GameState.BEFORE_START
}

function startGame() {
  startTime.value = Date.now()
  gameState.value = GameState.IN_GAME
}

function prepareNextLevel() {
  curLevel.value++
  initLevel()
  gameState.value = GameState.BEFORE_START
}

function replayLevel() {
  initLevel()
  gameState.value = GameState.BEFORE_START
}

function endGame(state) {
  let duration = Math.round((Date.now() - startTime.value) / 1000)
  gameStat = {
    operation: store.current_ops,
    time_taken: Date.now(),
    num_question: questions.length,
    duration: duration,
    level: curLevel.value,
    end_state: state,
    star_cnt: starForCurGame(duration)
  }
  store.newStats(gameStat)
  gameState.value = state
}

const starForCurGame = (duration) => 
  starThreshold.reduce((maxStars, threshold, index) =>  
    duration <= threshold ? index + 1 : maxStars, 
      0); 

const findMaxStars = (level) => 
      store.winsOnLevel(level)
        .reduce((max, attempt) => Math.max(max, attempt.star_cnt), 0);

const getTotalStars = (n) =>
    [...Array(n).keys()]
      .map(i => findMaxStars(n - i))
      .reduce((accum,val) => accum + val,0)

      
</script>
<template>
  <div>
    <!--{{ store.current_ops }} | {{ store.maxOpsLevel }}-->
    <!-- Pick level if maxlevel > 1-->
    <div v-if="gameState == GameState.PICK_LEVEL">
      <h3> Operasi {{ OperationDesc(store.current_ops) }}</h3>
      <h5>{{  getTotalStars(store.maxOpsLevel - 1) }} ✭ </h5>
      <h4> PILIH LEVEL</h4>
      <div v-for="index in (Math.min(store.maxOpsLevel,maxLevel))">
        <button class="pick-level" @click="prepareFirstGame(index)">
          LEVEL {{ index }} : &nbsp;
          <span v-for="idx in findMaxStars(index)" :key="idx">
              ✭
              <span class="sr-only">star count...</span>
            </span>
            <span v-for="idx in (starThreshold.length - findMaxStars(index))" :key="idx">
              ✩
              <span class="sr-only">star count...</span>
            </span>
          
        </button>
      </div>
      

    </div>
    <!-- Before the game start -->
    <div v-if="gameState == GameState.BEFORE_START">
      <h3> LEVEL {{ curLevel }}</h3>
      <div class="rating-container">
        <div v-for="index in starThreshold.length">
          <div class="rating-caption">
            <span v-for="idx in parseInt(index)" :key="idx">
              ✭
              <span class="sr-only">star count...</span>
            </span>
            {{ starThreshold[index - 1] }} detik
          </div>

        </div>
      </div>
      <p>&nbsp;</p>
      <p>
        <button @click="startGame()">Mulai</button>
      </p>

    </div>
    <!-- When the game is on -->
    <div v-if="gameState == GameState.IN_GAME">
      Sisa soal: {{ questions.length - curIdx }}
      <p>
        <Timer @time="onTimeUpdate" @timeisup="onTimeIsUp" :limit="timeLimit" />
      </p>
      <SoalViewer :soal="questions[curIdx].soal" />
      <h1 v-if="false">J: {{ ansTemp }}</h1>
      <Keyboard @key="onKey" />
    </div>
    <!-- When the game is ended -->
    <div v-if="gameState == GameState.LOSE_BY_MISTAKE
      || gameState == GameState.LOSE_TIME_UP
      || gameState == GameState.WON">
      <div v-if="gameState == GameState.WON">
        <h1>Berhasil!</h1>
        <h3>
          <span v-for="idx in gameStat.star_cnt" :key="idx">
            ✭
            <span class="sr-only">star count...</span>
          </span> 
        </h3>
        <h4>
          Level tuntas dalam {{ gameStat.duration }} detik
        </h4>
        <button v-if="curLevel<maxLevel" 
          class="next-level-button" @click="prepareNextLevel">
          Lanjut Level {{ curLevel + 1 }}
        </button>
        <div v-if="curLevel==maxLevel" >
          <h4>Seluruh level sudah dituntaskan</h4>
          <button class="next-level-button"
            @click="gameState = GameState.PICK_LEVEL">
            Kembali ke daftar level
          </button>
        </div>
      </div>
      <div v-if="gameState == GameState.LOSE_TIME_UP">
        <div>
          <h1>Waktu habis!</h1>
        </div>
        <p>&nbsp;</p>
        <button @click="replayLevel">Coba lagi</button>
      </div>
      <div v-if="gameState == GameState.LOSE_BY_MISTAKE">
        <div>
          <h1>Salah Menjawab</h1>
        </div>
        <p>soal: {{ mistake.quiz.soal }}</p>
        <p>Jawaban: {{ mistake.ans }}, yang benar: {{ mistake.quiz.ans }}</p>
        <p>&nbsp;</p>
        <button @click="replayLevel">Coba lagi</button>
      </div>
    </div>
    <div v-if="gameState != GameState.IN_GAME">
      <HomeButton />
    </div>
  </div>
</template>
<style scoped>
.pick-level {
  width: 155px;
  font-size: small;
  text-align: center;
  border: 0;
  margin-bottom: 8px;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
}

.next-level-button {
  margin-top: 24px;
  font-size: smaller;
}

.rating-button {
  display: flex;
  width: 48px;
  height: 24px;
  text-align: center;
}

.rating-container {
  margin-top: 16px;
}

.rating-threshold {
  width: 64px;
  height: 24px;
  display: inline-block;
}

.rating-caption {
  font-size: smaller;
}
</style>