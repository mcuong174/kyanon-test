import mysql from "mysql";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import UserRoute from "./routes/UserRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(UserRoute);

const connectionDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "demo",
});

app.post("/login", (req, res) => {
  // console.log(">>>>>>>>>>>check req: " + req.body.email);

  const email = req.body.email;
  const password = req.body.password;

  connectionDB.query(
    "SELECT * FROM account WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong email or password combination!" });
      }
    }
  );
});

app.get("/users", (req, res) => {
  connectionDB.query("SELECT * FROM users", (err, data) => {
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  connectionDB.query("SELECT * FROM users WHERE id = ? ", [id], (err, data) => {
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
});

app.patch("/users/:id", (req, res) => {
  const id = req.params.id;

  const values = [
    req.body.fullName,
    req.body.dayOfBirth,
    req.body.email,
    req.body.phone,
  ];

  connectionDB.query(
    "UPDATE users SET fullName = ?, dayOfBirth = ?, email = ?, phone = ? WHERE id = ?",
    [...values, id],
    (err, data) => {
      if (err) return res.json(err);
      return res.json("Update successful!");
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port${PORT}`);
});
