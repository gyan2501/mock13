const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const { userRouter } = require("./routes/User.Routes");
const { auth } = require("./middleware/Auth.Middleware");
const { blogRouter } = require("./routes/Blog.Routes");
require('dotenv').config()

const app = express();
app.use(express.json());

app.use(cors());

app.use("/users", userRouter);

// Protected Route auth middleware
app.use(auth);

// blog Route
app.use("/blogs", blogRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connnected to DB...!");
  } catch (error) {
    console.log(error);
    console.log("Not able to connect!");
  }

  console.log(`server is runing on ${process.env.port}`);
});
