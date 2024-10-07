<template>
    <div id="app">
      <h1>Book Counter</h1>
      <button @click="getBookCount">Get Book Count</button>
      <p v-if="count !== null">Total number of books: {{ count }}</p>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  // Define reactive variables
  const count = ref(null);
  const error = ref(null);
  
  // Define function to get book count
  const getBookCount = async () => {
    try {
      const response = await axios.get('https://countbooks-fn6zpnaqeq-uc.a.run.app/countBooks');
      count.value = response.data.count;
      error.value = null;
    } catch (err) {
      console.error('Error fetching book count:', err);
      error.value = 'Error fetching book count';
      count.value = null;
    }
  };
  </script>
  