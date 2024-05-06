<script setup>
import { defineProps, defineEmits, ref, watch, nextTick } from "vue";
import  {useStore} from '../store/index'
const store = useStore()
const inputField = ref(null)

const focusInput = () => {
  console.log(inputField)
  nextTick(() => {
    if (inputField.value) inputField.value.focus()
    }   
  )
};

const props = defineProps({
  isOpen: Boolean,
});


const emit = defineEmits(["modal-close"]);
const nama = ref('')
const target = ref(null)
const shake = ref(false)

const closeModal = () => {
    if (nama.value === '') {
        shakeInput()
        return
    }
    store.updateCurrentUser(nama.value)
    console.log('Emit close modal, nama:',nama.value)
    emit('modal-close')
}

const shakeInput = () => {
    shake.value = true
    setTimeout(() => {
        shake.value = false
    }, 1500)
}

watch(
  () => props.isOpen,
  (newValue, oldValue) => {
    if (newValue && !oldValue) {
      console.log("Now true")
      //console.log(nameinput)
      focusInput()
    }
  }
);

</script>

<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container center" ref="target">
        <div>Isi nama terlebih dahulu</div>
        <div class="center">
            <input ref="inputField" 
              type="text" class="nameinput" 
              :class="{shake: shake}" v-model="nama" @keyup.enter="closeModal"/>  
            <button class="button" @click.stop="closeModal">Simpan</button>
        </div>
        <div class="info">
            Nama digunakan untuk membedakan profil anda dengan pengguna lain di perangkat ini
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/** Properties */
:where(.modal-mask) {
    --bgcolor: rgba(0, 0, 0, 0.2);   

}
:where(.modal-container) {
    --bgcolor: #eee;
}
@media (prefers-color-scheme: dark) {
  :where(.modal-mask) {
    --bgcolor: rgba(120, 120, 120, 0.2);
  }
  :where(.modal-container) {
    --bgcolor: #444444;
    }
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bgcolor);
}
.modal-container {
  width: 300px;
  margin: 150px auto;
  padding: 20px 30px;
  border-radius: 2px;
  flex-direction: column;
  background-color: var(--bgcolor);

}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.nameinput {
  font-family: inherit;
  font-size: small;
  border: 1px;
  padding: 3px;  
  width: 150px;
  margin: 6px 6px 0 0;
  height: 25px;
  border-radius: 4px;
  box-sizing: border-box;
}
.info {
  font-size: smaller;
  font-style: italic; 
  margin-top: 16px; 
}
.button {
  font-family: inherit;
  font-size: small;
  border: 0;
  padding: 3;
  margin: 6px 6px 0 0;
  height: 25px;
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

.shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0% {
    transform: translate(1px);
  }
  10% {
    transform: translate(-2px);
  }
  20% {
    transform: translate(2px);
  }
  30% {
    transform: translate(-2px);
  }
  40% {
    transform: translate(2px);
  }
  50% {
    transform: translate(-2px);
  }
  60% {
    transform: translate(2px);
  }
  70% {
    transform: translate(-2px);
  }
  80% {
    transform: translate(2px);
  }
  90% {
    transform: translate(-2px);
  }
  100% {
    transform: translate(1px);
  }
}

</style>