const axios = require('axios');
import router from '../router/index.js'

const state = {
    jwt: "",
    jwt_storage_name: "OptimalSolutionsJWT",
    jwt_cLaims: {
        jwt_subject: "",
        jwt_expiration: "",
        jwt_authority: "",
    },
}

const mutations = {
    PROCESS_JWT: (state, jwt) => {
        state.jwt_cLaims.jwt_subject = JSON.parse(atob(jwt.split('.')[1])).sub;
        state.jwt_cLaims.jwt_expiration = JSON.parse(atob(jwt.split('.')[1])).exp;
        state.jwt_cLaims.jwt_authority = JSON.parse(atob(jwt.split('.')[1])).authorities[0].authority;
        console.log(JSON.parse(atob(jwt.split('.')[1])))
    },
}

const actions = {
    async login({ commit, getters, state }, { username, password }) {
        try {
            const response = await axios({
                method: 'post',
                url: getters["apiBaseURL"] + '/auth/login',
                data: { username, password, },
            });
            localStorage.setItem(state.jwt_storage_name, response.data);
            commit('PROCESS_JWT', response.data);
            this.dispatch('validateRedirect')
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    validateRedirect: ({ getters }) => {
        let userAuthority = getters["JWTClaims"].jwt_authority;

        switch (userAuthority) {
            case "CLIENTE":
                router.push("/solicitud");
                break;
            case "ADMINISTRADOR":
                router.push("/usuario/listar");
                break;
            case "ANALISTA":
                router.push("/analista/solicitudes");
                break;
            case "TECNICO":
                router.push("/tecnico/tickets");
                break;
            default:
                router.push("/login");
                break;
        }
    },
}

const getters = {
    JWT: state => state.jwt,
    JWTClaims: state => state.jwt_cLaims,
}

export default {
    state,
    actions,
    mutations,
    getters
}