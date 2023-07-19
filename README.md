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

### Authentication

**Route**: `POST /api/user/register`

**Description**: Register a new user.

**Request Body**:
```json
{
  "firt_name": "John",
  "last_name": "Doe",
  "user_name": "johndoe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "password": "secretpassword"
}
```
**Response**:Status 201 - User registered successfully.
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
**Route**: `POST /api/user/login`

**Description**: Log in an existing user.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "secretpassword"
}

**Response**: Status 200 - Login successful, returns JWT token.

  
### User

  **Route**: `GET /api/user/`
  **Description**: Get a list of all users (Admin only).
  **Response**: Status 200 - List of all users.


  **Route**: `PUT /api/user/:id`
  **Description**: Update user details by user ID (Authenticated users only).
  **Request Body**:
  ```json
  {
    "firt_name": "John",
    "last_name": "Doe",
    "user_name": "johndoe",
    "email": "john@example.com",
    "mobile": "1234567890"
  }
  **Response**: Status 200 - User details updated successfully.


  **Route**: `DELETE /api/user/:id`
  **Description**: Delete a user by user ID (Admin only).
  **Response**: Status 200 - User deleted successfully.

  
### User Addresses

**Route**: `POST /api/user/:id/addresses/add`
**Description**: Add a new address for a user (Authenticated users only).
**Request Body**:
```json
{
  "country": "Country Name",
  "city": "City Name",
  "zip": 12345,
  "street": "Street Name",
  "house_number": 21
}
**Response**: Status 201 - Address added successfully.

**Route**: `GET /api/user/:id/addresses/`
**Description**: Get all addresses for a user (Authenticated users only).
**Response**: Status 200 - List of all user addresses.

### Products

- `GET /api/products` Get a list of all products.
- `POST /api/products` Create a new product.
  - Request Body:
  ```json
  {
    "title": "Product Title",
    "description": "Product description",
    "price": 19.99,
    "stock": 50,
    "category": "category_id"
  }
- `GET /api/products/:productId` Get product details by product ID.

### Categories

- `GET /api/categories` Get a list of all categories.
- `POST /api/categories` Create a new category.
  - Request Body:
  ```json
  {
    "title": "Category Title",
    "description": "Category description"
  }
- `GET /api/categories/:categoryId` Get category details by category ID.

### Orders

- `POST /api/orders/:userId/create-order`  Create an order for a user.
  - Request Body:
  ```json
  {
    "items": [
        { "item_id": "product_id_1", "quantity": 2 },
        { "item_id": "product_id_2", "quantity": 1 }
    ],
        "shipping_address": "123 Main St, City, Country"
  }
  
- `PATCH /api/orders/change-order-state/:orderId`  Change the order state (admin only).
  - Request Body:
  ```json
  {
    "order_state": "delivered"
  }

## Contributing

To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: git checkout -b feature-name.
3. Commit your changes: git commit -m 'Add some feature'.
4. Push to the branch: git push origin feature-name.
5. Submit a pull request.

