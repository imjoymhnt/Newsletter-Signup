const express = require("express");
const bodyParser = require("body-parser");
const requests = require("requests");
const https = require("https");

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

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/342362c1bf";
  const options = {
    method: "POST",
    auth: "imjoymhnt:f9d769ce963281aeba6d1cf2c5a49ee0-us7",
  };
  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Listining to the port 3000");
});

// APIKey
// f9d769ce963281aeba6d1cf2c5a49ee0 - us7;

// list id
// 342362c1bf
