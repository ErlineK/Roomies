import React, { useContext } from "react";
import { formatDate, formatCurrency } from "../../general/utils/formatHelper";
import { getIcon } from "../../general/utils/iconManager";
import AcceptBtn from "../GenericComponents/Buttons/AcceptBtn";
import { NtfActionsContext } from "./utils/NotificationsContext";

function ApprovalMsgItem({ item }) {
  const { accacceptINV } = useContext(NtfActionsContext);

  const amountPaid =
    item.ntf_bill && item.ntf_bill.total_amount
      ? item.ntf_bill.total_amount
      : 0;

  let messageTxt = (
    <p className="msgTitle">
      <span className="txb">{item.from_user.name}</span> transfered you{" "}
      <span className="txb">{formatCurrency(amountPaid)}</span>
    </p>
  );

  if (item.ntf_type && item.ntf_type === "trnsAccepted") {
    messageTxt = (
      <p className="msgTitle">
        <span className="txb">{item.from_user.name}</span> accepted your{" "}
        <span className="txb">{formatCurrency(amountPaid)}</span> Roomie
        Transfer
      </p>
    );
  }

  const handleAcceptPayment = (e) => {
    e.preventDefault();

    accacceptINV(item._id, item.ntf_house);
  };

  return (
    <div className="listItemHolder">
      <div className="listFlexHolder">
        {getIcon("paiment", undefined, "ic_list_item")}
        <div style={{ width: "100%" }}>
          <div className="msgRow">
            {messageTxt}
            <p className="description textLight">
              {formatDate(item.added_date)}
            </p>
          </div>
          {item.type === "TRNS" && (
            <div className="msgRow">
              <p className="msgTitle description">
                {item.ntf_bill && item.ntf_bill.bill_comments
                  ? item.ntf_bill.bill_comments[0]
                  : !item.accepted &&
                    "Do not accept Roomie transfers before getting paid"}
              </p>
              {item.accepted ? (
                <p className="success">Accepted!</p>
              ) : (
                <AcceptBtn onClick={handleAcceptPayment} />
              )}
            </div>
          )}
        </div>
      </div>

      <hr></hr>
    </div>
  );
}

export default ApprovalMsgItem;
