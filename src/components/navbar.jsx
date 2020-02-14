import React from "react";
import { Link } from "react-router-dom";

//redux:
import { connect } from "react-redux";

const _NavBar = ({ buttonBack }) => (
  <nav className="navbar navbar-expand-lg navbar-dark justify-content-between d-flex">
    <h1>
      Gnome{" "}
      <span className="crossed">
        <span className="tinder">Tinder</span>
      </span>{" "}
      Finder <i className="text-danger fas fa-heart" />
    </h1>

    <div className="justify-content-space-between">
      {buttonBack ? (
        <Link to={"/finder"} className="btn btn-navbar mr-4">
          Back
        </Link>
      ) : null}

      <Link to={"/"} className="btn btn-danger">
        Exit
      </Link>
    </div>
  </nav>
);

const NavBar = connect(state => ({
  buttonBack: state.showButton
}))(_NavBar);

export default NavBar;
