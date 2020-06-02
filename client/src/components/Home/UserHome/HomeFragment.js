import React from "react";
import "../../../general/ui/generic_list.scss";
import CircleLoader from "../../GenericComponents/Loader/CircleLoader";
import { Link } from "react-router-dom";

export default function HomeFragment(props) {
  return (
    <>
      {props.title !== "" && (
        <div className="titleContainer">
          {props.title}
          {props.linkPath && props.linkTitle && (
            <Link className="secondary-link " to={`/${props.linkPath}`}>
              {props.linkTitle} >>
            </Link>
          )}
        </div>
      )}
      {props.isLoading && <CircleLoader />}

      {props.isError || props.noData ? (
        <p className="toCenter ic_margins">
          Sorry! No {props.itemsName} to display
        </p>
      ) : (
        <div className="listContainer">{props.children}</div>
      )}
    </>
  );
}
