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
          <summary class="lateral-navbar-nav-item">
            <router-link to="/tecnico/dashboard" class="text-white"
              >Dashboard</router-link
            >
          </summary>
        </details>

        <details>
          <summary class="lateral-navbar-nav-item">Tickets</summary>
          <b-list-group>
            <b-list-group-item>
              <router-link
                to="/tecnico/tickets"
                class="lateral-navbar-nav-item-link d-block"
                >Listar</router-link
              >
            </b-list-group-item>
          </b-list-group>
        </details>
      </div>
    </div>
  </div>
</template>