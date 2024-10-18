<template>
  <div class="container">
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div class="mt-3">
        <label class="form-label" for="isbn">ISBN:</label>
        <input
          class="form-control"
          type="number"
          v-model="currentBook.isbn"
          id="isbn"
          required
          :disabled="currentBook.id?.length > 0"
        />
      </div>
      <div class="mt-3">
        <label class="form-label" for="name">Name:</label>
        <input class="form-control" type="text" v-model="currentBook.name" id="name" required />
      </div>
      <button type="submit" class="btn btn-primary mt-3">
        {{ currentBook.id?.length > 0 ? 'Edit' : 'Add' }} Book
      </button>
    </form>
    <h1 class="mt-3">Book List</h1>
    <div>
      <input
        class="form-control"
        placeholder="please input isbn"
        type="number"
        v-model="searchIsbn"
        required
      />
      <div class="d-flex gap-2 mt-3">
        <button
          :class="['btn', searchIsbn.length > 0 ? 'btn-primary' : 'btn-secondary']"
          :disabled="searchIsbn.length === 0"
          @click="search"
        >
          Search
        </button>
        <button
          :class="['btn', searchIsbn.length > 0 ? 'btn-primary' : 'btn-secondary']"
          :disabled="searchIsbn.length === 0"
          @click="clearSearchInput"
        >
          clear
        </button>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>ISBN</th>
          <th>Name</th>
          <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="bookList.length === 0">
          <td colspan="3" class="text-center">No Data</td>
        </tr>
        <tr v-for="item in bookList" :key="item.id">
          <td>{{ item.isbn }}</td>
          <td>{{ item.name }}</td>
          <td class="d-flex gap-1">
            <button class="btn btn-primary" @click="editBook(item)">Edit</button>
            <button class="btn btn-danger" @click="deleteBook(item)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import db from '../firebase/init.js'
import axios from 'axios';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where
} from 'firebase/firestore'

const COLLECTION_NAME = 'books'

const currentBook = ref({
  isbn: '',
  name: '',
  id: ''
})

const searchIsbn = ref('')

const bookList = ref([])

const search = () => {
  getBookList()
}
const clearSearchInput = () => {
  searchIsbn.value = ''
  getBookList()
}

const editBook = async (item) => {
  if (item && item.id) {
    console.log(item)
    currentBook.value = { ...item }
    console.log(currentBook.value.id.length > 0)
  }
}

const deleteBook = async (item) => {
  if (item && item.id) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, item.id))
      alert(`${item.name} successfully deleted`)
      await getBookList()
    } catch (e) {
      console.error('Delete book error:', e)
    }
  }
}

const addBook = async () => {
  try {
    const isbnNumber = Number(currentBook.value.isbn)
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number')
      return
    }

    if (!currentBook.value.name || currentBook.value.name.length === 0) {
      alert('name must input')
      return
    }

    if (currentBook.value.id?.length > 0) {
      // update
      const bookRef = doc(db, COLLECTION_NAME, currentBook.value.id)
      await updateDoc(bookRef, {
        name: currentBook.value.name
      })
    } else {
      // add
      // await addDoc(collection(db, COLLECTION_NAME), {
      //   isbn: currentBook.value.isbn,
      //   name: currentBook.value.name  
      // })
      // https://addbook-fn6zpnaqeq-uc.a.run.app

     await axios.post('https://addbook-fn6zpnaqeq-uc.a.run.app/addbook',{'isbn':currentBook.value.isbn,'name':currentBook.value.name});
    }
    alert(`Book ${currentBook.value.id?.length > 0 ? 'Edit' : 'Add'} successfully!`)
    currentBook.value = {
      isbn: '',
      name: '',
      id: ''
    }
    await getBookList()
  } catch (error) {
    console.error('Error adding book:', error)
  }
}
onMounted(() => {
  getBookList()
})

const getBookList = async () => {
  try {
    let querySnapshot
    if (`${searchIsbn.value}`.length > 0) {
      const q = query(collection(db, COLLECTION_NAME), where('isbn', '==', searchIsbn.value))
        .orderBy('isbn', 'desc')
        .limit(10)
      querySnapshot = await getDocs(q)
    } else {
      querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
    }
    let newList = []
    querySnapshot.forEach((doc) => {
      newList.push({
        id: doc.id,
        isbn: doc.data().isbn,
        name: doc.data().name
      })
    })

    bookList.value = newList
  } catch (e) {
    console.error('getBookList error:', e)
  }
}
</script>

<style scoped></style>
