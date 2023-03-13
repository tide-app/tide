import { searchSharp } from "ionicons/icons";
import React from "react";
import { Link, useLocation, withRouter } from "react-router-dom";
import Button from "./components/Button.tsx";
import Input from "./components/Input.tsx";
import LoginDropdown from "./components/LoginDropdown";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Nav({ isLoggedIn, openModal, setSearchValue, history }) {
  const pushHistory = (searchValue) => {
    history.push({
      pathname: "/search",
      search: `?q=${searchValue}`,
    });
  };
  const queryParams = useQuery();
  const searchQuery = queryParams.get("q");
  React.useEffect(() => {
    const focusSearchBar = (event) => {
      // Ignore shortcuts if the search bar is already focused,
      // or if the pressed key(s) don't match this keyboard shortcut.
      if (
        document.activeElement !== document.getElementById("search-bar") &&
        (event.key === "/" || (event.key === "k" && event.ctrlKey))
      ) {
        event.preventDefault();
        document.getElementById("search-bar").focus();
      }
    };
    // https://devtrium.com/posts/how-keyboard-shortcut#the-code
    document.addEventListener("keydown", focusSearchBar);
    return () => document.getElementById("keydown", focusSearchBar);
  });
  return (
    <nav className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
      <div className="md:flex items-center justify-start space-x-8 md:flex-1 lg:w-0">
        <ul className="flex">
          {/* <li className="mr-6"> // Removing on Tuesday, November 24, 2020, due to
            <a href="/">Explore</a> // lack of functionality - Hamir
          </li>
          <li className="mr-6">
            <a className="hover:opacity-100 opacity-50" href="/featured">
              Featured
            </a>
          </li> */}
        </ul>
      </div>
      <div className="md:flex space-x-2 justify-between items-center">
        <Link to="/" className="flex space-x-2 justify-between items-center">
          <picture>
            <source
              srcSet="/icons/light-icon.svg"
              media="(prefers-color-scheme: dark)"
            />
            <source
              srcSet="/icons/dark-icon.svg"
              media="(prefers-color-scheme: light)"
            />
            <img src="/icons/light-icon.svg" alt="Tide" className="h-10" />
          </picture>
          <h1 className="text-lg">Tide</h1>
        </Link>
      </div>

      <div className="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
        <Input
          data-e2e-id="search-input"
          defaultValue={searchQuery}
          icon={searchSharp}
          id="search-bar"
          name="sound-search"
          onChange={(e) =>
            pushHistory(e.target.value) && setSearchValue(e.target.value)
          }
          autoComplete="off"
          placeholder="Search sound..."
          // type="search" // This seems appropriate, but adds an X that interferes with the search icon.
        />
        {isLoggedIn ? (
          <LoginDropdown />
        ) : (
          <Button data-e2e-id="Login-button" onClick={openModal}>
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}
export default withRouter(Nav);
