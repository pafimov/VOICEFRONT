<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand mx-3" href="#">
        <img src="/favicon.ico" width="30" height="30" alt="">
      </a>
      <span class="navbar-text" v-if="props.username">
          {{ props.username }}
          <button @click="logout" type="button" class="btn btn-secondary ms-2">
              Выход
          </button>
      </span>
      <span v-else>
        <button @click="router.push({ name: 'auth' })" type="button" class="btn btn-secondary ms-2">
              Войти
          </button>
      </span>
    </div>
  </nav>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter()
const props = defineProps({
    username: String,
    group : Number
})
function logout() {
    localStorage.setItem("token", "")
    router.push({ name: 'auth' })
}
</script>