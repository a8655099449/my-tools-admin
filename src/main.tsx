import React from "react";
import ReactDOM from "react-dom";
import "./global.less";
import BaseLayout from "./Layout";
import "@arco-design/web-react/dist/css/arco.css";
import { BrowserRouter } from "react-router-dom";
import BaseContext from "./Layout/components/BaseContext";
import { ConfigProvider } from "@arco-design/web-react";

import zhCN from "@arco-design/web-react/es/locale/zh-CN";
import enUS from "@arco-design/web-react/es/locale/en-US";
// console.log('👴2022-01-27 15:28:22 main.tsx line:7',styles)

const App = () => {


  return (
    <BaseContext>
        <BrowserRouter>
          <BaseLayout />
        </BrowserRouter>
    </BaseContext>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
