<template>
  <div>
    <h1>All Books</h1>
    <pre>{{ jsondata }}</pre>
    <p v-if="error">Error: {{ error.message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Define reactive variables
const jsondata = ref(null);
const error = ref(null);

// Define function to get all books
const getAllBooksAPI = async () => {
  try {
    const response = await axios.get('https://getallbooks-fn6zpnaqeq-uc.a.run.app/getAllBooks'); // Replace with correct URL for all books
    jsondata.value = response.data;
    error.value = null;
  } catch (err) {
    console.error('Error fetching all books:', err);
    error.value = err;
    jsondata.value = null;
  }
};

// Fetch the data when the component is mounted
onMounted(() => {
  getAllBooksAPI();
});
</script>

  
  