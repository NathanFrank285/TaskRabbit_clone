import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from "./components/SignUpFormPage";
import TaskSearch from "./components/TaskSearch";
import ViewDevs  from "./components/ViewDevs";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Search from "./components/Search";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignUpFormPage/>
          </Route>
        </Switch>
      )}
      <Switch>
        <Route exact path="/">
          <TaskSearch/>
        </Route>
        <Route exact path="/search/:type">
          <Search/>
        </Route>
        <Route exact path="/viewDevs">
          <ViewDevs/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
