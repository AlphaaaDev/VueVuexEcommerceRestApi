# Store

Vue store provides actions, mutations and getters to components.

Stores are divided in modules which are declared in the /store/index.js

Inside /store/types.actions.js you can find enum constants for the actions and mutations name to avoid spelling mistakes.

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

Mutations are related to changing the value of stored data. They are only called by actions inside a store.

Getters are needed to retrieve stored data.
```javascript
computed: {
    ...mapGetters('store_namespace', ['getter_name']),
}

computed: {
    ...mapGetters('products', ['getProducts']),
}
```

## Auth

### Actions

| Name                               | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| remote.LOGIN                       | Call auth service to login and set local storage data with user informations |
| remote.REGISTER                    | Call auth service to register                                                |
| local.LOGOUT                       | Call local.LOGOUT mutation to clear local storage data                       |

### Getters

| Name                               | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| isLoggedIn                         | Get if user is logged in                                                     |
| isAdmin                            | Get if user is admin                                                         |
| currentUser                        | Get current user data                                                        |

## Settings

### Actions

| Name                               | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| remote.UPDATE_FIELD                | Update user fields                                                           |

## Products

### Actions

| Name                               | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| remote.FETCH_ALL                   | Fetch all products                                                           |
| remote.FETCH_BY_SLUG               | Fetch product by slug                                                        |
| remote.FETCH_ALL_BY_CATEGORY       | Fetch all products by category                                               |
| remote.CREATE                      | Create product                                                               |
| remote.DELETE                      | Delete product by id                                                         |
| remote.PATCH                       | Patch product (id needs to be passed inside product data)                    |

### Getters

| Name                               | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| getProducts                        | Get all products (or by category)                                            |
| getProduct                         | Get last fetched product                                                     |

## Categories

### Actions

| Name                               | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| remote.FETCH_ALL                   | Fetch all categories                                                         |
| remote.CREATE                      | Create category                                                              |
| remote.DELETE                      | Delete category by id                                                        |
| remote.PATCH | Patch category (id needs to be passed inside category data)

### Getters

| Name                               | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| getCategories                      | Get all categories                                                           |

## Orders

### Actions

| Name                               | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| remote.FETCH_ALL                   | Fetch all orders                                                             |
| remote.FETCH_BY_ID                 | Fetch order by id                                                            |
| remote.MAKE_ORDER_REUSING_ADDRESS  | Create order with address id                                                 |
| remote.MAKE_ORDER_WITH_NEW_ADDRESS | Create order with address data                                               |

### Getters

| Name                               | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| getOrders                          | Get all orders                                                               |
| getOrderProducts                   | Get last fetched order products                                              |

## Addresses

### Actions

| Name                               | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| remote.FETCH_ALL                   | Fetch all addresses                                                          |
| remote.DELETE                      | Delete address by id                                                         |

### Getters

| Name                               | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| getAddresses                       | Get all addresses                                                            |

## Notifications

### Actions

| Name                               | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| TOGGLE_POPUP_CART                  | Toggle popup cart state                                                      |

### Mutations

| Name                               | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| SHOW_DIALOG_ERROR                  | Set dialog to visible with type error and the message provided               |
| CLEAR_ALERT                        | Set dialog to hidden                                                         |

### Getters

| Name                               | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| shouldShowCartDialog               | Get if popup cart is visible                                                 |
| getAlert                           | Get alert data (type and message)                                            |
| getAlertMessage                    | Get alert message                                                            |

## Cart

### Actions

| Name                               | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| ADD_PRODUCT_TO_CART                | Add product to cart with the specified quantity                              |
| REMOVE_FROM_CART                   | Remove product from cart                                                     |
| UPDATE_CART_ITEM_QUANTITY          | Update product quantity                                                      |
| CLEAR_CART                         | Clear cart                                                                   |

### Getters

| Name                               | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| getProductsInCart                  | Get products in cart                                                         |
| getTotalPrice                      | Calculate and return total cart price                                        |
| getCartItemQuantity                | Get product quantity by slug                                                 |