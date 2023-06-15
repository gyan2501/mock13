const express = require("express");
const { BlogModel } = require("../model/Blog.Model");

const blogRouter = express.Router();

// POST BLOGS
blogRouter.post("/", async (req, res) => {
  try {
    const blog = await BlogModel(req.body);
    await blog.save();
    res.status(200).send({ msg: "New Blog is Created" });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

//GET All Blogs
blogRouter.get("/", async (req, res) => {
  try {
    const blogs = await BlogModel.find({ username: req.body.username });
    res.status(200).send(blogs);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

//GET  Blogs by title
blogRouter.get("/", async (req, res) => {
  try {
    const title = req.query.title;
    const blogs = await BlogModel.find({ title });
    res.status(200).send(blogs);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

//GET  Blogs by category
blogRouter.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    const blogs = await BlogModel.find({ category });
    res.status(200).send(blogs);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

//GET  Blogs by with pagination
blogRouter.get("/", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 5;

    const initialIndex = (page - 1) * limit;

    const blogs = await BlogModel.find().skip(initialIndex).limit(limit);

    res.status(200).send(blogs);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

// DELETE by ID
blogRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await BlogModel.findOne({ _id: id });
  try {
    if (req.body.username !== blog.username) {
      res.status(200).send({ msg: "Not Authorised to this action" });
    } else {
      await BlogModel.findByIdAndDelete({ _id: id });

      res.send({ msg: "Delete Succesfully!" });
    }
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

// PUT / PATCH BY ID
blogRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const newcontent = req.body;
  const blog = await BlogModel.findOne({ _id: id });
  try {
    if (req.body.username !== blog.username) {
      res.status(200).send({ msg: "Not Authorised to this action" });
    } else {
      await BlogModel.findByIdAndUpdate(
        { _id: id },
        { content: newcontent },
        { new: true }
      );
      res.send({ msg: "Updated post Succesfully!" });
    }
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

// PUT / PATCH BY ID like
blogRouter.patch("/:id/like", async (req, res) => {
  const { id } = req.params;
  const blog = await BlogModel.findOne({ _id: id });
  try {
    if (req.body.username !== blog.username) {
      res.status(200).send({ msg: "Not Authorised to this action" });
    } else {
      const blog = await BlogModel.findByIdAndUpdate(
        { _id: id },
        { $inc: { like: 1 } },
        { new: true }
      );

      res.send({ msg: "Liked updated Succesfully!" });
    }
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

module.exports = {
  blogRouter,
};
