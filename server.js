"use strict";

const express = require("express");

const app= express();
const routes = require("./routes/cart-items.js");

app.use(express.static("./public"));
app.use(express.json());
app.use("/", routes);

app.listen(3000, _=> console.log(`Server is running on PORT: 3000`));