const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

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
app.post("/WriteLogsFile", async (req, res) => {
  // const jsonData = JSON.stringify(req.body);
  // fs.writeFile("logs.json", jsonData, function (err) {
  //   if (err) throw err;
  //   console.log("Saved!");
  // });
  // res.json({ message: "Data received successfully!" });
  const bucketName = 'oyster-videos-nodejs_cloudbuild';
  const fileName = 'data.json';
  const newData = req.body; // Assuming the new data is sent in the request body

  try {
    const file = storage.bucket(bucketName).file(fileName);

    // Get the current contents of the file
    const data = await file.download(); 

    let jsonData = JSON.parse(data[0].toString());
    // Update the JSON data with newData
    jsonData = { ...jsonData, ...newData };
    console.log(jsonData, 45)
    // Write the updated JSON back to the file 
    // await file.save(JSON.stringify(jsonData));

    res.send('File updated successfully.');
  } catch (error) {
    console.error('Error updating file:', error);
    res.status(500).send('Error updating file');
  }
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
