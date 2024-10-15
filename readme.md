# Billing Software

This software is designed to help generate bills based on a specific list of registered products. It allows users to manage products and create bills easily.

## Features

- User registration and login
- Add, edit, view, and remove products
- Select multiple products for billing
- Generate bills based on selected products
- Download bills as PDF

## Tech Stack

- **Frontend**: React, Tailwind CSS, Material-UI (MUI)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: Redux

## Project Structure

The project is divided into two main folders:

- **frontend**: Contains the client-side application.
- **backend**: Contains the server-side application.

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend

2. Install the required dependencies:
   ```bash
   npm install

3. Create a .env file based on the .env.example:
   ```bash
   cp .env.example .env

4. Start the server:
   ```bash
   # For development
   npm run dev
   # For production
   npm start


### .env.example

   Create a file named `.env.example` in the `backend` directory with the following content:

   ```plaintext
   PORT=3000
   DB_CONNECTION_STRING=
   FRONTEND_URL=
   JWT_SECRET=
   JWT_EXPIRES_IN=1h
   JWT_REFRESH_EXPIRES_IN=30d
   NODE_ENV=development


### Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend

2. Install the required dependencies:
   ```bash
   npm install

3. Start the server:
   ```bash
   # For development
   npm run dev

   # For production
   npm start


