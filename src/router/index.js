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
import ListarEmpleadosPage from '../views/empleado/ListarEmpleadosPage'
import RegistrarEmpleadoPage from '../views/empleado/RegistrarEmpleadoPage'
import EditarEmpleadoPage from '../views/empleado/EditarEmpleadoPage'
import RealizarSolicitudPage from '../views/solicitud/RealizarSolicitudPage'
import SolicitudesRecibidasPage from '../views/solicitud/SolicitudesRecibidasPage'

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
  {
    path: '/empleado/listar',
    name: 'ListarEmpleadosPage',
    component: ListarEmpleadosPage
  },
  {
    path: '/empleado/registrar',
    name: 'RegistrarEmpleadoPage',
    component: RegistrarEmpleadoPage
  },
  {
    path: '/empleado/editar/:idEmployee',
    name: 'EditarEmpleadoPage',
    component: EditarEmpleadoPage
  },
  {
    path: '/solicitud',
    name: 'RealizarSolicitudPage',
    component: RealizarSolicitudPage
  },
  {
    path: '/solicitudes-recibidas',
    name: 'SolicitudesRecibidasPage',
    component: SolicitudesRecibidasPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
