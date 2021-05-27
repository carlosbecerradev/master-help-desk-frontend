import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import ListarUsuariosPage from '../views/usuario/ListarUsuariosPage'
import RegistrarUsuarioPage from '../views/usuario/RegistrarUsuarioPage'
import EditarUsuarioPage from '../views/usuario/EditarUsuarioPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/usuario/listar',
    name: 'ListarUsuariosPage',
    component: ListarUsuariosPage
  },
  {
    path: '/usuario/registrar',
    name: 'RegistrarUsuarioPage',
    component: RegistrarUsuarioPage
  },
  {
    path: '/usuario/editar',
    name: 'EditarUsuarioPage',
    component: EditarUsuarioPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
