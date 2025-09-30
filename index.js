// const express = require("express");
// const path = require("path");
// const app = express();
// const UseRoute = require("./routes/user");
// const { default: mongoose } = require("mongoose");

// app.set("view engine", "ejs");
// app.set("view ", path.resolve("./views"));

// app.get("/", (req, res) => {
//   res.render("home");
// });

// app.use(express.urlencoded({extended:false}))

// app.use("/user", UseRoute)

// mongoose.connect('mongodb://localhost:27017/blog').then(e=>(console.group("mongo db connected")))

// const PORT = 8000;

// app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));


const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const UseRoute = require("./routes/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));  // ✅ fixed

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", UseRoute);

mongoose.connect("mongodb://localhost:27017/blog")
  .then(() => console.log("MongoDB connected"))  // ✅ fixed
  .catch(err => console.error("MongoDB connection failed:", err));

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
