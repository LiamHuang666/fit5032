<template>
  <!-- 🗄️ W5. Library Registration Form -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">🗄️ W7. Please Login</h1>

        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>

          </div>


          <div class="col-md-6 col-sm-6">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              @blur="() => validatePassword(true)"
              @input="() => validatePassword(false)"
              v-model="formData.password"
            />
            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
          </div>

          <div class="text-center" style="margin-bottom: 500px;">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script setup>

import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


const HardCodeusername = 'user'
const Hardcodepassword = '123456'


const userInfo = inject('userInfo')

const formData = ref({
  username: '',
  password: ''
})

// const submittedCards = ref([])


const submitForm = () => {
  validateName(true)
  validatePassword(true)

  if (!errors.value.username && !errors.value.password && formData.value.username === HardCodeusername
    && formData.value.password === Hardcodepassword) {
    // submittedCards.value.push({ ...formData.value })
    // clearForm()
    userInfo.value = formData.value
    router.replace({ path: '/' })
    alert('login success')

  }
}


const errors = ref({
  username: null,
  password: null

})

// const validateReason = (blur) => {
//   if (formData.value.reason.indexOf("friend") !== -1) {
//     if (blur) errors.value.reason = "Great to have a friend"
//   } else {
//     errors.value.reason = null
//   }
// }

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {


  if (formData.value.password.length < 6) {
    if (blur) errors.value.password = `Password must be at least 6 characters long.`

    errors.value.password = null
  }
}


</script>