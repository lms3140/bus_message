import axios = require("axios");
import type Request = require("express");
import type e = require("express");

const express = require("express");
const app = express();
const port = 3000;

type Dog = {
  message: string;
  status: string;
};

const getDog = async () => {
  const dog = await axios<Dog>("https://dog.ceo/api/breeds/image/random");
  return dog.data;
};

app.get("/dasd", async (req: Request, res: e.Response) => {
  let data;
  try {
    data = await getDog();
  } catch (e) {}
  res.send(`<img src="${data?.message}" />`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
