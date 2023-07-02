import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login.vue'
import RegisterView from '../views/Register.vue'
const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/auth',
            name: 'auth',
            component: LoginView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
    ]
})

export default router