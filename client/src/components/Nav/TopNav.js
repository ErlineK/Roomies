import React, { useContext, memo } from "react";
import "./side-nav.scss";
import "./navbar.scss";
import { Link } from "react-router-dom";
import uuid from "uuid";
import { AiOutlineLogout } from "react-icons/ai";
import { AuthContext } from "../auth/utils/AuthContext";
import { getNavIconByName } from "./navHelper";

function TopNav(props) {
  const { isLoggedIn, logoutUser } = useContext(AuthContext);

  let navArray = props.navItems.map((ni) =>
    ni.logout ? (
      <div className="navLink-holder" key={uuid()}>
        <AiOutlineLogout
          className="top-nav-icon nav-icon-margin-fix"
          onClick={() => logoutUser()}
        />
      </div>
    ) : (
      <div className="navLink-holder" key={uuid()}>
        <Link
          key={uuid()}
          to={`/${ni.path}`}
          className={ni.icon ? "" : "underline nav-link"}
        >
          {ni.icon ? getNavIconByName(ni.icon, "top-nav-icon") : ni.title}
        </Link>
      </div>
    )
  );
  return (
    <div className="navbar user-nav">
      {/* {isLoggedIn() && (
        <NavLink key={uuid()} to={"/UserHome"}>
          <img
            className="navLogo"
            src={require("../../assets/Logo.svg")}
            alt="application logo"
          />
        </NavLink>
      )} */}
      <div className={isLoggedIn() ? "user-navLink-holder" : ""}>
        {navArray}
      </div>
    </div>
  );
}

export default memo(TopNav);
