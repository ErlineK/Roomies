import React, { useContext, memo } from "react";
import HomeFragment from "../Home/UserHome/HomeFragment";
import GeneralMsgItem from "./GeneralMsgItem";
import InvitationMsgItem from "./InvitationMsgItem";
import NofiticationMsgItem from "./NofiticationMsgItem";
import ApprovalMsgItem from "./ApprovalMsgItem";
import {
  NotificationsContext,
  NtfStatusContext,
} from "./utils/NotificationsContext";

/* NVT => Invitation to join a peoperty account
 * MSG => message on messages board
 * NTF => notification of paid bill/welcome/new tenant/birthdays(?)
 * TRNS => notification of transaction between tenants
 */

function HomeMsgs() {
  const notifications = useContext(NotificationsContext);
  const ntfStatus = useContext(NtfStatusContext);

  const getMsgObjByType = (msg) => {
    var msgObj;
    switch (msg.type) {
      case "MSG":
        msgObj = <GeneralMsgItem key={`msg${msg._id}`} item={msg} />;
        break;

      case "NVT":
        msgObj = <InvitationMsgItem key={`msg${msg._id}`} item={msg} />;
        break;

      case "NTF":
        msgObj = <NofiticationMsgItem key={`msg${msg._id}`} item={msg} />;
        break;

      case "TRNS":
        msgObj = <ApprovalMsgItem key={`msg${msg._id}`} item={msg} />;
        break;

      default:
        break;
    }

    return msgObj;
  };

  const msgs =
    notifications && notifications.length > 0
      ? notifications.map((msg, i) => getMsgObjByType(msg))
      : "";

  return (
    <div className="homeHolder homeItem">
      <div className="card ">
        <HomeFragment
          isLoading={ntfStatus.isLoading}
          isError={ntfStatus.isError}
          noData={notifications === undefined || notifications.length < 1}
          title={""}
          itemsName={"messages"}
        >
          <div className="listContainer">{msgs}</div>
        </HomeFragment>
      </div>
    </div>
  );
}

export default memo(HomeMsgs);
