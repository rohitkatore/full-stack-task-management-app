# full-stack-task-management-app


## Project Description
This project is a web application that allows users to view a menu, place orders, and manage their orders. It includes user authentication and authorization to ensure secure access to the application.

## Features
- User authentication and authorization
- View menu items
- Add, edit, and delete menu items (admin only)
- Place orders
- View order history

## Setup Instructions

### Backend Setup
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
    MONGO_URI=<your-mongodb-uri>
    PORT=3000
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm start
    ```

## Assumptions, Challenges, and Limitations
- Assumptions:
  - Users are authenticated before accessing the menu and placing orders.
  - Admin users have the ability to manage menu items.

- Challenges:
  - Ensuring secure authentication and authorization.
  - Handling asynchronous operations and error handling effectively.

- Limitations:
  - The application currently does not support real-time updates for order status.
  - Limited to basic CRUD operations for menu and order management.
