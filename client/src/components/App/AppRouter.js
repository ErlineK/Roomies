import React from "react";
import { Route, Switch } from "react-router-dom";
import Bills from "../Bills/Bills";
import GroupChat from "../groupchat/GroupChat";
import Home from "../Home/Home";
import HouseList from "../HouseList/houselist";
import Registration from "../auth/Registration";
import Login from "../auth/Login";
import UserHome from "../Home/UserHome/UserHome";
import Chores from "../Chores/chores";
import UserSettings from "../UserSettings/Settings";
import CreateProfile from "../Profile/CreateProfile";
import ViewBill from "../Bills/ViewBill";
import Balance from "../Balance/Balance";

export default function () {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/Home" render={() => <Home />} />
      <Route exact path="/Registration" render={() => <Registration />} />
      <Route exact path="/CreateProfile" render={() => <CreateProfile />} />
      <Route exact path="/Login" render={() => <Login />} />
      <Route exact path="/Bills" component={Bills} />
      <Route exact path="/Balance" component={Balance} />
      <Route exact path="/ViewBill" component={ViewBill} />
      <Route exact path="/GroupChat" component={GroupChat} />
      <Route exact path="/HouseList" component={HouseList} />
      <Route exact path="/UserHome" component={UserHome} />
      <Route exact path="/Settings" component={UserSettings} />
      <Route exact path="/Chores" component={Chores} />
    </Switch>
  );
}
