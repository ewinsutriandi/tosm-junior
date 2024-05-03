<script setup>
import { onMounted, ref } from 'vue'

const emit = defineEmits(['time','timeisup'])
const props = defineProps(['limit'])
let mils = ref(0)
console.log(props.limit)
function timeElapsed() {
  //console.log('mils: '+mils)
    setTimeout(()=>{
        ++mils.value;
        //console.log('mils: '+mils.value+(mils.value <= timeLimit)+":"+timeLimit)
        if (mils.value < props.limit) {
          timeElapsed()
        } else {
          emit("timeisup",true)
        }
        emit("time",mils.value)
      },1000)
};
onMounted(() => {
  //console.log('mounted: '+mils) // 0
  timeElapsed()
});
    
</script>

<template>
  <h3 v-if="false">Seconds {{ mils }} | limit {{ limit }}</h3>
  <progress class="progress" :value="mils * 100/props.limit" max="100"> 32% </progress> 
</template>

<style scoped>
.progress {
  position: relative;
	height: 4px;
  color: #aaa;
}
progress::-moz-progress-bar { background: #aaa; }
progress::-webkit-progress-value { background: #aaa; }
</style>
