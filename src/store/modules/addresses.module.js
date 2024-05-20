import { AddressAction, NotificationAction } from "@/store/types.actions";
import { AddressesAxiosService } from "@/services/remote/addresses.axios.service";

const initialState = {
    addresses: []
};

const mutations = {
    [AddressAction.local.SET_ADDRESSES](state, addresses) {
        state.addresses = addresses;
    }
};

const actions = {
    [AddressAction.remote.FETCH_ALL](context) {
        return new Promise((resolve, reject) => {
            return AddressesAxiosService.fetchAll().then(response => {
                context.commit(AddressAction.local.SET_ADDRESSES, response.data);
                resolve(response.data);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        });
    },

    [AddressAction.remote.DELETE](context, id) {
        return new Promise((resolve, reject) => {
            return AddressesAxiosService.delete(id).then(response => {
                resolve(response);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        });
    }
};

const getters = {
    getAddresses: state => state.addresses
};

export const addresses = {
    namespaced: true,
    state: initialState,
    mutations,
    actions,
    getters
};