import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import ListarUsuariosPage from '../views/usuario/ListarUsuariosPage'
import RegistrarUsuarioPage from '../views/usuario/RegistrarUsuarioPage'
import EditarUsuarioPage from '../views/usuario/EditarUsuarioPage'
import ListarClientesPage from '../views/cliente/ListarClientesPage'
import RegistrarClientePage from '../views/cliente/RegistrarClientePage'
import EditarClientePage from '../views/cliente/EditarClientePage'

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
    path: '/usuario/editar/:idUser',
    name: 'EditarUsuarioPage',
    component: EditarUsuarioPage
  },
  {
    path: '/cliente/listar',
    name: 'ListarClientesPage',
    component: ListarClientesPage
  },
  {
    path: '/cliente/registrar',
    name: 'RegistrarClientePage',
    component: RegistrarClientePage
  },
  {
    path: '/cliente/editar/:idCustomer',
    name: 'EditarClientePage',
    component: EditarClientePage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
