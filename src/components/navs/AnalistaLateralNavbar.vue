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
          <summary class="lateral-navbar-nav-item">Solicitudes</summary>
          <b-list-group>
            <b-list-group-item>
              <router-link
                to="/analista/solicitudes"
                class="lateral-navbar-nav-item-link d-block"
                >Listar</router-link
              >
            </b-list-group-item>
          </b-list-group>
        </details>
        <details>
          <summary class="lateral-navbar-nav-item">Tipo de Solicitudes</summary>
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
            <b-list-group-item>
              <router-link
                to="/reporte/tickets-cerrados"
                class="lateral-navbar-nav-item-link d-block"
                >Tickets cerrados</router-link
              >
            </b-list-group-item>
          </b-list-group>
        </details>
      </div>
    </div>
  </div>
</template>