<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const  goHome = () => router.push({path: '/'})
</script>
<template>
    <button class="home-button" @click="goHome">
    <div class="home-button-svg">
        <svg class="center"
            role="img">
            <path opacity="0.4" 
                d="M10.0693 2.8201L3.13929 8.37009C2.35929 8.99009 1.85929 10.3001 
                    2.02929 11.2801L3.35929 19.2401C3.59929 20.6601 4.95928 21.8101 
                    6.39928 21.8101H17.5993C19.0293 21.8101 20.3993 20.6501 20.6393 
                    19.2401L21.9693 11.2801C22.1293 10.3001 21.6293 8.99009 20.8593 
                    8.37009L13.9293 2.83008C12.8593 1.97008 11.1293 1.9701 10.0693 2.8201Z" 
                    fill="#777">
            </path>
            <path 
                d="M12 15.5C13.3807 15.5 14.5 14.3807 14.5 13C14.5 11.6193 13.3807 10.5 
                    12 10.5C10.6193 10.5 9.5 11.6193 9.5 13C9.5 14.3807 10.6193 15.5 12 15.5Z" 
                    fill="#fff">
            </path>
        </svg>
    </div>
    </button>
</template>
<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.home-button {
  border: 0;
  width : 50px;
  height: 50px;
  margin-top: 32px;
  padding: 12px 12px;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
}

.home-button-svg {
  width: 50px;
  height: 50px;
}
</style>