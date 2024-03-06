require("dotenv").config();
const express = require("express");
const { getTheImage } = require("./file-storage");

const PORT = process.env.PORT;
const storageAccountName = process.env.STORAGE_ACCOUNT_NAME;
const storageAccountKey = process.env.STORAGE_ACCOUNT_KEY;

const app = express();

app.get("/image", async (req, res) => {
  const imagePath = req.query.path;
  const [response, properties] = await getTheImage(
    storageAccountName,
    storageAccountKey,
    imagePath
  );
  res.writeHead(200, {
    "Content-Type": "image/jpeg",
    "Content-Length": properties.contentLength,
  });
  response.readableStreamBody.pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
