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

<h2>Authentication</h2>

<h3>Route: POST /api/user/register</h3>

<p>Description: Register a new user.</p>

<p>Request Body:</p>
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

<p>Response: Status 201 - User registered successfully.</p>


<h3>Route: POST /api/user/login</h3>

<p>Description: Log in an existing user.</p>

<p>Request Body:</p>
<pre>
{
  "email": "john@example.com",
  "password": "secretpassword"
}
</pre>

<p>Response: Status 200 - Login successful, returns JWT token.</p>


<h3>Route: GET /api/user/</h3>

<p>Description: Get a list of all users (Admin only).</p>

<p>Response: Status 200 - List of all users.</p>


<h3>Route: PUT /api/user/:id</h3>

<p>Description: Update user details by user ID (Authenticated users only).</p>

<p>Request Body:</p>
<pre>
{
  "firt_name": "John",
  "last_name": "Doe",
  "user_name": "johndoe",
  "email": "john@example.com",
  "mobile": "1234567890"
}
</pre>

<p>Response: Status 200 - User details updated successfully.</p>


<h3>Route: DELETE /api/user/:id</h3>

<p>Description: Delete a user by user ID (Admin only).</p>

<p>Response: Status 200 - User deleted successfully.</p>


<h2>User Addresses</h2>

<h3>Route: POST /api/user/:id/addresses/add</h3>

<p>Description: Add a new address for a user (Authenticated users only).</p>

<p>Request Body:</p>
<pre>
{
  "country": "Country Name",
  "city": "City Name",
  "zip": 12345,
  "street": "Street Name",
  "house_number": 21
}
</pre>

<p>Response: Status 201 - Address added successfully.</p>


<h3>Route: GET /api/user/:id/addresses/</h3>

<p>Description: Get all addresses for a user (Authenticated users only).</p>

<p>Response: Status 200 - List of all user addresses.</p>


<h3>Route: GET /api/user/:id/addresses/:addressId</h3>

<p>Description: Get a specific address for a user (Authenticated users only).</p>

<p>Response: Status 200 - Address details.</p>


<h3>Route: DELETE /api/user/:id/addresses/:addressId</h3>

<p>Description: Delete a specific address for a user (Authenticated users only).</p>

<p>Response: Status 200 - Address deleted successfully.</p>


<h3>Route: PUT /api/user/:id/addresses/:addressId</h3>

<p>Description: Update a specific address for a user (Authenticated users only).</p>

<p>Request Body:</p>
<pre>
{
  "country": "New Country Name",
  "city": "New City Name",
  "zip": 54321,
  "street": "New Street Name",
  "house_number": 42
}
</pre>

<p>Response: Status 200 - Address updated successfully.</p>


<h2>Cart</h2>

<h3>Route: POST /api/user/cart/add-to-cart/:productId</h3>

<p>Description: Add an item to the user's cart (Authenticated users only).</p>

<p>Response: Status 200 - Item added to cart.</p>


<h3>Route: DELETE /api/user/cart/remove-from-cart/:productId</h3>

<p>Description: Remove an item from the user's cart (Authenticated users only).</p>

<p>Response: Status 200 - Item removed from cart.</p>


<h3>Route: PATCH /api/user/cart/reduce-cart-item/:productId</h3>

<p>Description: Reduce the quantity of an item in the cart (Authenticated users only).</p>

<p>Response: Status 200 - Item quantity reduced in cart.</p>


<h3>Route: DELETE /api/user/cart/clear-cart</h3>

<p>Description: Clear the cart (Authenticated users only).</p>



## Contributing

To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: git checkout -b feature-name.
3. Commit your changes: git commit -m 'Add some feature'.
4. Push to the branch: git push origin feature-name.
5. Submit a pull request.

