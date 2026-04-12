# Password Manager App

A secure backend API for managing passwords built with Node.js, Express, MongoDB, and JWT authentication.

This project allows users to register, login, and securely store their passwords for different services.

---

## Features

- User Registration
- User Login with JWT Authentication
- Add new passwords
- Retrieve stored passwords
- Secure password hashing with bcrypt
- MongoDB database

---

## Tech Stack

Backend:
- Node.js
- Express.js

Database:
- MongoDB
- Mongoose

Authentication:
- JWT (JSON Web Tokens)
- bcryptjs

Tools:
- Postman
- dotenv
- cors

---

## Project Structure
backend/
│
├── config/
│ └── db.js
│
├── middleware/
│ └── auth.js
│
├── models/
│ ├── User.js
│ └── Password.js
│
├── routes/
│ ├── auth.js
│ └── passwords.js
│
├── .env
├── server.js
