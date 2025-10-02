const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");

const router = Router();

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/upload/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("coverimage"), async (req, res) => {
  const { tital, body } = req.body;
  const blog = await Blog.create({
    body,
    tital,
    createdBy: req.user._id,
    coverImageUrl: req.file ? `/upload/${req.file.filename}` : "",
  });
  return res.redirect(`/blog/${blog._id}`);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  console.log("blog",blog)
  return res.render("blog", {
    user: req.user,
    blog,
  });
});

module.exports = router;
