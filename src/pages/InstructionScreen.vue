<template>
    <div>
      <h2>
        Pilih untuk mulai dari awal atau level tertinggi yang pernah dicapai
      </h2>
      <div class="container mx-auto my-8 flex justify-center">
        <button 
          @click="this.$router.push('/play')"
          >Mulai dari level 1</button>
        
        <button
          @click="handleToggleFontSizeClick()"
          >Mulai dari level 5</button>
      </div>

    </div>
  </template>
<script setup>
import { storeToRefs } from 'pinia'
import  {useStore} from '../store/index'
const store = useStore()
const {settings} = storeToRefs(store)
const handleToggleFontSizeClick = () => {
    store.updateSettings({
      fontSize: settings.value.fontSize === 14 ? 24 : 14,
    })
  }

</script>