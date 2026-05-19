const express = require("express");
const path = require("path");

const app = express();

// servir fichiers statiques
app.use(express.static("public"));

// page login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login.html"));
});

// dashboard
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public/dashboard.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});