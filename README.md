# To-Do Management App

A task manager with accounts: register, log in, then create, edit and delete
your own tasks. Split into a React client and an Express API.

> Under active development.

## Stack

| Part | Built with |
|---|---|
| Client | React, Vite, React Router, Axios |
| API | Node.js, Express, Mongoose |
| Database | MongoDB |
| Auth | JSON Web Tokens, bcryptjs |

## Layout

```
todo_App/       React client (Vite)
  src/
todo_Server/    Express API
  server.js         main API and task routes
  reg_log_server.js register and login
  verifyToken.js    JWT middleware
```

## Running locally

Both halves run at the same time, in two terminals.

```bash
# API — needs a .env with the MongoDB connection string and JWT secret
cd todo_Server
npm install
npm run dev
```

```bash
# Client
cd todo_App
npm install
npm run dev
```

The client starts on the port Vite prints; the API reads its port from `.env`.
