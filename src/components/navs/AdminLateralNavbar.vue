<template>
  <div class="lateral-navbar">
    <div class="lateral-navbar-block">
      <div class="lateral-navbar-logo">
        <img
          class="w-100"
          src="@/assets/logo-white.svg"
          alt="Optimal Solutions Logo"
        />
      </div>

      <div class="lateral-navbar-nav">
        <details>
          <summary class="lateral-navbar-nav-item">Mant. Usuarios</summary>
          <b-list-group>
            <b-list-group-item>
              <router-link
                to="/usuario/listar"
                class="lateral-navbar-nav-item-link d-block"
                >Listar</router-link
              >
            </b-list-group-item>
            <b-list-group-item>
              <router-link
                to="/usuario/registrar"
                class="lateral-navbar-nav-item-link d-block"
                >Registrar</router-link
              >
            </b-list-group-item>
          </b-list-group>
        </details>

        <details>
          <summary class="lateral-navbar-nav-item">Mant. Clientes</summary>
          <b-list-group>
            <b-list-group-item>
              <router-link
                to="/cliente/listar"
                class="lateral-navbar-nav-item-link d-block"
                >Listar</router-link
              >
            </b-list-group-item>
            <b-list-group-item>
              <router-link
                to="/cliente/registrar"
                class="lateral-navbar-nav-item-link d-block"
                >Registrar</router-link
              >
            </b-list-group-item>
          </b-list-group>
        </details>

        <details>
          <summary class="lateral-navbar-nav-item">Mant. Empleados</summary>
          <b-list-group>
            <b-list-group-item>
              <router-link
                to="/empleado/listar"
                class="lateral-navbar-nav-item-link d-block"
                >Listar</router-link
              >
            </b-list-group-item>
            <b-list-group-item>
              <router-link
                to="/empleado/registrar"
                class="lateral-navbar-nav-item-link d-block"
                >Registrar</router-link
              >
            </b-list-group-item>
          </b-list-group>
        </details>

        <details>
          <summary class="lateral-navbar-nav-item">
            Mant. T. Solicitudes
          </summary>
          <b-list-group>
            <b-list-group-item>
              <router-link
                to="/tipo-de-solicitudes/listar"
                class="lateral-navbar-nav-item-link d-block"
                >Listar</router-link
              >
            </b-list-group-item>
          </b-list-group>
        </details>

        <details>
          <summary class="lateral-navbar-nav-item">Reportes</summary>
          <b-list-group>
            <b-list-group-item>
              <router-link
                to="/reporte/valoracion-tecnico"
                class="lateral-navbar-nav-item-link d-block"
                >Valoraciones</router-link
              >
            </b-list-group-item>
          </b-list-group>
        </details>
      </div>
    </div>
  </div>
</template>