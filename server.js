import express from "express";
import fs from "fs";
let app = express();

let getdata = (req, res, next) => {
  console.log(req.query);

  let books = JSON.parse(fs.readFileSync("./books.json", "utf-8"));
  res.status(200).json({
    data: req.query.min
      ? books.filter((item) => item.id >= req.query.min)
      : books,
  });
};

app.get("/home", getdata);
app.get("/home/:id", (req, res, next) => {
  console.log(req.params.id);
  let books = JSON.parse(fs.readFileSync("./books.json", "utf-8"));
  let book;
  books.forEach((item) => {
    if (item.id === +req.params.id) book = item;
  });

  res.status(200).json({
    data: book ? book : "Yo'q",
  });
});

app.get("/todos", (req, res, next) => {
  let todos = JSON.parse(fs.readFileSync("./todos.json", "utf-8"));

  if (req.query.completed)
    todos =
      req.query.completed === "true"
        ? todos.filter((item) => item.completed == true)
        : todos.filter((item) => item.completed == false);

  res.status(200).json(todos);
});

app.listen(4000);
