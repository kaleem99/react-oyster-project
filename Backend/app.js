const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/Testing", (req, res) => {
  console.log(req.body);
  res.json({ message: "Data received successfully!" });
});
app.post("/WriteLogsFile", (req, res) => {
  const jsonData = JSON.stringify(req.body);
  fs.writeFile("logs.json", jsonData, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
  res.json({ message: "Data received successfully!" });
});
app.get("/logs", (req, res) => {
  fs.readFile("logs.json", "utf8", function (err, data) {
    if (err) res.send(JSON.stringify({ name: "error" }));
    res.send(data);
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
