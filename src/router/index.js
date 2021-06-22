import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
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
import ListarTicketsAsignadosPage from '../views/ticket/ListarTicketsAsignadosPage'
import ListarTipoDeSolicitudesPage from '../views/solicitud/ListarTipoDeSolicitudesPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { protectedRoute: false }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { protectedRoute: false }
  },
  {
    path: '/usuario/listar',
    name: 'ListarUsuariosPage',
    component: ListarUsuariosPage,
    meta: { protectedRoute: true }
  },
  {
    path: '/usuario/registrar',
    name: 'RegistrarUsuarioPage',
    component: RegistrarUsuarioPage,
    meta: { protectedRoute: true }
  },
  {
    path: '/usuario/editar/:idUser',
    name: 'EditarUsuarioPage',
    component: EditarUsuarioPage,
    meta: { protectedRoute: true }
  },
  {
    path: '/cliente/listar',
    name: 'ListarClientesPage',
    component: ListarClientesPage,
    meta: { protectedRoute: true }
  },
  {
    path: '/cliente/registrar',
    name: 'RegistrarClientePage',
    component: RegistrarClientePage,
    meta: { protectedRoute: true }
  },
  {
    path: '/cliente/editar/:idCustomer',
    name: 'EditarClientePage',
    component: EditarClientePage,
    meta: { protectedRoute: true }
  },
  {
    path: '/empleado/listar',
    name: 'ListarEmpleadosPage',
    component: ListarEmpleadosPage,
    meta: { protectedRoute: true }
  },
  {
    path: '/empleado/registrar',
    name: 'RegistrarEmpleadoPage',
    component: RegistrarEmpleadoPage,
    meta: { protectedRoute: true }
  },
  {
    path: '/empleado/editar/:idEmployee',
    name: 'EditarEmpleadoPage',
    component: EditarEmpleadoPage,
    meta: { protectedRoute: true }
  },
  {
    path: '/solicitud',
    name: 'RealizarSolicitudPage',
    component: RealizarSolicitudPage,
    meta: { protectedRoute: true }
  },
  {
    path: '/analista/solicitudes',
    name: 'SolicitudesRecibidasPage',
    component: SolicitudesRecibidasPage,
    meta: { protectedRoute: true }
  },
  {
    path: '/tecnico/tickets',
    name: 'ListarTicketsAsignadosPage',
    component: ListarTicketsAsignadosPage,
    meta: { protectedRoute: true }
  },
  {
    path: '/tipo-de-solicitudes/listar',
    name: 'ListarTipoDeSolicitudesPage',
    component: ListarTipoDeSolicitudesPage,
    meta: { protectedRoute: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isProtectedRoute = to.matched.some(route => route.meta.protectedRoute)
  const JWT = localStorage.getItem("OptimalSolutionsJWT")
  console.log("JWT", JWT)
  if (isProtectedRoute) {
    if (JWT == null) {
      next({ path: '/login' })
    } else {
      if (isExpiredJWT(JWT)) {
        next({ path: '/login' })
      } else {
        store.commit('PROCESS_JWT', JWT)
        next()
      }
    }
  } else {
    next()
  }

});

const isExpiredJWT = (token) => {
  try {
    const jwtExpired = JSON.parse(atob(token.split('.')[1])).exp;
    const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
    return currentTimestampInSeconds - jwtExpired >= 0 ? true : false;
  } catch (error) {
    console.error(error);
    return true;
  }
};

export default router
