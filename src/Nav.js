import React from "react";
import { Link } from "react-router-dom";
import Button from "./components/Button";
import Input from "./components/Input";
// import { searchSharp } from "ionicons/icons";
// import { IonIcon } from "@ionic/react";

export default function Nav({
  isLoggedIn,
  openRedirectDialogModalWindow,
  setSearchValue,
}) {
  return (
    <nav className="flex justify-between items-center py-4 px-2 md:justify-start md:space-x-10">
      <div className="md:flex items-center justify-start space-x-8 md:flex-1 lg:w-0">
        <ul className="flex">
          <li className="mr-6">
            <a href="/">Explore</a>
          </li>
          <li className="mr-6">
            <a href="/featured">Featured</a>
          </li>
        </ul>
      </div>
      <div className="md:flex space-x-2 justify-between items-center">
        <Link to="/" className="flex space-x-2 justify-between items-center">
          <img className="h-10" src="/icons/icon.svg" />
          <h1 className="text-lg">Tide</h1>
        </Link>
      </div>

      <div className="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
        <Input
          name="sound-search"
          placeholder="Search sound..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {!isLoggedIn && (
          <Button onClick={openRedirectDialogModalWindow}>Login</Button>
        )}
      </div>
    </nav>
  );
}
