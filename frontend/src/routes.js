// Package imports:
import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

// Component imports:
import Logon from "./pages/logon";
import NewIncident from "./pages/new_incident";
import Profile from "./pages/profile";
import Register from "./pages/register";

// Component:
export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon}/>
        <Route path="/incidents/new" component={NewIncident}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/register" component={Register}/>
      </Switch>
    </BrowserRouter>
  );
}
