import React from "react";
import ReactDOM from "react-dom";
import "./global.less";
import BaseLayout from "./Layout";
import "@arco-design/web-react/dist/css/arco.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BaseContext from "./context/BaseContext";
import login from "./pages/login";

import  './pages/my-promise'

const App = () => {
  return (
    <BrowserRouter>
      <BaseContext>
        <Switch>
          <Route path={`/login`} component={login} />
          <Route path={`/`} component={BaseLayout}></Route>
        </Switch>
      </BaseContext>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
