import React, { useContext } from "react";
import "../Home/UserHome/homeLists.scss";
import {
  formatCurrency,
  formatDateOnly,
  formatDayMonth,
} from "../../general/utils/formatHelper";
import { getBackgroundByDue } from "../GenericComponents/listsHelper";
import { getIcon } from "../../general/utils/iconManager";
import {
  getIconByBillType,
  checkRoomieTransfer,
  checkRoomieTransferAccepted,
  checkBillFullyPaid,
  checkRtFromMe,
} from "./utils/billsHelper";
import { Link } from "react-router-dom";
import { BillsContext } from "./utils/BillsContext";
import { AuthContext } from "../auth/utils/AuthContext";
import AcceptBtn from "../GenericComponents/Buttons/AcceptBtn";
// import CommentItem from "../GenericComponents/Comment/CommentItem";
// import CommentSection from "../GenericComponents/Comment/CommentSection";

/* bill item types: "HOME" */

function BillItem({ item, type }) {
  const { userId } = useContext(AuthContext);
  const { removeBill, acceptRoomieTransfer } = useContext(BillsContext);

  const isRoomieTransfer = checkRoomieTransfer(item);
  const fromMe = checkRtFromMe(item, userId());
  const paymentAccepted = checkRoomieTransferAccepted(item);

  const handleAcceptPayment = (e) => {
    e.preventDefault();

    acceptRoomieTransfer(item._id);
  };

  const handleRemoveBill = (e) => {
    e.preventDefault();

    // prompt for confiramtion
    window.confirm("Are you sure you want to delete this item?") &&
      removeBill(item._id);
  };

  const billingPreiod =
    item && item.start_date && item.end_date
      ? `${formatDayMonth(item.start_date)} - ${formatDayMonth(item.end_date)}`
      : "";

  const fullyPaid = checkBillFullyPaid(item);

  const lastComment =
    item.bill_comments && item.bill_comments.length > 0 ? (
      <p className={"comment indented"}>
        <span className="txb">{item.bill_comments[0].author.name}: </span>
        {item.bill_comments[0].msg}
      </p>
    ) : (
      ""
    );

  function getRecepient() {
    if (isRoomieTransfer && item.payments) {
      const userName = fromMe
        ? item.payments[0].to_user.name
        : item.payments[0].from_user.name;
      return `${fromMe ? "To" : "From"} ${userName}`;
    } else {
      return undefined;
    }
  }

  function getRTstatus() {
    // dispaly Accept Roomie Transfer" button anly from bills page
    if (isRoomieTransfer) {
      return (
        <p
          className={`${paymentAccepted ? "success" : ""} description comment`}
        >
          {paymentAccepted ? "Accepted!" : "Pending approval..."}
        </p>
      );
    } else {
      return "";
    }
  }

  function getAcceptButton() {
    if (isRoomieTransfer && !fromMe && !paymentAccepted && type !== "HOME") {
      return <AcceptBtn onClick={handleAcceptPayment} />;
    } else {
      return "";
    }
  }

  return (
    <div
      className={`${
        !fullyPaid && getBackgroundByDue(item.due_date)
      } listItemHolder billItem`}
    >
      <div className="listFlexHolder">
        {getIconByBillType(
          item.bill_type,
          `${fullyPaid && paymentAccepted ? "success" : ""} ic_list_item`
        )}

        <Link
          className="billsGrid"
          to={{ pathname: "/ViewBill", state: { billId: item._id } }}
        >
          <div className="gridItem lg-sc-only">
            <p>
              {isRoomieTransfer
                ? item.payments[0].reference_num
                : item.invoice_num}
            </p>
          </div>

          <div className="gridItem">
            <p>{billingPreiod}</p>
          </div>

          <div className="gridItem">
            <div className="flex-container data-section">
              <p>{item.bill_type}</p>
              {isRoomieTransfer && (
                <p className="description comment">{getRecepient()}</p>
              )}
            </div>
          </div>

          <div className="gridItem">
            <div className="flex-container data-section">
              <p
                className={`${
                  (isRoomieTransfer && paymentAccepted) ||
                  (!isRoomieTransfer &&
                    Math.abs(item.paid) >= Math.abs(item.total_amount))
                    ? "success"
                    : ""
                }`}
              >
                {item.paid && item.paid < item.total_amount
                  ? `${formatCurrency(item.paid)}/`
                  : ""}
                {formatCurrency(item.total_amount)}
              </p>
              {isRoomieTransfer ? getRTstatus() : ""}
            </div>
          </div>
          <div className="gridItem">
            <div className="flex-container data-section">
              <p className="description textLight">
                {formatDateOnly(
                  isRoomieTransfer
                    ? item.payments[0].transaction_date
                    : item.due_date
                )}
              </p>
              {isRoomieTransfer && getAcceptButton()}
            </div>
          </div>
        </Link>
        {type !== "HOME" && (
          <div className="flex-container billsIconsHolder">
            {getIcon(
              "delete",
              "Delete item",
              `${
                item.payments && item.payments.length > 0
                  ? "ic_placeholder"
                  : ""
              } billActionIcon ic_lg ic_alert`,
              (e) => handleRemoveBill(e)
            )}
          </div>
        )}
      </div>
      {lastComment}
      {/* <CommentSection comments={item.comments} type={"PREV"} /> */}

      <hr></hr>
    </div>
  );
}

export default BillItem;
