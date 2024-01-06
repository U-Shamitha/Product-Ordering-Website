const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const swaggerDocs = require("./swagger");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;  


// Middleware-------------------
app.use(bodyParser.json());

// Routes---------------------
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  swaggerDocs(app, port)
});
