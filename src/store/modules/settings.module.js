import { NotificationAction, SettingsAction } from '@/store/types.actions';
import { SettingsAxiosService } from "@/services/remote/settings.axios.service";

const initialState = {
    isLoading: true,
    user: {}
};

const mutations = {
    [SettingsAction.local.SET_USER](state, user) {
        state.user = user;
    }
};

const actions = {
    [SettingsAction.local.FETCH_USER](context) {
        return new Promise((resolve, reject) => {
            return SettingsAxiosService.fetchUser().then(response => {
                context.commit(SettingsAction.local.SET_USER, response.data);
                resolve(response.data);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        });
    },

    [SettingsAction.remote.UPDATE_FIELD](context, data) {
        return new Promise((resolve, reject) => {
            return SettingsAxiosService.updateField(data).then(response => {
                resolve(response.data);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        })
    }
}

const getters = {
    getUser: state => {
        return state.user;
    }
}

export const settings = {
    namespaced: true,
    state: initialState,
    mutations,
    actions,
    getters
}