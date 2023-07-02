<template>
    <div class="modal show" tabindex="-1" style="display: block;">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Вход</h5>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <input v-model="login" placeholder="Почта" type="email" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                        <div class="form-text" style="color: red;">{{ check_result }}</div>
                    </div>
                    <div class="mb-3">
                        <input v-model="password" placeholder="Пароль" type="password" class="form-control" id="exampleInputPassword1">
                    </div>
                </div>
                <div class="modal-footer">
                    <router-link to="register">Ещё нет аккаунта? Зарегистрироваться</router-link>
                    <button type="button" class="btn btn-primary" @click="go_auth">Войти</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {auth} from '../api/api'
import { useRouter } from 'vue-router';
const router = useRouter()
const login = ref()
const password = ref()
const check_result = ref()
async function go_auth() {
    check_result.value = ""
    const res = await auth(login.value, password.value)
    if(!res.success){
        check_result.value = "Неверный логин или пароль"
    }else{
        check_result.value = "Успешно авторизованы"
        localStorage.setItem("token", res.token)
        router.push({name : 'home'})
    }
}
</script>