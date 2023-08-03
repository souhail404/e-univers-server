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

<h3>---- Authentication ----</h3>

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

<strong><ins>Response:</ins></strong> Status 201 - User registered successfully.
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

<strong><ins>Response:</ins></strong> Status 200 - Login successful, returns JWT token.
<hr/>

<h3>---- User ----</h3>

<p><strong><ins>Route:</ins></strong> GET /api/user/</p>

<strong><ins>Description:</ins></strong> Get a list of all users (Admin only).

<strong><ins>Response:</ins></strong> Status 200 - List of all users.
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

<strong><ins>Response:</ins></strong> Status 200 - User details updated successfully.
<hr/>

<p><strong><ins>Route:</ins></strong> DELETE /api/user/:id</p>

<strong><ins>Description:</ins></strong> Delete a user by user ID (Admin only).

<strong><ins>Response:</ins></strong> Status 200 - User deleted successfully.

<h3>---- User Addresses ----</h3>

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

<strong><ins>Response:</ins></strong> Status 201 - Address added successfully.
<hr/>

<p><strong><ins>Route:</ins></strong> GET /api/user/:id/addresses/</p>

<strong><ins>Description:</ins></strong> Get all addresses for a user (Authenticated users only).

<strong><ins>Response:</ins></strong> Status 200 - List of all user addresses.
<hr/>

<p><strong><ins>Route:</ins></strong> GET /api/user/:id/addresses/:addressId</p>

<strong><ins>Description:</ins></strong> Get a specific address for a user (Authenticated users only).

<strong><ins>Response:</ins></strong> Status 200 - Address details.
<hr/>

<p><strong><ins>Route:</ins></strong> DELETE /api/user/:id/addresses/:addressId</p>

<strong><ins>Description:</ins></strong> Delete a specific address for a user (Authenticated users only).

<strong><ins>Response:</ins></strong> Status 200 - Address deleted successfully.
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

<strong><ins>Response:</ins></strong> Status 200 - Address updated successfully.

<h3>---- Cart ----</h3>

<p><strong><ins>Route:</ins></strong> POST /api/user/cart/add-to-cart/:productId</p>

<strong><ins>Description:</ins></strong> Add an item to the user's cart (Authenticated users only).

<strong><ins>Response:</ins></strong> Status 200 - Item added to cart.
<hr/>

<p><strong><ins>Route:</ins></strong> DELETE /api/user/cart/remove-from-cart/:productId</p>

<strong><ins>Description:</ins></strong> Remove an item from the user's cart (Authenticated users only).

<strong><ins>Response:</ins></strong> Status 200 - Item removed from cart.
<hr/>

<p><strong><ins>Route:</ins></strong> PATCH /api/user/cart/reduce-cart-item/:productId</p>

<strong><ins>Description:</ins></strong> Reduce the quantity of an item in the cart (Authenticated users only).

<strong><ins>Response:</ins></strong> Status 200 - Item quantity reduced in cart.
<hr/>

<p><strong><ins>Route:</ins></strong> DELETE /api/user/cart/clear-cart</p>

<strong><ins>Description:</ins></strong> Clear the cart (Authenticated users only).

<strong><ins>Response:</ins></strong> Status 200 - Cart cleared successfully.

<h3>---- Wishlist ----</h3>

<p><strong><ins>Route:</ins></strong> POST /api/user/wishlist/add/:productId</p>

<strong><ins>Description:</ins></strong> Add an item to the user's wishlist (Authenticated users only).

<strong><ins>Response:</ins></strong> Status 200 - Item added to wishlist.
<hr/>

<p><strong><ins>Route:</ins></strong> DELETE /api/user/wishlist/remove/:productId</p>

<strong><ins>Description:</ins></strong> Remove an item from the user's wishlist (Authenticated users only).

<strong><ins>Response:</ins></strong> Status 200 - Item removed from wishlist.

<h3>---- Orders ----</h3>

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

<strong><ins>Response:</ins></strong> Status 201 - Order created successfully.
<hr/>

<p><strong><ins>Route:</ins></strong> PUT /api/user/order/change-order-state/:orderId</p>

<strong><ins>Description:</ins></strong> Change the state of an order (Admin only).

<strong><ins>Request Body:</ins></strong>
<pre>
{
  "order_state": "delivered"
}
</pre>

<strong><ins>Response:</ins></strong> Status 200 - Order state updated successfully.

<h3>---- Product Routes ----</h3>

<p><strong><u>Route:</u></strong> POST /api/product/add</p>

<strong><u>Description:</u></strong> Create a new product (Admin only).

<strong><u>Request Body:</u></strong>
<pre>
{
  "title": "Product Title",
  "mini_description": "Brief description",
  "description": "Full description",
  "stock": 100,
  "price": 50.99,
  "discount": 10,
  "category": "category_id_here"
}
</pre>

<strong><u>Response:</u></strong> Status 201 - Product created successfully.

<hr>

<p><strong><u>Route:</u></strong> POST /api/product/generate</p>

<strong><u>Description:</u></strong> Generate mockup products (Admin only).

<strong><u>Response:</u></strong> Status 201 - Mockup products generated successfully.

<hr>

<p><strong><u>Route:</u></strong> GET /api/product/</p>

<strong><u>Description:</u></strong> Get a list of all products.

<strong><u>Response:</u></strong> Status 200 - List of all products.

<hr>

<p><strong><u>Route:</u></strong> GET /api/product/:productId</p>

<strong><u>Description:</u></strong> Get details of a product by product ID.

<strong><u>Response:</u></strong> Status 200 - Details of the product.

<hr>

<p><strong><u>Route:</u></strong> PUT /api/product/:productId</p>

<strong><u>Description:</u></strong> Update product details by product ID (Admin only).

<strong><u>Request Body:</u></strong>
<pre>
{
  "title": "Updated Title",
  "mini_description": "Updated brief description",
  "description": "Updated full description",
  "stock": 50,
  "price": 40.99,
  "discount": 5,
  "category": "category_id_here"
}
</pre>

<strong><u>Response:</u></strong> Status 200 - Product details updated successfully.

<hr>

<p><strong><u>Route:</u></strong> DELETE /api/product/:productId</p>

<strong><u>Description:</u></strong> Delete a product by product ID (Admin only).

<strong><u>Response:</u></strong> Status 200 - Product deleted successfully.


<h3>---- Variant Routes ----</h3>

<p><strong><u>Route:</u></strong> POST /api/product/:id/variants/add</p>

<strong><u>Description:</u></strong> Add a product variant (Admin only).

<strong><u>Request Body:</u></strong>
<pre>
{
  "name": "Color",
  "options": [
    {
      "option": "Red",
      "value": "Red",
      "price_def": -3,
      "image": "image_id_here",
      "available": true
    }
  ]
}
</pre>

<strong><u>Response:</u></strong> Status 201 - Variant added successfully.

<hr>

<p><strong><u>Route:</u></strong> GET /api/product/:id/variants/</p>

<strong><u>Description:</u></strong> Get all variants of a product.

<strong><u>Response:</u></strong> Status 200 - List of all variants.

<hr>

<p><strong><u>Route:</u></strong> DELETE /api/product/:id/variants/:variantId</p>

<strong><u>Description:</u></strong> Delete a product variant by variant ID (Admin only).

<strong><u>Response:</u></strong> Status 200 - Variant deleted successfully.

<hr>

<p><strong><u>Route:</u></strong> PUT /api/product/:id/variants/:variantId</p>

<strong><u>Description:</u></strong> Update a product variant by variant ID (Admin only).

<strong><u>Request Body:</u></strong>
<pre>
    {
      "name": "Updated Color",
      "options": [
        {
          "option": "Blue",
          "value": "Blue",
          "price_def": 0,
          "image": "image_id_here",
          "available": true
        }
      ]
    }
</pre>

<strong><u>Response:</u></strong> Status 200 - Variant updated successfully.

<!-- Review Routes -->

<h3>---- Review Routes ----</h3>

<p><strong><u>Route:</u></strong> POST /api/product/:productId/reviews/add</p>

<strong><u>Description:</u></strong> Add a review to a product.

<strong><u>Request Body:</u></strong>
<pre>
{
  "user_id": "user_id_here",
  "author": "John Doe",
  "rate": 4,
  "title": "Great Product",
  "comment": "I love this product!"
}
</pre>

<strong><u>Response:</u></strong> Status 201 - Review added successfully.

<hr>

<p><strong><u>Route:</u></strong> GET /api/product/:productId/reviews/</p>

<strong><u>Description:</u></strong> Get all reviews of a product.

<strong><u>Response:</u></strong> Status 200 - List of all reviews.

<hr>

<p><strong><u>Route:</u></strong> DELETE /api/product/:productId/reviews/:reviewId</p>

<strong><u>Description:</u></strong> Delete a product review by review ID (Admin only).

<strong><u>Response:</u></strong> Status 200 - Review deleted successfully.

<hr>

<p><strong><u>Route:</u></strong> PUT /api/product/:productId/reviews/:reviewId</p>

<strong><u>Description:</u></strong> Update a product review by review ID (Admin only).

<strong><u>Request Body:</u></strong>

<pre>
{
  "author": "Updated Author",
  "rate": 4,
  "title": "Updated Review Title",
  "comment": "This is an updated review.",
  "active": false
}
</pre>

<strong><u>Response:</u></strong> Status 200 - Review updated successfully.



<h3>---- Category Routes ----</h3>

<p><strong><u>Route:</u></strong> POST /api/category/add</p>

<strong><u>Description:</u></strong> Create a new category (Admin only).

<strong><u>Request Body:</u></strong>
<pre>
{
  "title": "Electronics",
  "description": "Electronics category description"
}
</pre>

<strong><u>Response:</u></strong> Status 201 - Category created successfully.

<hr>

<p><strong><u>Route:</u></strong> GET /api/category/</p>

<strong><u>Description:</u></strong> Get all categories.

<strong><u>Response:</u></strong> Status 200 - List of all categories.

<hr>

<p><strong><u>Route:</u></strong> GET /api/category/:categoryId</p>

<strong><u>Description:</u></strong> Get a category by category ID.

<strong><u>Response:</u></strong> Status 200 - Category details.

<hr>

<p><strong><u>Route:</u></strong> PUT /api/category/:categoryId</p>

<strong><u>Description:</u></strong> Update a category by category ID (Admin only).

<strong><u>Request Body:</u></strong>

<pre>
    {
      "title": "Updated Electronics",
      "description": "Updated electronics category description."
    }
</pre>

<strong><u>Response:</u></strong> Status 200 - Category updated successfully.

<hr>

<p><strong><u>Route:</u></strong> DELETE /api/category/:categoryId</p>

<strong><u>Description:</u></strong> Delete a category by category ID (Admin only).

<strong><u>Response:</u></strong> Status 200 - Category deleted successfully.

<h3>---- Sub Categories Routes ----</h3>

<p><strong><u>Route:</u></strong> GET /api/category/:categoryId/subcategory</p>

<strong><u>Description:</u></strong> Get all sub-categories for a specific category.

<strong><u>Response:</u></strong> Status 200 - List of sub-categories.

<hr>

<p><strong><u>Route:</u></strong> GET /api/category/:categoryId/subcategory/:subCategoryId</p>

<strong><u>Description:</u></strong> Get a sub-category by sub-category ID.

<strong><u>Response:</u></strong> Status 200 - Sub-category details.

<hr>

<p><strong><u>Route:</u></strong> POST /api/category/:categoryId/addonesubcategory</p>

<strong><u>Description:</u></strong> Add a single sub-category to a specific category (Admin only).

<strong><u>Request Body:</u></strong>

<pre>
{
  "title": "Mobile Phones"
}
</pre>

<strong><u>Response:</u></strong> Status 201 - Sub-category added successfully.

<hr>

<p><strong><u>Route:</u></strong> POST /api/category/:categoryId/addmanysubcategories</p>

<strong><u>Description:</u></strong> Add multiple sub-categories to a specific category (Admin only).

<strong><u>Request Body:</u></strong>

<pre>
    {
      "sub_categories": [
        {
          "title": "Laptops"
        },
        {
          "title": "Tablets"
        },
        {
          "title": "Cameras"
        }
      ]
    }
</pre>
<strong><u>Response:</u></strong> Status 201 - Sub-categories added successfully.

<hr>

<p><strong><u>Route:</u></strong> DELETE /api/category/:categoryId/deleteallsubcategories</p>

<strong><u>Description:</u></strong> Delete all sub-categories for a specific category (Admin only).

<strong><u>Response:</u></strong> Status 200 - Sub-categories deleted successfully.

<hr>

<p><strong><u>Route:</u></strong> DELETE /api/category/:categoryId/subcategory/:subCategoryId</p>

<strong><u>Description:</u></strong> Delete a sub-category by sub-category ID (Admin only).

<strong><u>Response:</u></strong> Status 200 - Sub-category deleted successfully.

<hr>

<p><strong><u>Route:</u></strong> PUT /api/category/:categoryId/subcategory/:subCategoryId</p>

<strong><u>Description:</u></strong> Update a sub-category by sub-category ID (Admin only).

<strong><u>Request Body:</u></strong>

<pre>
{
  "title": "Updated Mobile Phones"
}
</pre>

<strong><u>Response:</u></strong> Status 200 - Sub-category updated successfully.

## Contributing

To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: git checkout -b feature-name.
3. Commit your changes: git commit -m 'Add some feature'.
4. Push to the branch: git push origin feature-name.
5. Submit a pull request.

