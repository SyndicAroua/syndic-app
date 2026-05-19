const express = require("express");
const path = require("path");
const db = require("./database"); // ✅ IMPORTANT

const app = express();

app.use(express.static("public"));
app.use(express.json());

// page login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login.html"));
});

// dashboard page
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public/dashboard.html"));
});

// API dashboard
app.get("/api/dashboard", (req, res) => {
  const query = `
    SELECT 
      apartments.code AS apartment,
      debts.amount,
      debts.status
    FROM apartments
    LEFT JOIN debts ON apartments.id = debts.apartment_id
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});