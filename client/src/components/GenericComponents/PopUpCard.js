import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export default function PopUpCard(props) {
  return (
    <div className="card popup">
      <div className="toCenter card popupContent">
        {/* <div
          className="secondary-link toRight btnClose"
          onClick={() => props.togglePop()}
        > */}
        <AiFillCloseCircle
          className="ic btnClose"
          onClick={() => props.togglePop()}
        />
        {/* // </div> */}
        {props.children}
      </div>
    </div>
  );
}
