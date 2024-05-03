<script setup>
import { ref } from 'vue'

const props = defineProps(['soal'])  
//console.log('props: '+props.soal)

</script>

<template>
  <h1>{{ soal }}</h1>
</template>


