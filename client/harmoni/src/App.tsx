import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { loginService } from "./services/loginService";
import { userService } from "./services/UserService";

// Bootstrap styling
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import FrontPage from "./Components/Pages/frontPage";
import Register from "./Components/Pages/register";
import Profile from "./Components/Pages/profile";
import Events from "./Components/Pages/events";
import Event from "./Components/Pages/eventPage";
import PageNotFound from "./Components/Pages/pageNotFound";
import Layout from "./Components/layout";
import AddEvent from "./Components/AddEvent/addEvent";

// Authentication component
import Authenticate from "./Components/authenticate";
import ForgotPassword from "./Components/Pages/forgotPasswordPage";
import ResetPassword from "./Components/Pages/resetPassword";

const App: React.FC = () => {
  const [userData, setUserData] = useState(undefined);

  // Get data when component mounts
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    let res = await loginService.checkToken();

    if (res) setUserData(res["data"]["userData"]);
  };

  const logOut = () => {
    localStorage.removeItem("x-access-token");
    setUserData(undefined);
  };

  const logIn = async (email: string) => {
    let res = await userService.getUserByEMail(email);
    setUserData(res[0]);
  };

  interface IProps {
    component?: any;
    render?: any;
    exact?: boolean;
    path: string;
  }

  // Route with authentication
  const RouteWithAuth = ({ component, render, ...rest }: IProps) => (
    <Authenticate userData={userData} logIn={logIn}>
      <Route {...rest} render={render} component={component} />
    </Authenticate>
  );

  return (
    <Router>
      {console.log("user data", userData)}
      <Layout userData={userData} logOut={logOut} logIn={logIn}>
        <Switch>
          <Route exact path="/" component={FrontPage} />
          <Route
            exact
            path="/registrer"
            render={props => <Register {...props} logIn={logIn} />}
          />
          <Route exact path="/events/:type" component={Events} />
          <Route exact path="/event/:id" component={Event} />
          <Route
            exact
            path="/newEvent"
            render={props => <AddEvent userData={userData} />}
          />

          {/* ROUTES WITH AUTHENTICATION */}
          <RouteWithAuth
            exact
            path="/profile/change"
            render={props => <Register userData={userData} />}
          />
          <RouteWithAuth
            exact
            path="/profile"
            render={props => <Profile userData={userData} />}
          />
          <Route exact path="/glemt-passord" component={ForgotPassword} />
          <Route
            exact
            path="/reset/reset_password/:token"
            component={ResetPassword}
          />
          {/* <RouteWithAuth exact path='/newevent' component={AddEvent} /> */}

          {/* 404 PAGE NOT FOUND (if not other routes match) */}
          <Route component={PageNotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
