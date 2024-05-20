# Store

In a component you map actions, mutations and getters.

Actions are related to logic, like retriving data from service.
```javascript
methods: {
    ...mapActions('store_namespace', { your_method_name: action_name })
}

methods: {
    ...mapActions('products', { fetchProducts: ProductsAction.remote.FETCH_ALL })
}
```

Mutations are related to changing the value of stored data
They are only called by actions inside a store.

Getters are needed to retrieve stored data.
```javascript
computed: {
    ...mapGetters('store_namespace', ['getter_name']),
}

computed: {
    ...mapGetters('products', ['getProducts']),
}
```

## Pages

actions
remote.FETCH_HOME

mutations
local.SET_CATEGORIES

getters
getCategories

## Auth

actions
remote.LOGIN
remote.REGISTER
local.LOGOUT

mutations
local.SET_USER
local.LOGOUT
local.IS_LOGGED_IN

getters
isLoggedIn
isAdmin
currentUser

## Settings

actions
local.FETCH_USER
remote.UPDATE_FIELD

mutations
local.SET_USER

getters
getUser

## Products

actions
remote.FETCH_ALL
remote.FETCH_BY_SLUG
remote.FETCH_ALL_BY_CATEGORY
remote.CREATE
remote.DELETE
remote.PATCH

mutations
local.SET_PRODUCTS
local.SET_PRODUCT

getters
getProducts
getProduct

## Categories

actions
remote.FETCH_ALL
remote.CREATE
remote.DELETE
remote.PATCH

mutations
local.SET_CATEGORIES

getters
getCategories

## Orders

actions
remote.FETCH_ALL
remote.FETCH_BY_ID
remote.MAKE_ORDER_REUSING_ADDRESS
remote.MAKE_ORDER_WITH_NEW_ADDRESS

mutations
local.SET_ORDERS
local.SET_ORDER

getters
getOrders
getOrderProducts

## Addresses

actions
remote.FETCH_ALL
remote.DELETE

mutations
local.SET_ADDRESSES

getters
getAddresses

## Notifications

actions
TOGGLE_POPUP_CART

mutations
TOGGLE_POPUP_CART
SET_IS_LOADING
SHOW_TOAST_SUCCESS
SHOW_TOAST_ERROR
CLEAR_TOAST
SHOW_ALERT_SUCCESS
SHOW_DIALOG_ERROR
CLEAR_ALERT

getters
shouldShowCartDialog
isAppLoading
getMessages
getToast
getToastMessage
getToastClassName
getAlert
getAlertMessage
getDialogClassName

## Cart

actions
ADD_PRODUCT_TO_CART
REMOVE_FROM_CART
UPDATE_CART_ITEM_QUANTITY
CLEAR_CART

mutations
SET_CART_ITEMS
CLEAR_CART

getters
getProductsInCart
getTotalPrice
getCartItemQuantity