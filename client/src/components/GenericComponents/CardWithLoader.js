import React, { useContext } from "react";
import CircleLoader from "./Loader/CircleLoader";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/utils/AuthContext";

export default function CardWithLoader(props, { loading }) {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      {isLoggedIn() ? (
        <div className="card user-main">
          <div className="floatingLoaderHolder">
            {loading && <CircleLoader />}
          </div>
          {props.children}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}
