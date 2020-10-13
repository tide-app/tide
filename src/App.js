import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FreeSound from "freesound-client";
import Modal from "react-modal";
import Sound from "./Sound";
import Search from "./Search";
import auth, { init } from "./Auth";
// Bind modal to our appElement for accessibility
Modal.setAppElement(document.getElementById('root'));

const modalWindowStyles = {
  content: {
    background: 'black',
    bottom: 'auto',
    left: '50%',
    marginRight: '-50%',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
}
const freeSound = new FreeSound();

const App = () => {
  const [searchValue, setSearchValue] = useState("note");
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  function closeModal() {
    setModalIsOpen(false);
  }

  function openRedirectDialogModalWindow() {
    setModalIsOpen(true);
  }

  // Navigate the user to the freesound oauth login page
  const navigateToLogin = () => {
    window.location.replace(freeSound.getLoginURL());
  };

  return (
    <div className="App">
      {!isLoggedIn && (
        <button
          className="bg-default rounded px-4"
          type="button"
          onClick={openRedirectDialogModalWindow}
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
      <Modal
        contentLabel="Dialog window confirming visit to Freesound"
        isOpen={modalIsOpen}
        style={modalWindowStyles}
      >
        <h1>Redirecting to Freesound</h1> <br />
        <p>After logging in with Freesound, you'll be sent back here!</p>
        <br />
        <button onClick={navigateToLogin}>Send me there!</button> {' '}
        <button onClick={closeModal}>Maybe Later</button>
      </Modal>
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
