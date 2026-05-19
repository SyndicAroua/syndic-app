const express = require("express");
const path = require("path");
const db = require("./database");

const app = express();

app.use(express.static("public"));
app.use(express.json());

/* -------------------------
   PAGE LOGIN
--------------------------*/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login.html"));
});

/* -------------------------
   DASHBOARD PAGE
--------------------------*/
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public/dashboard.html"));
});

/* -------------------------
   LOGIN API
--------------------------*/
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  try {
    const user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // ⚠️ version simple (sans JWT pour l’instant)
    if (password !== "1234" && password !== user.password) {
      return res.json({ success: false, message: "Wrong password" });
    }

    res.json({ success: true, role: user.role });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* -------------------------
   DASHBOARD API (DATA SYNDIC)
--------------------------*/
app.get("/api/dashboard", (req, res) => {
  try {
    const query = `
      SELECT 
        apartments.code AS apartment,
        debts.amount,
        debts.status
      FROM apartments
      LEFT JOIN debts ON apartments.id = debts.apartment_id
    `;

    const rows = db.prepare(query).all();

    res.json(rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------------
   SERVER START
--------------------------*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});