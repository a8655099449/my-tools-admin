import React from "react";
import ReactDOM from "react-dom";
import "./App.less";
import BaseLayout from "./Layout";
import "@arco-design/web-react/dist/css/arco.css";
// console.log('👴2022-01-27 15:28:22 main.tsx line:7',styles)

ReactDOM.render(
  <React.StrictMode>
    <BaseLayout />
  </React.StrictMode>,
  document.getElementById("root")
);
