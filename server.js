const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");


const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: "decentglam",
  resave: false,
  saveUninitialized: false
}));

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/decentGlam")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes

const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api", cartRoutes);

const productRoutes = require("./routes/productroutes");
app.use("/api", productRoutes);

const contactRoutes = require("./routes/contactRoutes");
app.use("/api", contactRoutes);


// Pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

