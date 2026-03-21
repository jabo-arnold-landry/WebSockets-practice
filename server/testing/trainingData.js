const express = require("express");
const router = express.Router();

const userlists = [
  { names: "jabo", age: 43 },
  { names: "landry", age: 33 },
  { names: "arnold", age: 14 },
];

const todoLists = [
  {
    id: 1,
    task: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio assumenda maiores facilis possimus consequuntur voluptas deleniti hic, voluptates dolorum consectetur ad quas minus ipsa vero soluta placeat quasi perferendis eligendi quaerat. Minus rem aliquam necessitatibus sit quam dignissimos nisi expedita.",
  },
  {
    id: 2,
    task: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio assumenda maiores facilis possimus consequuntur voluptas deleniti hic, voluptates dolorum consectetur ad quas minus ipsa vero soluta placeat quasi perferendis eligendi quaerat. Minus rem aliquam necessitatibus sit quam dignissimos nisi expedita.",
  },
  {
    id: 3,
    task: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio assumenda maiores facilis possimus consequuntur voluptas deleniti hic, voluptates dolorum consectetur ad quas minus ipsa vero soluta placeat quasi perferendis eligendi quaerat. Minus rem aliquam necessitatibus sit quam dignissimos nisi expedita.",
  },
];

router.get("/userLists", (req, res) => {
  return res.status(200).json(userlists);
});

router.get("/userTodos", (req, res) => {
  return res.status(200).json(todoLists);
});

module.exports = router;
