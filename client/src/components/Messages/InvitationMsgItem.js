import React, { useContext } from "react";
import { FaCheck } from "react-icons/fa";

import { formatDateOnly } from "../../general/utils/formatHelper";
import { getIcon } from "../../general/utils/iconManager";
import { NtfActionsContext } from "./utils/NotificationsContext";

function InvitationMsgItem({ item }) {
  const { acceptingINV, declineINV } = useContext(NtfActionsContext);

  const handleAcceptInvitation = (e) => {
    e.preventDefault(e);

    acceptingINV(item._id, item.ntf_house);
  };

  const handleDeclineInvitation = (e) => {
    e.preventDefault(e);

    declineINV(item._id, item.ntf_house);
  };

  return (
    <div className="listItemHolder">
      <div className="listFlexHolder">
        {getIcon("welcome_home", undefined, "ic_list_item")}
        {/* <GiKeyring className="ic_list_item" /> */}
        <div style={{ width: "100%" }}>
          <div className="msgRow">
            <p className="msgTitle">
              <span className="txb">{item.from_user.name}</span> invited you to
              join{" "}
              <span className="txb">
                {item.ntf_house ? item.ntf_house.houseName : ""}
              </span>
            </p>
            <p className="description textLight">{formatDateOnly(item.date)}</p>
          </div>
          <div className="msgRow flext-right">
            <p className="description">
              {item.ntf_house
                ? `${item.ntf_house.address} , ${item.ntf_house.city}`
                : ""}
            </p>

            {item.accepted ? (
              <p className="success">Accepted!</p>
            ) : (
              <button
                className="btn btn-grad-green btnAction"
                onClick={(e) => handleAcceptInvitation(e)}
              >
                <FaCheck className="accent-icon" />
                Accept
              </button>
            )}
          </div>
        </div>
      </div>
      {!item.accepted && (
        <div className="msgBtn msgBtnCancel">
          {getIcon("delete", "Decline", "msgBtnIcon", (e) =>
            handleDeclineInvitation(e)
          )}
        </div>
      )}

      <hr></hr>
    </div>
  );
}

export default InvitationMsgItem;
