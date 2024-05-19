import { NotificationAction, PagesAction } from "@/store/types.actions";
import { PagesAxiosService } from "@/services/remote/pages.axios.service";

const initialState = {
    isLoading: true,
    categories: []
};

const mutations = {
    [PagesAction.local.SET_CATEGORIES](state, data) {
        state.categories = data;
    }
};

const actions = {
    [PagesAction.remote.FETCH_HOME](context) {
        return new Promise((resolve, reject) => {
            return PagesAxiosService.fetchHome().then(({ data }) => {
                context.commit(PagesAction.local.SET_CATEGORIES, data);
                resolve(data);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        });

    }
};

const getters = {
    getCategories: state => state.categories
};

export const pages = {
    namespaced: true,
    state: initialState,
    mutations,
    actions,
    getters
};