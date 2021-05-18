const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./Employee");

app.use(bodyParser.json());
const Employee = mongoose.model("employee");

const mongoURL =
  "mongodb+srv://mel:ymtzsvnBB1Vk5y0a@cluster0.8l9ay.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("error", err);
});

app.get("/", (req, res) => {
  Employee.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((errr) => {
      console.log(err);
    });
});
app.post("/send-data", (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    picture: req.body.picture,
    salary: req.body.salary,
    position: req.body.position,
  });
  employee
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((errr) => {
      console.log(err);
    });
});

app.post("/delete", (req, res) => {
  Employee.findByIdAndDelete(req.body.id)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((errr) => {
      console.log(err);
    });
});
app.post("/update", (req, res) => {
  Employee.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    picture: req.body.picture,
    salary: req.body.salary,
    position: req.body.position,
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((errr) => {
      console.log(err);
    });
});
app.listen(3000, () => {
  console.log("Server runing");
});
