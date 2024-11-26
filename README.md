# 🌐 Advanced MERN Application Boilerplate

Welcome to the **Advanced MERN Application Boilerplate**! This repository provides a highly secure, scalable, and advanced MERN (MongoDB, Express.js, React.js, Node.js) application template designed to handle up to **100,000 users**. It includes essential features like authentication, role-based access control, two-factor authentication, and more.

## 🚀 Features

- **User Authentication**: Sign up, login, logout, and password reset functionalities.
- **Email Verification**: Verify user emails during registration.
- **Two-Factor Authentication (2FA)**: Enhance security with optional 2FA.
- **Role-Based Access Control**: Assign roles and permissions to users.
- **Public and Private Routes**: Secure routing for different user access levels.
- **Redux Toolkit**: State management using Redux Toolkit.
- **React Router DOM**: Client-side routing with React Router.
- **Advanced Folder Structure**: Organized codebase for scalability.
- **CORS Configuration**: Proper handling of Cross-Origin Resource Sharing.
- **Scalability and Security**: Implemented best practices for a production-ready app.

---

## 🛠️ Tech Stack

- **Frontend**:
  - React.js ⚛️
  - Redux Toolkit 🛍️
  - React Router DOM 🚦
- **Backend**:
  - Node.js 🟢
  - Express.js 🚂
  - MongoDB 🍃
  - Mongoose 🐭
- **Others**:
  - JWT Authentication 🔐
  - Nodemailer 📧
  - Speakeasy & QRCode for 2FA 🔑
  - Axios 🌐
  - Helmet & CORS for security 🛡️

---

## 📂 Folder Structure

### **Backend (`/server`):**

```
server/
├── config/
│   ├── db.js
│   └── env.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   └── ...
├── middleware/
│   ├── auth.js
│   ├── role.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   └── Token.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── ...
├── utils/
│   ├── sendEmail.js
│   └── generateToken.js
├── validations/
│   └── authValidation.js
├── server.js
├── package.json
└── .env
```

### **Frontend (`/client`):**

```
client/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── Navbar.js
│   │   └── ...
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   ├── DashboardPage.js
│   │   └── ...
│   ├── redux/
│   │   ├── store.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       └── userSlice.js
│   ├── routes/
│   │   ├── PrivateRoute.js
│   │   └── AppRoutes.js
│   ├── utils/
│   │   └── api.js
│   ├── App.js
│   └── index.js
├── package.json
└── .env
```

---

## 📦 Installation

### **Prerequisites**

- Node.js (v12 or higher) 🟢
- MongoDB 🍃
- npm or yarn 📦

### **Clone the Repository**

```bash
git clone https://github.com/sujay-web-dev/Advanced-MERN-Application-Boilerplate.git 
cd Advanced-MERN-Application-Boilerplate
```

### **Install Dependencies**

#### **Backend**

```bash
cd server
npm install
```

#### **Frontend**

```bash
cd client
npm install
```

---

## 🔧 Configuration

### **Environment Variables**

Create a `.env` file in both the `server` and `client` directories.

#### **Server (`server/.env`):**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
BASE_URL=http://localhost:5000
```

#### **Client (`client/.env`):**

```env
REACT_APP_BASE_URL=http://localhost:5000
```

---

## 🚀 Running the Application

### **Backend**

```bash
cd server
npm start
```

### **Frontend**

```bash
cd client
npm start
```

The frontend will be running on `http://localhost:3000` and the backend on `http://localhost:5000`.

---

## 📋 API Documentation

### **Authentication Routes (`/api/auth`):**

- `POST /register` 📝 - Register a new user.
- `GET /verify/:id/:token` ✅ - Verify email address.
- `POST /login` 🔑 - Login user.
- `POST /forgot-password` 📧 - Initiate password reset.
- `POST /reset-password/:id/:token` 🔄 - Reset password.
- `GET /2fa/generate` 🔒 - Generate 2FA QR code.
- `POST /2fa/enable` 🔐 - Enable 2FA.

### **User Routes (`/api/user`):**

- `GET /dashboard` 🏠 - Get user dashboard (Protected).
- `GET /admin` 🛡️ - Admin-only route (Protected, Role-based).

---

## 🔒 Security Considerations

- **Helmet**: Secures HTTP headers.
- **CORS**: Configured to accept requests from allowed origins.
- **Rate Limiting**: Prevents brute-force attacks.
- **Data Validation**: Input validation using `express-validator`.
- **Password Hashing**: Passwords hashed with `bcryptjs`.
- **JWT Authentication**: Secure token-based authentication.
- **Environment Variables**: Sensitive data stored securely.

---

## 📈 Scalability

- **Database Indexing**: Optimized queries with proper indexing.
- **Clustering**: Utilize multiple CPU cores with PM2.
- **Load Balancing**: Implement with Nginx or other tools.
- **Caching**: Use Redis for caching and session management.
- **CDN**: Serve static assets via Content Delivery Networks.

---

## 🛡️ Additional Features

- **Email Templates**: Customizable email templates.
- **Logging**: Detailed logging with Winston and Morgan.
- **Testing**: Unit and integration tests with Jest and Supertest.
- **API Documentation**: Easily extendable with Swagger.
- **Dockerization**: Containerization with Docker for consistent environments.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Thanks to the open-source community for the amazing tools and libraries.
- Inspired by best practices in web development.

---

## 📬 Contact

Feel free to reach out for any questions or feedback!

---

Happy coding! 🎉
