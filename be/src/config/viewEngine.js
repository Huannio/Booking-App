const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

const configViewEngine = (app) => {
  app.use(express.static(path.join(__dirname, "../public")));

  // Sử dụng express-ejs-layouts
  app.use(expressLayouts);
  app.set("layout", "layouts/main"); // Đường dẫn layout mặc định
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "../resources/views"));
};

module.exports = configViewEngine;
