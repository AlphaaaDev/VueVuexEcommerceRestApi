# Services

## Local

|                     | Method       | Description                                                                                   |
|---------------------|--------------|-----------------------------------------------------------------------------------------------|
| LocalStorageService | get          | Get local storage item                                                                        |
|                     | set          | Set local storage item                                                                        |
|                     | remove       | Remove local storage item                                                                     |
|                     |              |                                                                                               |
| JwtService          | getToken     | Get current user authentication token from local storage                                      |
|                     | saveUser     | Save user data in local storage                                                               |
|                     | getUser      | Get user data from local storage                                                              |
|                     | clearSession | Remove authentication token from local storage                                                |
|                     |              |                                                                                               |
| UsersService        | login        | Call AuthAxiosService login                                                                   |
|                     | register     | Call AuthAxiosService register                                                                |
|                     | init         | If user exists in JwtService (local storage), set user in AxiosService (for backend requests) |
|                     | getUser      | Call JwtService getUser                                                                       |
|                     |              |                                                                                               |
| CartService         | addItem      | Add product with quantity to cart (set local storage item representing cart)                  |
|                     | getCart      | Return cart items saved in local storage                                                      |
|                     | removeItem   | Remove product from cart and update local storage                                             |
|                     | emptyCart    | Empty cart (remove local storage cart)                                                        |

## Remote

|                        | Method                 | Request                     | Description                                                              |
|------------------------|------------------------|-----------------------------|--------------------------------------------------------------------------|
| AxiosService           | get                    | GET                         | Get request                                                              |
|                        | post                   | POST                        | Post request                                                             |
|                        | delete                 | DELETE                      | Delete request                                                           |
|                        | patch                  | PATCH                       | Patch request                                                            |
|                        | setUser                |                             | Set user data for requests (Authorization token)                         |
|                        |                        |                             |                                                                          |
| PagesAxiosService      | fetchHome              | GET /                       | Fetch homepage categories                                                |
|                        |                        |                             |                                                                          |
| AuthAxiosService       | login                  | POST /users/login           | Post login form and return if validated successfully                     |
|                        | register               | POST /users                 | Post register form and return if validated successfully                  |
|                        |                        |                             |                                                                          |
| SettingsAxiosService   | fetchUser              | GET /users                  | Fetch user data                                                          |
|                        | updateField            | PATCH /users                | Patch user fields and return if patched successfully                     |
|                        |                        |                             |                                                                          |
| ProductsAxiosService   | fetchAll               | GET /products               | Fetch all products                                                       |
|                        | fetchBySlug            | GET /products/:slug         | Fetch product by slug                                                    |
|                        | fetchAllByCategory     | GET /categories/:categoryId | Fetch all products of category                                           |
|                        | create                 | POST /products              | Post product form and return if created successfully                     |
|                        | delete                 | DELETE /products/:id        | Delete product by id and return if deleted successfully                  |
|                        | patch                  | PATCH /products             | Patch product fields and return if patched successfully                  |
|                        |                        |                             |                                                                          |
| CategoriesAxiosService | fetchAll               | GET /categories             | Fetch all categories                                                     |
|                        | create                 | POST /categories            | Post category form and return if created successfully                    |
|                        | delete                 | DELETE /categories/:id      | Delete category by id and return if deleted succesfully                  |
|                        | patch                  | PATCH /categories           | Patch category fields and return if patched successfully                 |
|                        |                        |                             |                                                                          |
| OrdersAxiosService     | fetchAll               | GET /orders                 | Fetch all orders                                                         |
|                        | fetchById              | GET /orders/:id             | Fetch order by id                                                        |
|                        | checkoutWithNewAddress | POST /orders                | Post cart items and address fields, and return if checkout is successful |
|                        | checkoutReusingAddress | POST /orders                | Post cart items and address id, and return if checkout is successful     |
|                        |                        |                             |                                                                          |
| AddressesAxiosService  | fetchAll               | GET /addresses              | Fetch all addresses                                                      |
|                        | delete                 | DELETE /addresses/:id       | Delete address by id and return if deleted successfully                  |