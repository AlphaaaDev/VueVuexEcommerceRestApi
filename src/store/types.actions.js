export const ProductAction = {
    remote: {
        FETCH_ALL: 'FETCH_ALL',
        FETCH_BY_SLUG: 'FETCH_BY_SLUG',
        FETCH_ALL_BY_CATEGORY: 'FETCH_ALL_BY_CATEGORY',
        CREATE: 'CREATE',
        DELETE: 'DELETE',
        PATCH: 'PATCH'
    },
    local: {
        SET_PRODUCTS: 'SET_PRODUCTS',
        SET_PRODUCT: 'SET_PRODUCT'
    }
};

export const AddressAction = {
    remote: {
        FETCH_ALL: 'FETCH_ALL',
        DELETE: 'DELETE'
    },
    local: {
        SET_ADDRESSES: 'SET_ADDRESSES',
    }
};

export const AuthAction = {
    remote: {
        LOGIN: 'LOGIN',
        REGISTER: 'REGISTER'
    },
    local: {
        SET_USER: 'SET_USER',
        LOGOUT: 'LOGOUT',

        IS_LOGGED_IN: 'IS_LOGGED_IN'
    }
};

export const NotificationAction = {
    SET_IS_LOADING: 'SET_IS_LOADING',
    SET_ERROR: 'SET_ERROR',

    SHOW_TOAST_SUCCESS: 'SHOW_TOAST_SUCCESS',
    SHOW_TOAST_ERROR: 'SHOW_TOAST_ERROR',
    CLEAR_TOAST: 'CLEAR_TOAST',

    SHOW_ALERT_SUCCESS: 'SHOW_ALERT_SUCCESS',
    SHOW_DIALOG_ERROR: 'SHOW_DIALOG_ERROR',
    CLEAR_ALERT: 'CLEAR_ALERT',

    TOGGLE_POPUP_CART: 'TOGGLE_POPUP_CART'
};

export const PagesAction = {
    remote: {
        FETCH_HOME: 'FETCH_HOME',
    },
    local: {
        SET_CATEGORIES: 'SET_CATEGORIES'
    }
};

export const OrderAction = {
    remote: {
        FETCH_ALL: 'FETCH_ALL',
        FETCH_BY_ID: 'FETCH_BY_ID',
        MAKE_ORDER_REUSING_ADDRESS: 'MAKE_ORDER_REUSING_ADDRESS',
        MAKE_ORDER_WITH_NEW_ADDRESS: 'MAKE_ORDER_WITH_NEW_ADDRESS'
    },
    local: {
        SET_ORDERS: 'SET_ORDERS',
        SET_ORDER: 'SET_ORDER'
    }
};

export const CartAction = {
    ADD_PRODUCT_TO_CART: 'ADD_PRODUCT_TO_CART',
    UPDATE_CART_ITEM_QUANTITY: 'UPDATE_CART_ITEM_QUANTITY',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    CLEAR_CART: 'CLEAR_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART'
};

export const CategoryAction = {
    remote: {
        FETCH_ALL: 'FETCH_ALL',
        CREATE: 'CREATE',
        DELETE: 'DELETE',
        PATCH: 'PATCH'
    },
    local: {
        SET_CATEGORIES: 'SET_CATEGORIES'
    }
};

export const SettingsAction = {
    remote: {
        UPDATE_FIELD: 'UPDATE_FIELD'
    },
    local: {
        SET_USER: 'SET_USER',
        FETCH_USER: 'FETCH_USER'
    }
}