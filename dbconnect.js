const express = require("express");
const cors = require("cors");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");
let db;
const app = express();
app.use(express.json());
app.use(cors());
connectToDb((err) => {
  if (!err) {
    app.listen(3002, () => {
      console.log("listening on port 3002");
    });
    db = getDb();
  }
});

app.get("/users", (req, res) => {
  let posts = [];
  db.collection("users")
    .find()
    .sort({ id: 1 })
    .forEach((post) => posts.push(post))
    .then(() => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ error: "fetch the documents" });
    });
});

app.post("/invoice", (req, res) => {
  db.collection("Invoice")
    .insertOne({
      amount: Number(req.body.amount),
      Bankname: req.body.bname,
      image: req.body.image,
      consumerName: req.body.cname,
      consumerId: req.body.uid,
      unit: req.body.unit,
    })
    .then((result) => {
      res.status(201).json(result.value);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not create a document" });
    });
});
// app.get("/invoice", (req, res) => {
//   let posts = [];
//   db.collection("Invoice")
//     .find()
//     .sort({ id: 1 })
//     .forEach((post) => posts.push(post))
//     .then(() => {
//       res.status(200).json(posts);
//     })
//     .catch(() => {
//       res.status(500).json({ error: "fetch the documents" });
//     });
// });

app.get("/invoice", (req, res) => {
  db.collection("Invoice")
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .toArray()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(500).json({ error: "fetch the documents" });
    });
});
