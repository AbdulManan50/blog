const express = require("express");
const path = require("path");
const app = express();
const UseRoute = require("./routes/user");

app.set("view engine", "ejs");
app.set("view ", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", UseRoute)



const PORT = 8000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
