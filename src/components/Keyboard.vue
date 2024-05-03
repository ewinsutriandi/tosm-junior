<script setup>

const props = defineProps({
  foo: String
})

const emit = defineEmits(['key'])
// setup code

const rows = [
  '123'.split(''),
  '456'.split(''),
  '789'.split(''),
  'x0x'.split(''),
]

</script>

<template>
  <div id="keyboard">
    <div class="row" v-for="(row, i) in rows"> 
        <button v-for="key in row"
          @click="$emit('key', key)"
          :disabled="key === '' || key ==='x'"
          :class="{inactive: key === '' || key ==='x'}"
          class="button"
        >
          <span v-if="key !== '' && key !=='x'">{{ key }}</span>
        </button>
    </div>
  </div>
</template>

<style scoped>
#keyboard {
  margin: 30px 8px 0;
  user-select: none;
}
.row {
  display: flex;
  width: 100%;
  margin: 0 auto 8px;
  touch-action: manipulation;
}
.spacer {
  flex: 0.5;
}
button {
  font-family: inherit;
  font-weight: bold;
  border: 0;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  width: 58px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  background-color: #d3d6da;
  color: #1a1a1b;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  transition: all 0.1s 0.1s;
}
.inactive {
  background-color: #00000000;
}
button:last-of-type {
  margin: 0;
}
button.big {
  flex: 1.5;
}

.button:active {
  background-color: #aaa;
  box-shadow: 0 5px #666;
  transform: translateY(2px);
}
</style>
