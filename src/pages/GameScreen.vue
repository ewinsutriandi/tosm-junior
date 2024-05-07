<script setup>
import { ref,onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import Timer from '../components/Timer.vue'
import SoalViewer from '../components/SoalViewer.vue'
import Keyboard from '../components/Keyboard.vue'
import { generateQuiz } from '../helpers/generators.js'
import { useStore } from '../store/index'
import { OperationDesc } from '../helpers/constants'

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

// Questions related
function initLevel() {
  // console.log("init level: "+curLevel.value)
  let levelQuizObj = generateQuiz(curLevel.value,store.current_ops) 
  questions = levelQuizObj.questions
  timeLimit = levelQuizObj.timeLimit
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
    if (ansTemp.value === corrAns || !corrAns.startsWith(ansTemp.value)){
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
      quiz : curQuiz,
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
  let duration = Math.round((Date.now() - startTime.value)/1000)
  store.newStats({
    operation  : store.current_ops,
    time_taken : Date.now(),
    duration   : duration,
    level      : curLevel.value,
    end_state  : state
  })
  gameState.value = state
}

</script>
<template>
  <div>
    <!--{{ store.current_ops }} | {{ store.maxOpsLevel }}-->
    <!-- Pick level if maxlevel > 1-->
    <div v-if="gameState == GameState.PICK_LEVEL">
      <h3>  Operasi {{ OperationDesc(store.current_ops) }}</h3>
      <p>&nbsp;</p>
      <h4> PILIH LEVEL</h4>
      <p>&nbsp;</p>
      <p>
        <button @click="prepareFirstGame(1)">LEVEL 1</button>
        &nbsp;
        <button 
          @click="prepareFirstGame(store.maxOpsLevel)">
          LEVEL {{ store.maxOpsLevel }}
        </button>
      </p>
      <div class="info">Mulai dari awal atau lanjut dari level teratas yang pernah dicapai</div>
      
    </div>
    <!-- Before the game start -->
    <div v-if="gameState == GameState.BEFORE_START">
      <h3> LEVEL {{ curLevel }}</h3>
      <p>&nbsp;</p>
      Jawab soal-soal berikut dalam waktu kurang dari {{ timeLimit }} detik
      <p>&nbsp;</p>
      <p>
        <button @click="startGame()">Mulai</button>
      </p>
      
    </div>
    <!-- When the game is on -->
    <div v-if="gameState == GameState.IN_GAME">
      Sisa soal: {{ questions.length - curIdx }}
      <p><Timer @time="onTimeUpdate" @timeisup="onTimeIsUp" :limit="timeLimit"/></p>
      <SoalViewer :soal="questions[curIdx].soal"/>
      <h1 v-if="false">J: {{ ansTemp }}</h1>
      <Keyboard @key="onKey"/>
    </div>
    <!-- When the game is end -->
    <div v-if="gameState == GameState.LOSE_BY_MISTAKE 
          || gameState == GameState.LOSE_TIME_UP
          || gameState == GameState.WON">
      <h2>Permainan Selesai</h2> 
      <div v-if="gameState == GameState.WON">
        <h1>Berhasil!</h1>
        <button @click="prepareNextLevel">Lanjut Level {{curLevel + 1}}</button>
      </div>
      <div v-if="gameState == GameState.LOSE_TIME_UP">
        <div><h1>Waktu habis!</h1></div>
        <p>&nbsp;</p>
        <button @click="replayLevel">Coba lagi</button>
      </div>
      <div v-if="gameState == GameState.LOSE_BY_MISTAKE">
        <div><h1>Salah Menjawab</h1></div>
        <p>soal: {{ mistake.quiz.soal }}</p>
        <p>Jawaban: {{ mistake.ans }}, yang benar: {{mistake.quiz.ans}}</p>
        <p>&nbsp;</p>
        <button @click="replayLevel">Coba lagi</button>
      </div>
    </div>
    
  </div>
</template>