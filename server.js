require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 3500;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
