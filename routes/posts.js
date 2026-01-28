import express from "express";
import multer from "multer";
import Post from "../models/Post.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Create Post
router.post("/", upload.single("image"), async (req, res) => {
  const post = new Post({
    user: req.body.user,
    text: req.body.text,
    image: req.file ? req.file.filename : null,
  });
  await post.save();
  res.json(post);
});

// Get all Posts
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

export default router;
