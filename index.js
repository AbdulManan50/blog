const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const UserRoute = require("./routes/user");
const cookiesparser = require("cookie-parser");
const { checkForAuthanticationCookies } = require("./middleware/authantication");

const app = express();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookiesparser())
app.use(checkForAuthanticationCookies("token"))

app.use((req, res, next) => {
  res.locals.user = req.user || null;   // ✅ makes `user` available in all views
  res.locals.error = null;              // default value for error
  next();
});


// Routes
app.get("/", (req, res) => {
  res.render("home",{
    user:req.user
  });
});
app.use("/user", UserRoute);

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/blog")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Server
const PORT = 8000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}/`)
);
