const express = require("express");
const bodyParser = require("body-parser");
const requests = require("requests");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.name1;
  const lastName = req.body.name2;
  const email = req.body.email;
  console.log(firstName);
  console.log(lastName);
  console.log(email);
});

app.listen(3000, () => {
  console.log("Listining to the port 3000");
});
