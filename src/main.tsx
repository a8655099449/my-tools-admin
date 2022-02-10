import React from "react";
import ReactDOM from "react-dom";
import "./global.less";
import BaseLayout from "./Layout";
import "@arco-design/web-react/dist/css/arco.css";
import { BrowserRouter } from "react-router-dom";
// console.log('👴2022-01-27 15:28:22 main.tsx line:7',styles)

ReactDOM.render(
  <BrowserRouter>
    <BaseLayout />
  </BrowserRouter>,
  document.getElementById("root")
);
