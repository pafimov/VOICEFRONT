<template>
  <div class="container">
    <RouterView />
  </div>
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import Header from './components/Header.vue'
// import { useRouter } from 'vue-router';
// import {get_username} from './api/api'
// import {ref} from 'vue'
// const router = useRouter()
// const token = localStorage.getItem("token")
// const username = ref(null)
// const group = ref(null)
// async function get_auth(){
//     const res = await get_username(token)
//     if(!res.success){
//         router.push({name : 'auth'})
//     }else{
//         username.value = res.username
//         is_admin.value = res.is_admin
//         is_free.value = res.is_free
//     }
// }
// get_auth()
</script>
