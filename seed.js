const bcrypt = require("bcryptjs");
const db = require("./database");

const password = bcrypt.hashSync("1234", 10);

db.run(
  "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
  ["test@syndic.com", password, "owner"],
  function () {

    const userId = this.lastID;

    db.run(
      "INSERT INTO apartments (code, owner_id) VALUES (?, ?)",
      ["A-101", userId],
      function () {

        const aptId = this.lastID;

        db.run(
          "INSERT INTO debts (apartment_id, amount, status) VALUES (?, ?, ?)",
          [aptId, 120, "unpaid"]
        );

        db.run(
          "INSERT INTO debts (apartment_id, amount, status) VALUES (?, ?, ?)",
          [aptId, 0, "paid"]
        );

      }
    );

  }
);

console.log("Seed completed");