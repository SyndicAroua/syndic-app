const Database = require("better-sqlite3");

// fichier DB
const db = new Database("database.sqlite");

// création tables
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT
);

CREATE TABLE IF NOT EXISTS apartments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT,
  owner_id INTEGER
);

CREATE TABLE IF NOT EXISTS debts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  apartment_id INTEGER,
  amount REAL,
  status TEXT
);
`);

module.exports = db;