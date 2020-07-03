import express from "express";
import { render } from "./render";

const path = require("path");
const fs = require("fs");
const serverless = require("serverless-http");
const app = express();

app.get("/hello", function (req, res) {
  res.send("Hello World!");
});

app.use(express.static(path.join(__dirname, "./build")));
app.use("/static", express.static(path.join(__dirname, "./build/static")));

app.get("*", async (req, res) => {
  const context = {};
  const reactApp = await render(req, context);
  const indexFile = path.resolve("./build/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }
    console.log(reactApp);
    return res.send(data.replace('<div id="root"></div>', `${reactApp.app}`));
  });
});
export const server = app;
const renderer = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await renderer(event, context);
  return result;
};
