# REST study

## Extensions used
- https://marketplace.visualstudio.com/items?itemName=humao.rest-client
- https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers

## Run application


1. execute docker 
`docker compose up`

2. enter inside the container
`docker compose exec app bash`

3. inside the container
`npm run dev`


## Use rest client
In the file api.http you can find api rest calls. You should use the extension rest client for more praticity.

## Exemplo REST meia boca para E-commerce

| Operação                                      | Método HTTP | Path                                           |
|-----------------------------------------------|-------------|------------------------------------------------|
| JWT login                                     | POST        | /jwt/login                                     |
| Session login                                 | POST        | /session/login                                 |
| Session logout                                | POST        | /session/logout                                |
| Create a customer                             | POST        | /customers/createCustomer                      |
| Get a customer by ID                          | GET         | /admin/customers/getCustomerById               |
| List customers with pagination                | GET         | /admin/customers/listCustomers                 |
| Update a customer                             | POST        | /admin/customers/updateCustomer                |
| Delete a customer                             | POST        | /admin/customers/deleteCustomer                |
| Create a category                             | POST        | /admin/categories/createCategory               |
| Get a category by slug                        | GET         | /categories/getCategoryBySlug                  |
| List categories with pagination               | GET         | /categories/listCategories                     |
| List categories in admin with pagination      | GET         | /admin/categories/listCategories               |
| Update a category                             | POST        | /admin/categories/updateCategory               |
| Delete a category                             | POST        | /admin/categories/deleteCategory               |
| Create a product                              | POST        | /admin/products/createProduct                  |
| Get a product by ID                           | GET         | /admin/products/getProductById                 |
| Get a product by slug                         | GET         | /products/getProductBySlug                     |
| Update a product                              | POST        | /admin/products/updateProduct                  |
| Delete a product                              | POST        | /admin/products/deleteProduct                  |
| List products with pagination                 | GET         | /products/listProducts                         |
| List products in admin with pagination        | GET         | /admin/products/listProducts                   |
| Get CSV of products                           | GET         | /admin/products/listProducts.csv               |
| Add an item to the cart                       | POST        | /carts/addItemToCart                           |
| Get a cart by ID                              | GET         | /carts/getCart                                 |
| Remove an item from the cart                  | POST        | /carts/removeItemFromCart                      |
| Clear the cart                                | POST        | /carts/clearCart                               |
| Create an order                               | POST        | /orders/createOrder                            |
| List orders with pagination                   | GET         | /orders/listOrders                             |

