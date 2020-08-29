import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FreeSound from "freesound-client";
import Sound from "./Sound";
import Search from "./Search";
import auth, { init } from "./Auth";

// Todolist
// * Authentication (OAuth) / Downloading sounds
// * UI design
// * Dark Mode (React Context)
// * Accessibility
// * Offline

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
  const navigateToLogin = () =>
    window.location.replace(freeSound.getLoginURL());

  return (
    <div className="App">
      {!isLoggedIn && (
        <button type="button" onClick={navigateToLogin}>
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
            path={"/freesound-player"}
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
