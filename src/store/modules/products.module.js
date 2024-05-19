import { NotificationAction, ProductAction } from "@/store/types.actions";
import { ProductsAxiosService } from "@/services/remote/products.axios.service";


function stripResponse(response) {
    // All my server application return success(boolean) and full_messages(array)
    // We do not want them to be stored in the state, so let's delete them
    delete response.success;
    delete response.full_messages;
    return response;
}

const initialState = {
    isLoading: true,
    products: [],
    product: {}
};

const mutations = {
    [ProductAction.local.SET_PRODUCTS](state, products) {
        state.products = products;
    },

    [ProductAction.local.SET_PRODUCT](state, product) {
        state.product = product;
    }
};

const actions = {
    [ProductAction.remote.FETCH_ALL](context) {
        return new Promise((resolve, reject) => {
            return ProductsAxiosService.fetchAll().then(response => {
                context.commit(ProductAction.local.SET_PRODUCTS, response.data);
                resolve(response.data);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        });
    },

    [ProductAction.remote.FETCH_BY_SLUG](context, slug) {
        return new Promise((resolve, reject) => {
            ProductsAxiosService.fetchBySlug(slug).then(res => {
                context.commit(ProductAction.local.SET_PRODUCT, res.data);
                resolve(res.data)
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        });
    },

    [ProductAction.remote.FETCH_ALL_BY_CATEGORY](context, category) {
        return new Promise((resolve, reject) => {
            ProductsAxiosService.fetchAllByCategory(category).then(res => {
                context.commit(ProductAction.local.SET_PRODUCTS, res.data);
                resolve(res.data);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        });
    },

    [ProductAction.remote.CREATE](context, product) {
        return new Promise((resolve, reject) => {
            ProductsAxiosService.create(product).then(res => {
                resolve(res.data);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        });
    },

    [ProductAction.remote.DELETE](context, id) {
        return new Promise((resolve, reject) => {
            return ProductsAxiosService.delete(id).then(response => {
                resolve(response);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        });
    },

    [ProductAction.remote.PATCH](context, product) {
        return new Promise((resolve, reject) => {
            return ProductsAxiosService.patch(product).then(response => {
                resolve(response);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        });
    }
};

const getters = {
    getProducts: state => {
        return state.products;
    },

    getProduct: state => {
        return state.product;
    },

    getProductBySlug: state => slug => state.products.find(p => p.slug === slug)
};

export const products = {
    namespaced: true,
    state: initialState,
    mutations,
    actions,
    getters
};