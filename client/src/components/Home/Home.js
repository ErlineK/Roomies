import React from "react";
import "./home.scss";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="homeContainer guestBackground">
      <div className="homeContent">
        <img
          className="homeLogo"
          src={require("../../assets/Logo.svg")}
          alt="application logo"
        />
        <h1>Roomies</h1>
        <hr className="homeSeparator"></hr>
        <h4>Manage shared expenses together</h4>
        <div id="buttonsHolder" className="buttonsHolder">
          <Link className="btn btn-grad " to="/Registration">
            Register
          </Link>
          <Link className="btn btn-grad" to="/Login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
