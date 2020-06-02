import React from "react";
import "./navbar.scss";
import "./new-side-nav.scss";
import { NavLink } from "react-router-dom";
import uuid from "uuid";
// import { FaUserCog, FaBell, FaPowerOff } from "react-icons/fa";
import { getNavIconByName } from "./navHelper";
import useToggle from "../../general/hooks/useToggle";

function SideNav({ navItems }) {
  const [collapsed, toggleMenu] = useToggle(true);

  let navArray = navItems.map((ni) => (
    // <div key={uuid()}>
    <NavLink
      key={uuid()}
      className="sn-link-container"
      activeClassName={`sn-link-active active-${ni.color}`}
      to={`/${ni.path}`}
      onClick={() => toggleMenu()}
    >
      <div className="snIconHolder">
        {ni.icon ? getNavIconByName(ni.icon, "snIcon nav-icon-margin-fix") : ""}
      </div>
      {/* <FaUserCog className="snIcon nav-icon-margin-fix" /> */}
      <p className="snTitle">{ni.title}</p>
    </NavLink>
    // </div>
  ));

  return (
    <div className="snHolder">
      <div className={`sideNav ${collapsed ? `snCollapsed` : `snExpended`}`}>
        <div className="navLogo" alt="menu" onClick={() => toggleMenu()}></div>

        <section>{navArray}</section>
      </div>
    </div>
  );
}

export default SideNav;
