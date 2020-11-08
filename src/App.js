import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { closeSharp } from "ionicons/icons";
import FreeSound from "freesound-client";
import { IonIcon } from "@ionic/react";
import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import auth, { init } from "./Auth";
import Sound from "./Sound";
import Search from "./Search";
import Nav from "./Nav";
// Bind modal to our appElement for accessibility
Modal.setAppElement(document.getElementById("root"));

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
    <div className="xl:container xl:mx-auto">
      <Modal
        className="bg-primary border-2 border-secondary color-secondary max-w-xl mx-auto my-48 outline-none px-2 py-1 relative"
        contentLabel="Window confirming visit to Freesound"
        isOpen={modalIsOpen}
        onRequestClose={closeModal} // Really important!
        // The above line appears to be what allows users
        // to exit the Modal by simply hitting the Esc key
        // or clicking anywhere else on the page.
        // Please keep onRequestClose={closeModal} in here
        // in future iterations for
        // an improved user experience.
        overlayClassName="bg-primary fixed inset-0 Modal z-10"
        closeTimeoutMS={200}
      >
        <button className="m-2 absolute top-0 right-0" onClick={closeModal}>
          <IonIcon icon={closeSharp} size="large" />
        </button>
        <section className="ml-6 pb-6 pt-2 text-lg">
          <h1 className="pb-4 pt-3 text-2xl">Redirecting to Freesound</h1>
          <p>
            After logging in with Freesound, {/* eslint-disable-next-line */}
            you'll be sent back here!
          </p>
          <br />
          <span className="mx-8 space-x-10 space-y-4">
            <button // space-y-4 above adds space between
              className="bg-secondary text-primary border px-8 py-2 rounded-lg"
              onClick={navigateToLogin} // buttons on mobile.
            >
              Send me there!
            </button>
            <button
              className="border px-10 py-2 rounded-lg"
              onClick={closeModal}
            >
              Maybe Later
            </button>
          </span>
        </section>
      </Modal>
      <Router>
        <Nav
          setSearchValue={setSearchValue}
          openRedirectDialogModalWindow={openRedirectDialogModalWindow}
        />
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
