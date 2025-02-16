# Modern Cross-Platform Chat Application

A real-time chat application with web and Android clients, featuring secure authentication and instant messaging capabilities.

## Overview

This full-stack chat application enables users to communicate in real-time across web and mobile platforms. The system implements robust security measures and follows industry-standard architectural patterns.

## Features

### Core Functionality
- Real-time messaging using WebSocket technology
- User registration and authentication with JWT
- Contact management and search
- Message history and pagination
- Push notifications
- Responsive design for various screen sizes

### Web Client (React)
- Built with React.js and Bootstrap
- Real-time updates using WebSocket integration
- Clean and intuitive user interface
- Contact search and management
- Secure authentication flow

### Android Client
- Developed in Java using MVVM architecture
- Local data persistence with Room Database
- Real-time updates using Firebase
- LiveData for reactive UI updates
- Push notifications support

### Backend
- RESTful API built with Express.js and Node.js
- MVC architectural pattern
- MongoDB database for data persistence
- JWT-based authentication
- WebSocket implementation for real-time features

## Technology Stack

### Frontend
- Web: React.js, Bootstrap
- Android: Java, Room, LiveData, Firebase

### Backend
- Node.js
- Express.js
- MongoDB
- WebSocket
- JWT

## Installation

### Web Application
1. Clone the repository
2. Install dependencies:
   ```bash
   cd client
   npm install
   ```
3. Start the web client:
   ```bash
   npm start
   ```

### Backend Server
1. Install server dependencies:
   ```bash
   cd server
   npm install jsonwebtoken cors express body-parser custom-env mongoose socket.io
   ```
2. Start the server:
   ```bash
   npm run serverlocal
   ```

### Android Application
1. Open the project in Android Studio
2. Sync Gradle files
3. Run the application on an emulator or physical device
