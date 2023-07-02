<template>
    <div class="modal show" tabindex="-1" style="display: block;">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <form>
                    <div class="modal-header">
                        <h5 class="modal-title">Регистрация</h5>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <input :disabled="email_confirmed" v-model="email" placeholder="Почта" type="email" class="form-control"
                                id="exampleInputEmail1" aria-describedby="emailHelp">
                            <div class="form-text" style="color: red;" v-if="checks && checks.email">{{ checks.email[0] }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <template v-if="!waiting_for_code">
                                <button @click="receive_code" type="button" class="btn btn-success">Получить код</button>
                            </template>
                            <template v-else-if="!email_confirmed">
                                <div class="input-group">
                                    <input v-model="code" type="number" placeholder="Код подтверждения" class="form-control" min="10"
                                        max="999999">
                                    <button @click="go_check_code" type="button" class="btn btn-success">Проверить</button>
                                </div>
                                <div class="form-text" style="color: red;" v-if="checks && checks.code">
                                    {{ checks.code[0] }}
                                </div>
                            </template>
                        </div>
                        <div class="mb-3">
                            <input v-model="password" placeholder="Пароль" type="password" class="form-control"
                                id="exampleInputPassword1">
                            <div class="form-text" style="color: red;" v-if="checks && checks.password">{{
                                checks.password[0] }}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <router-link to="auth">Уже есть аккаунт? Войти</router-link>
                        <button type="button" class="btn btn-primary" @click="go_register">Зарегистрироваться</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { register, sendcode, check_code } from '../api/api'
import { useRouter } from 'vue-router';
const router = useRouter()
const waiting_for_code = ref(false)
const email = ref('')
const password = ref('')
const checks = ref()
const code = ref('')
const email_confirmed = ref(false)
let secret = ''
function reset_checks() {
    checks.value = {}
    console.log(checks.value)
}
async function receive_code() {
    reset_checks()
    const res = await sendcode(email.value)
    if (!res.success) {
        checks.value = res.message
    } else {
        waiting_for_code.value = true
    }
}
async function go_check_code() {
    reset_checks()
    const res = await check_code(code.value)
    if (!res.success) {
        checks.value = res.message
    } else {
        secret = res.secret
        email_confirmed.value = true
    }
}
async function go_register() {
    reset_checks()
    const res = await register(email.value, password.value, secret)
    if (!res.success) {
        checks.value = res.message
    } else {
        localStorage.setItem("token", res.token)
        localStorage.setItem("cnt_audio", 10)
        localStorage.setItem("cnt_video", 1)
        router.push({ name: 'home' })
    }
}
</script>