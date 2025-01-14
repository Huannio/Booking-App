const express = require("express");
const router = express.Router();
const User = require("../app/models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.render("home", { users: users });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
