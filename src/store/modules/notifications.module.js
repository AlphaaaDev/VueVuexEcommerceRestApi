import { NotificationAction } from "@/store/types.actions";

const state = {
    showPopupCart: false,

    alert: { message: '', class_name: '' }
};

const mutations = {
    [NotificationAction.TOGGLE_POPUP_CART](state) {
        state.showPopupCart = !state.showPopupCart;
    },

    [NotificationAction.SHOW_DIALOG_ERROR](state, message) {
        state.alert = { class_name: 'alert alert-danger', message };
    },

    [NotificationAction.CLEAR_ALERT](state) {
        state.alert = { message: '', class_name: '' };
    }
};

const actions = {
    [NotificationAction.TOGGLE_POPUP_CART]: (context) => {
        context.commit('TOGGLE_POPUP_CART');
    },
};

const getters = {
    shouldShowCartDialog: state => state.showPopupCart,

    getAlert: (state) => state.alert,
    getAlertMessage: (state) => state.alert.message
};

export const notifications = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};