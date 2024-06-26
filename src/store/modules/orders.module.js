import { NotificationAction, OrderAction } from "@/store/types.actions";
import { OrdersAxiosService } from "@/services/remote/orders.axios.service";

const initialState = {
    orders: [],
    order: []
};

const mutations = {
    [OrderAction.local.SET_ORDERS](state, orders) {
        state.orders = orders;
    },

    [OrderAction.local.SET_ORDER](state, order) {
        state.order = order;
    }
};

const actions = {
    [OrderAction.remote.FETCH_ALL](context) {
        return new Promise((resolve, reject) => {
            return OrdersAxiosService.fetchAll().then(response => {
                context.commit(OrderAction.local.SET_ORDERS, response.data);
                resolve(response.data);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        });

    },
    [OrderAction.remote.FETCH_BY_ID](context, id) {
        return new Promise((resolve, reject) => {
            OrdersAxiosService.fetchById(id).then(res => {
                context.commit(OrderAction.local.SET_ORDER, res.data.order_items);
                resolve(res.data.order_items);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        });
    },
    [OrderAction.remote.MAKE_ORDER_REUSING_ADDRESS](context, { cart_items, address_id }) {
        return new Promise((resolve, reject) => {
            return OrdersAxiosService.checkoutReusingAddress(cart_items, address_id).then(response => {
                context.dispatch("cart/CLEAR_CART", false, { root: true });
                resolve(response.data);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        });
    },
    [OrderAction.remote.MAKE_ORDER_WITH_NEW_ADDRESS](context, { cart_items, address }) {
        return new Promise((resolve, reject) => {
            return OrdersAxiosService.checkoutWithNewAddress(cart_items, address).then(response => {
                context.dispatch("cart/CLEAR_CART", false, { root: true });
                resolve(response.data);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        });
    },
};

const getters = {
    getOrders: state => state.orders,

    getOrderProducts: state => state.order
};

export const orders = {
    namespaced: true,
    state: initialState,
    mutations,
    actions,
    getters
};