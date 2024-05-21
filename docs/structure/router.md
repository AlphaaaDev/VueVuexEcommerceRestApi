# Router

| Route                | Component      |
| -------------------- | -------------- |
| '/'                  | Home           |

## Products

| Route                | Component      |
| -------------------- | -------------- |
| '/products'          | Products       |
| '/products/:slug'    | ProductDetails |

## Categories

| Route                | Component      |
| -------------------- | -------------- |
| '/categories/:slug'  | Category       |

## Cart

| Route                | Component      |
| -------------------- | -------------- |
| '/cart'              | MyCart         |
| '/cart/checkout'     | Checkout       |

## Users


| Route                | Component      |
| -------------------- | -------------- |
| '/users/login'       | Login          |
| '/users/register'    | Register       |

### Authenticated

| Route                | Component      |
| -------------------- | -------------- |
| '/users/settings'    | Settings       |
| '/users/orders'      | Orders         |
| '/users/orders/:id'  | OrderDetails   |
| '/users/addresses'   | Addresses      |

## Admin (Authenticated and Admin)

| Route                | Component      |
| -------------------- | -------------- |
| '/admin/products'    | EditProducts   |
| '/admin/categories'  | EditCategories |