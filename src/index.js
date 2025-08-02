const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

app
  .get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "pages", "index.html"));
  })
  .post("/", (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.message) {
      res.status(401).redirect("/");
      return;
    }
    const { name, email, phone, website, message } = req.body;
    console.log(name, email, phone, website, message);
    res.redirect("/");
  });

app.use((req, res) => {
  res.status(500).send("404 - Not Found");
});

app.use((err, req, res, next) => {
  console.log("Error: ", err.stack);
  res.status(500).send("500 - Server error");
});

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
