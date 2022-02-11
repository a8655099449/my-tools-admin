import React from "react";
import ReactDOM from "react-dom";
import "./global.less";
import BaseLayout from "./Layout";
import "@arco-design/web-react/dist/css/arco.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BaseContext from "./Layout/components/BaseContext";
import login from "./pages/login";

const App = () => {
  return (
    <BaseContext>
      <BrowserRouter>
        <Switch>
          <Route path={`/login`}  component={login} />
          <Route path={`/`} component={BaseLayout}></Route>
        </Switch>
      </BrowserRouter>
    </BaseContext>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
