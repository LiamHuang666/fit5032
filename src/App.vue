<script setup>
import BHeader from './components/BHeader.vue'
import { provide, ref } from 'vue'

const userInfo = ref({
  username: '',
  password: ''
})

provide('userInfo', userInfo)
</script>

<template>
  <div class="main-container">
    <header>
      <BHeader />
    </header>
    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped></style>
