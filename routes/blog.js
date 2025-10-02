const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");
const Commit = require("../models/commit");

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
  const commits = await Commit.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  console.log("commit", commits);
  // console.log("blog", blog);
  return res.render("blog", {
    user: req.user,
    blog,
    commits,
  });
});

router.post("/commit/:blogId", async (req, res) => {
  await Commit.create({
    content: req.body.content,
    blogId: req.params.blogId, // ✅ ab param milega
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;
