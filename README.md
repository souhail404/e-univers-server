# e-univers-server - An E-commerce Website Server



This is the backend server for the e-univers website, which is an E-commerce platform that allows users to browse and purchase various products online. The server provides a robust API for managing products, categories, orders, and user data.

## Features

- User registration and login with JWT authentication
- Browse and search for products
- Add products to cart and wishlist
- Create and manage product categories
- Place and track orders
- Admin functionality for managing products and orders

## Requirements

Before running the project, ensure you have the following installed:

- Node.js
- MongoDB

## Installation

Follow these steps to set up the project locally:

1. Clone the repository from GitHub: `git clone https://github.com/souhail404/e-univers-server.git`
2. Navigate to the project directory: `cd e-univers-server`
3. Install the dependencies: `npm install`

## Usage

To start the server, run: `npm start`

The server will be up and running at `http://localhost:4000`.

## API Documentation

<h3>Authentication</h3>

<p><strong><ins>Route:</ins></strong> POST /api/user/register</p>

<strong><ins>Description:</ins></strong> Register a new user.

<strong><ins>Request Body:</ins></strong>
<pre>
{
  "firt_name": "John",
  "last_name": "Doe",
  "user_name": "johndoe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "password": "secretpassword"
}
</pre>

<p><strong><ins>Response:</ins></strong></p> Status 201 - User registered successfully.
<hr/>

<p><strong><ins>Route:</ins></strong> POST /api/user/login</p>

<strong><ins>Description:</ins></strong> Log in an existing user.

<strong><ins>Request Body:</ins></strong>
<pre>
{
  "email": "john@example.com",
  "password": "secretpassword"
}
</pre>

<p><strong><ins>Response:</ins></strong></p> Status 200 - Login successful, returns JWT token.
<hr/>

<p><strong><ins>Route:</ins></strong> GET /api/user/</p>

<strong><ins>Description:</ins></strong> Get a list of all users (Admin only).

<p><strong><ins>Response:</ins></strong></p> Status 200 - List of all users.
<hr/>

<p><strong><ins>Route:</ins></strong> PUT /api/user/:id</p>

<strong><ins>Description:</ins></strong> Update user details by user ID (Authenticated users only).

<strong><ins>Request Body:</ins></strong>
<pre>
{
  "firt_name": "John",
  "last_name": "Doe",
  "user_name": "johndoe",
  "email": "john@example.com",
  "mobile": "1234567890"
}
</pre>

<p><strong><ins>Response:</ins></strong></p> Status 200 - User details updated successfully.
<hr/>

<p><strong><ins>Route:</ins></strong> DELETE /api/user/:id</p>

<strong><ins>Description:</ins></strong> Delete a user by user ID (Admin only).

<p><strong><ins>Response:</ins></strong></p> Status 200 - User deleted successfully.

<h3>User Addresses</h3>

<p><strong><ins>Route:</ins></strong> POST /api/user/:id/addresses/add</p>

<strong><ins>Description:</ins></strong> Add a new address for a user (Authenticated users only).

<strong><ins>Request Body:</ins></strong>
<pre>
{
  "country": "Country Name",
  "city": "City Name",
  "zip": 12345,
  "street": "Street Name",
  "house_number": 21
}
</pre>

<p><strong><ins>Response:</ins></strong></p> Status 201 - Address added successfully.
<hr/>

<p><strong><ins>Route:</ins></strong> GET /api/user/:id/addresses/</p>

<strong><ins>Description:</ins></strong> Get all addresses for a user (Authenticated users only).

<p><strong><ins>Response:</ins></strong></p> Status 200 - List of all user addresses.
<hr/>

<p><strong><ins>Route:</ins></strong> GET /api/user/:id/addresses/:addressId</p>

<strong><ins>Description:</ins></strong> Get a specific address for a user (Authenticated users only).

<p><strong><ins>Response:</ins></strong></p> Status 200 - Address details.
<hr/>

<p><strong><ins>Route:</ins></strong> DELETE /api/user/:id/addresses/:addressId</p>

<strong><ins>Description:</ins></strong> Delete a specific address for a user (Authenticated users only).

<p><strong><ins>Response:</ins></strong></p> Status 200 - Address deleted successfully.
<hr/>

<p><strong><ins>Route:</ins></strong> PUT /api/user/:id/addresses/:addressId</p>

<strong><ins>Description:</ins></strong> Update a specific address for a user (Authenticated users only).

<strong><ins>Request Body:</ins></strong>
<pre>
{
  "country": "New Country Name",
  "city": "New City Name",
  "zip": 54321,
  "street": "New Street Name",
  "house_number": 42
}
</pre>

<p><strong><ins>Response:</ins></strong></p> Status 200 - Address updated successfully.

<h3>Cart</h3>

<p><strong><ins>Route:</ins></strong> POST /api/user/cart/add-to-cart/:productId</p>

<strong><ins>Description:</ins></strong> Add an item to the user's cart (Authenticated users only).

<p><strong><ins>Response:</ins></strong></p> Status 200 - Item added to cart.
<hr/>

<p><strong><ins>Route:</ins></strong> DELETE /api/user/cart/remove-from-cart/:productId</p>

<strong><ins>Description:</ins></strong> Remove an item from the user's cart (Authenticated users only).

<p><strong><ins>Response:</ins></strong></p> Status 200 - Item removed from cart.
<hr/>

<p><strong><ins>Route:</ins></strong> PATCH /api/user/cart/reduce-cart-item/:productId</p>

<strong><ins>Description:</ins></strong> Reduce the quantity of an item in the cart (Authenticated users only).

<p><strong><ins>Response:</ins></strong></p> Status 200 - Item quantity reduced in cart.
<hr/>

<p><strong><ins>Route:</ins></strong> DELETE /api/user/cart/clear-cart</p>

<strong><ins>Description:</ins></strong> Clear the cart (Authenticated users only).

<p><strong><ins>Response:</ins></strong></p> Status 200 - Cart cleared successfully.

<h3>Wishlist</h3>

<p><strong><ins>Route:</ins></strong> POST /api/user/wishlist/add/:productId</p>

<strong><ins>Description:</ins></strong> Add an item to the user's wishlist (Authenticated users only).

<p><strong><ins>Response:</ins></strong></p> Status 200 - Item added to wishlist.
<hr/>

<p><strong><ins>Route:</ins></strong> DELETE /api/user/wishlist/remove/:productId</p>

<strong><ins>Description:</ins></strong> Remove an item from the user's wishlist (Authenticated users only).

<p><strong><ins>Response:</ins></strong></p> Status 200 - Item removed from wishlist.

<h3>Orders</h3>

<p><strong><ins>Route:</ins></strong> POST /api/user/order/create-order</p>

<strong><ins>Description:</ins></strong> Create a new order (Authenticated users only).

<strong><ins>Request Body:</ins></strong>
<pre>
{
  "items": [
    {
      "quantity": 2,
      "item_id": "product_id_1"
    },
    {
      "quantity": 3,
      "item_id": "product_id_2"
    }
  ],
  "shipping_address": "Address details here"
}
</pre>

<p><strong><ins>Response:</ins></strong></p> Status 201 - Order created successfully.
<hr/>

<p><strong><ins>Route:</ins></strong> PUT /api/user/order/change-order-state/:orderId</p>

<strong><ins>Description:</ins></strong> Change the state of an order (Admin only).

<strong><ins>Request Body:</ins></strong>
<pre>
{
  "order_state": "delivered"
}
</pre>

<p><strong><ins>Response:</ins></strong></p> Status 200 - Order state updated successfully.

## Contributing

To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: git checkout -b feature-name.
3. Commit your changes: git commit -m 'Add some feature'.
4. Push to the branch: git push origin feature-name.
5. Submit a pull request.

