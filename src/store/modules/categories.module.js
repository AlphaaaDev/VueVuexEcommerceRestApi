import { NotificationAction, CategoryAction } from "@/store/types.actions";
import { CategoriesAxiosService } from "@/services/remote/categories.axios.service";

const initialState = {
    isLoading: true,
    categories: []
};

const mutations = {
    [CategoryAction.local.SET_CATEGORIES](state, categories) {
        state.categories = categories;
    }
};

const actions = {
    [CategoryAction.remote.FETCH_ALL](context) {
        return new Promise((resolve, reject) => {
            return CategoriesAxiosService.fetchAll().then(response => {
                context.commit(CategoryAction.local.SET_CATEGORIES, response.data);
                resolve(response.data);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        });
    },

    [CategoryAction.remote.CREATE](context, category) {
        return new Promise((resolve, reject) => {
            CategoriesAxiosService.create(category).then(res => {
                resolve(res.data);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        });
    },

    [CategoryAction.remote.DELETE](context, id) {
        return new Promise((resolve, reject) => {
            return CategoriesAxiosService.delete(id).then(response => {
                resolve(response.data);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        });
    },

    [CategoryAction.remote.PATCH](context, category) {
        return new Promise((resolve, reject) => {
            return CategoriesAxiosService.patch(category).then(response => {
                resolve(response);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        });
    }
};

const getters = {
    getCategories: state => {
        return state.categories;
    }
};

export const categories = {
    namespaced: true,
    state: initialState,
    mutations,
    actions,
    getters
};

function stripResponse(response) {
    // All my server application return success(boolean) and full_messages(array)
    // We do not want them to be stored in the state, so let's delete them
    delete response.success;
    delete response.full_messages;
    return response;
}