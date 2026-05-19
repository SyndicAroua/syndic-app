const db = require("./database");
const bcrypt = require("bcryptjs");

const password = bcrypt.hashSync("1234", 10);

db.prepare(`
  INSERT OR IGNORE INTO users (email, password, role)
  VALUES (?, ?, ?)
`).run("test@syndic.com", password, "owner");

const user = db.prepare(`SELECT * FROM users WHERE email = ?`).get("test@syndic.com");

const apt = db.prepare(`
  INSERT OR IGNORE INTO apartments (code, owner_id)
  VALUES (?, ?)
`).run("A-101", user.id);

const apartment = db.prepare(`SELECT * FROM apartments WHERE code = ?`).get("A-101");

db.prepare(`
  INSERT OR IGNORE INTO debts (apartment_id, amount, status)
  VALUES (?, ?, ?)
`).run(apartment.id, 120, "unpaid");

console.log("Seed OK");