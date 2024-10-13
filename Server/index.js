const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://thatsmynametanuj:thatsmynametanuj2024@cluster0.w8w0v.mongodb.net/test"
);

app.get('/get', (req,res) => {
  TodoModel.find()
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

app.put('/update/:id', (req,res) => {
  const {id} = req.params;
  TodoModel.findByIdAndUpdate({_id: id}, {done: true}).then(result => res.json(result))
  .catch(err => res.json(err));
})

app.delete('/delete/:id', (req, res) =>{
  const {id} = req.params;
  TodoModel.findByIdAndDelete({_id: id})
  .then(result => res.json(result))
  .catch(err => res.json(err));
})

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({ 
    task: task 
  }).then((result) => {
      res.status(201).json({
        message: "Task added successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Error adding task",
        details: err.message,
      });
    });
});

app.listen(3001, () => {
  console.log("Server is Running");
});