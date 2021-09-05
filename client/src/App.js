import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { Context } from "./context/context";

import Header from "./components/header";

import Home from "./pages/home";
import Write from "./pages/write";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Posts from "./pages/singlePost";
import Register from "./pages/register";

function App() {
  const { user } = useContext(Context);
  return (
    <div>
      <Header />

      <Switch>
        <Route path="/posts" component={Posts} />
        {user ? (
          <Route path={`/users/${user._id}`}>
            {user ? <Profile /> : <Login />}
          </Route>
        ) : (
          ""
        )}

        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/write">{user ? <Write /> : <Login />}</Route>

        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
