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

- Node.js (version X.X.X)
- MongoDB (version X.X.X)

## Installation

Follow these steps to set up the project locally:

1. Clone the repository from GitHub: `git clone https://github.com/your-username/e-univers-server.git`
2. Navigate to the project directory: `cd e-univers-server`
3. Install the dependencies: `npm install`

## Usage

To start the server, run: `npm start`

The server will be up and running at `http://localhost:5000`.

## API Documentation

### Authentication

- `POST /api/auth/register`: Register a new user.
  - Request Body:
  ```json
  {
    "firt_name": "John",
    "last_name": "Doe",
    "user_name": "johndoe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "password": "secretpassword"
  }

  
### Login

- `POST /api/auth/login`: Log in an existing user.
  - Request Body:
  ```json
  {
    "user_name": "John",
    "password": "secretpassword"
  }

  
### Users

- `GET /api/users/:userId: Get user details by user ID.
- `PATCH /api/users/:userId: Update user details by user ID.
  - Request Body:
  ```json
  {
  "firt_name": "John",
  "last_name": "Doe",
  "user_name": "johndoe",
  "email": "john@example.com",
  "mobile": "1234567890"
}

