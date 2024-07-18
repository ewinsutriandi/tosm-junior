<script setup>
import { ref } from 'vue'

const props = defineProps(['num','colored'])
console.log(props.num,props.colored)
const count = ref(0)
const color_code = (index) => {
  if (index <= props.colored) {
    return "#FDCC0D";
  }
  return "#ccc";
}
</script>

<template>
  <div class="flex" v-if="num">
    <span class="flex" v-for="index in parseInt(colored)" :key="index">
      ✭ 
      <span class="sr-only">star count...</span>
    </span>
    <span class="flex" v-for="index in (parseInt(num)-parseInt(colored))" :key="index">
      ✩ 
      <span class="sr-only">star count...</span>
    </span>
  </div>
</template>

<style scoped>

</style>
