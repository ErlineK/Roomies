import React, { memo, useContext } from "react";
import "../home.scss";
import HomeMsgs from "../../Messages/HomeMsgs";
import HomeBalance from "../../Balance/HomeBalance";
import HomeBills from "../../Bills/HomeBills";
import HomeChores from "../../Chores/HomeChores";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../auth/utils/AuthContext";

/**
 * Bills and Home Balance to be displayed only to logged users with an active houseId
 */
function UserHome() {
  const { isLoggedIn, user, activeHouseId } = useContext(AuthContext);

  return (
    <>
      {isLoggedIn() ? (
        <div className=" user-main">
          {activeHouseId ? (
            <>
              <HomeBalance />
              <div className="flex-container flex-fill homeRow">
                <HomeMsgs />
                <HomeChores />
              </div>
              <HomeBills />
            </>
          ) : (
            <div className="card" style={{ margin: "0.1rem" }}>
              <div className="homePersonalContainer">
                <h2 className="homeMainTitle">Hi {user ? user.name : ""}! </h2>

                <Link className="secondary-link" to="/Settings">
                  Would you like to open a new Roomies house?
                </Link>
                <p className="comment" style={{ textAlign: "center" }}>
                  (Or ask a Roomie to invite you)
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default memo(UserHome);
