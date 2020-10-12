import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FreeSound from "freesound-client";
import Sound from "./Sound";
import Search from "./Search";
import auth, { init } from "./Auth";

const freeSound = new FreeSound();

const App = () => {
  const [searchValue, setSearchValue] = useState("note");
  const [isLoggedIn, setLoggedIn] = useState(false);
  init(freeSound);
  auth(freeSound);

  useEffect(() => {
    auth(
      freeSound,
      () => {
        setLoggedIn(true);
      },
      () => {
        setLoggedIn(false);
      }
    );
  });

  // Navigate the user to the freesound oauth login page
  const navigateToLogin = () => {
    if (window.confirm("This will send you to freesound.org. Is that okay?"))
      window.location.replace(freeSound.getLoginURL());
  };

  return (
    <div className="App">
      {!isLoggedIn && (
        <button
          className="bg-default rounded px-4"
          type="button"
          onClick={navigateToLogin}
        >
          Login
        </button>
      )}
      <div className="Search">
        <input
          name="search"
          type="text"
          placeholder="Search sound..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <ion-icon name="search-sharp"></ion-icon>
      </div>
      <Router>
        <Switch>
          <Route
            path="/sound/:id"
            render={() => (
              <Sound isLoggedIn={isLoggedIn} freeSound={freeSound} />
            )}
          />
          <Route
            path={"/"}
            render={() => (
              <Search
                isLoggedIn={isLoggedIn}
                freeSound={freeSound}
                searchValue={searchValue}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
