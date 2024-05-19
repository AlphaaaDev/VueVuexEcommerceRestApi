import { AuthAction, NotificationAction } from '../types.actions'
import { JwtService } from "@/services/local/jwt.service";
import { UsersService } from "@/services/local/users.service";
import { AxiosService } from '@/services/remote/base/axios.service';


const state = {
    isLoggedIn: !!JwtService.getToken(),
    isAdmin: false,
    user: {},
    errors: {}
};

const mutations = {
    [AuthAction.local.SET_USER](state, user) {
        JwtService.saveUser(user);
        AxiosService.setUser(user);
        state.isLoggedIn = true;
        state.isAdmin = user.roles.includes("ROLE_ADMIN");
        state.user = user;
        state.errors = {};
    },

    [AuthAction.local.LOGOUT](state) {
        JwtService.clearSession();
        state.isLoggedIn = false;
        state.isAdmin = false;
        state.user = {};
        state.errors = {};
    },

    [AuthAction.local.IS_LOGGED_IN](state, boolean) {
        state.isLoggedIn = boolean;
    }
};

const actions = {
    [AuthAction.remote.LOGIN](context, loginDto) {
        return new Promise((resolve, reject) => {
            UsersService.login(loginDto)
                .then(({ data }) => {
                    context.commit(AuthAction.local.IS_LOGGED_IN, true);
                    // append the token to the user object
                    data.user.token = data.token;
                    context.commit(AuthAction.local.SET_USER, data.user);
                    resolve(data);
                }).catch(err => {
                    context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                    reject(err);
                });
        });
    },

    [AuthAction.local.LOGOUT](context) {
        return new Promise((resolve, reject) => {
            context.commit(AuthAction.local.LOGOUT);
            resolve({ success: true });
        });
    },

    [AuthAction.remote.REGISTER](context, registerDto) {
        return new Promise((resolve, reject) => {
            UsersService.register(registerDto)
                .then((response) => {
                    resolve(response.data);
                })
                .catch(err => {
                    context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                    reject(err);
                });
        });
    },
};

const getters = {
    isLoggedIn: (state) => {
        return state.isLoggedIn;
    },
    isAdmin: (state) => {
        return state.isAdmin;
    },
    currentUser: (state) => {
        if (state && state.user) {
            return state.user;
        } else {
            return {};
        }
    }
};

export const auth = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};