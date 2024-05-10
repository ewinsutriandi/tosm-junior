<script setup>
import { ref } from 'vue'
import FormUsername from '../components/FormUsername.vue';
import HomeButton from '../components/HomeButton.vue'
import  {useStore} from '../store/index'
import { useRouter } from 'vue-router';
const router = useRouter()


const isFormUsernameOpened = ref(false)


const store = useStore()
const showForm = () => {
  // console.log('Show modal form')
  isFormUsernameOpened.value = true
}

const closeForm = () => {
  isFormUsernameOpened.value = false
  goBack()
}

const goBack = () => {
  //console.log('go back')
  router.push('/')
}

const switchUsr = (usr) => {
  store.updateCurrentUser(usr)
  goBack()
}

</script>

<template>
  <div>
    <h2>
      Ganti pengguna
    </h2>
    
    <div>
        <div class="info"> Pilih dari pengguna terdaftar pada perangkat ini:  </div>        
        <button class="btn-pick" v-for="(v,k,i) in store.users"
          @click="switchUsr(k)"> {{ k }} </button>
        
    </div>
    
    <div >
      <div class="info">atau</div>
      <div>
        <button class="btn-new" @click="showForm">BUAT USER BARU</button>
      </div>
    </div>

    <div>
      <HomeButton/>
    </div>

  </div>
  <FormUsername :isOpen="isFormUsernameOpened" @modal-close="closeForm" name="first-modal">
  </FormUsername>
</template>

<style scoped>
.btn-new {
  font-family: inherit;
  font-size: small;
  border: 0;
  padding: 3;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  transition: all 0.1s 0.1s;
}
.btn-pick {
  font-family: inherit;
  font-size: smaller;
  border: 0;
  padding: 3;
  margin-left: 3px;
  margin-right: 3px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  transition: all 0.1s 0.1s;
}
</style>