const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.matchPasswordandGenrateToken(email, password);
    console.log("✅ User logged in:", user);
    return res.cookie("token", token).redirect("/");
  } catch (err) {
    console.error("❌ Signin error:", err.message);
    return res.redirect("/user/signin");
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    await User.create({
      fullName,
      email,
      password,
    });

    return res.redirect("/");
  } catch (err) {
    console.error("❌ Signup error:", err.message);
    return res.redirect("/user/signup");
    console.log(User,"signup")
  }
});


router.get("/logout",(req,res)=>{
  res.clearCookie("token").redirect("/")
})

module.exports = router;
