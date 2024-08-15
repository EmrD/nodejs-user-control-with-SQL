# User Registration and Login Application

This project is a Node.js application for simple user registration and login functionalities. It uses MySQL to store user data, and passwords are securely hashed using the `bcryptjs` library.

## Requirements

- Node.js
- MySQL
- `npm` or `yarn` (package manager)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### Install Dependencies
```bash
npm install

yarn install
```

### Start the Server
```bash
node index.js
```

### cURL Examples

## Register

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

## Login

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```
