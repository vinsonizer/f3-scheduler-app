import React from "react";
import RegionsContainer from "../region/RegionsContainer";
import PaxContainer from "../pax/PaxContainer";
import Header from "../template/Header";
import RegionDetails from "../region/RegionDetails";
import PaxDetails from "../pax/PaxDetails";
import AoDetails from "../ao/AoDetails";
import Login from "../login/Login";
import useToken from "./useToken";
import AssignmentDetails from "../assignment/AssignmentDetails";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";

const App = (props) => {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/region/:regionId/ao/:aoId/assignment/:timestamp">
          <Header />
          <AssignmentDetails />
        </Route>
        <Route path="/region/:regionId/ao/:aoId/assignment">
          <Header />
          <AssignmentDetails />
        </Route>
        <Route path="/region/:regionId/ao/:aoId">
          <Header />
          <AoDetails />
        </Route>
        <Route path="/region/:regionId/ao">
          <Header />
          <AoDetails />
        </Route>
        <Route path="/region/:regionId/pax/:paxId">
          <Header />
          <PaxDetails />
        </Route>
        <Route path="/region/:regionId/pax">
          <Header />
          <PaxDetails />
        </Route>
        <Route path="/region/:regionId/all-pax">
          <Header />
          <PaxContainer />
        </Route>
        <Route exact path="/regions">
          <Header />
          <RegionsContainer />
        </Route>
        <Route path="/region/:regionId">
          <Header />
          <RegionDetails />
        </Route>
        <Route path="/region">
          <Header />
          <RegionDetails />
        </Route>
        <Route path="*">
          <Header />
          <RegionsContainer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
