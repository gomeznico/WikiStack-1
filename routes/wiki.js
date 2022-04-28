const express = require("express");
const router = express.Router();
const { addPage } = require("../views");
const { Page } = require("../models");

router.get("/", (req, res, next) => {
  try {
    res.send("retrieve wiki pages");
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  try {
    const page = await Page.create({
      title: title,
      content: content,
    });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});
router.get("/add", (req, res, next) => {
  try {
    res.send(addPage());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
