<script setup>
import { ref } from 'vue'
import FormUsername from '../components/FormUsername.vue';
import { useStore } from '../store/index'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';
import { Operations } from '../helpers/constants'
const router = useRouter()

const store = useStore()
const {current_user,current_ops} = storeToRefs(store)
const isFormUsernameOpened = ref(false)
const selectedOperation = ref(0)

const showForm = () => {
  // console.log('Show modal form')
  isFormUsernameOpened.value = true
}

const closeForm = () => {
  isFormUsernameOpened.value = false
  startOperation(selectedOperation.value)
}

const startOperation = (operation) => {
  // console.log('Operation: ',selectedOperation.value)
  if (operation.value == 0) return
  selectedOperation.value = operation
  // console.log(current_user.value,current_user.value == undefined, current_user.value == '')
  if (current_user.value == '') {
    showForm()
  } else {
    current_ops.value = selectedOperation.value
    router.push({path: '/play'})
  }
}

</script>

<template>
  <div >
    <h3>
      PILIH OPERASI
    </h3>
    <div class="opbutton">
      <div class="row">
        <button @click="startOperation(Operations.TAMBAH)" class="button">
          +</button>
        <button @click="startOperation(Operations.KURANG)" class="button">
          -</button>
      </div>
      <div class="row">
        <button @click="startOperation(Operations.KALI)" class="button">
          ×</button>
        <button @click="startOperation(Operations.BAGI)" class="button">
          ÷</button>
      </div> 
    </div>
  </div>
  <FormUsername :isOpen="isFormUsernameOpened" @modal-close="closeForm" name="first-modal">
    <template #header>Custom header</template>
    <template #content><input type="text"/></template>
  </FormUsername>
</template>

<style scoped>
.opbutton {
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
  height: 91px;
  width: 91px;
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