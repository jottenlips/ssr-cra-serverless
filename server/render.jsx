import React from "react";
import App from "../src/App";
import ReactDOMServer from "react-dom/server";

export const render = async (req, context) => {
  const app = ReactDOMServer.renderToString(<App />);
  return { app };
};
