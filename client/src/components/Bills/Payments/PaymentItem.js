import React, { useContext } from "react";
import {
  formatDateOnly,
  formatCurrency,
} from "../../../general/utils/formatHelper";
import "../../../general/ui/generic_list.scss";
import { getIconByAction } from "../utils/billsHelper";
import "../../../general/ui/icons.scss";
import { getIcon } from "../../../general/utils/iconManager";
import { AuthContext } from "../../auth/utils/AuthContext";
import { BillsContext } from "../utils/BillsContext";

export default function PaymentItem({ item, action }) {
  const { userId } = useContext(AuthContext);
  const { removePayment } = useContext(BillsContext);
  const isFinished = action === "complete";

  const handlePaymentRemove = (e) => {
    e.preventDefault();

    removePayment(item._id);
  };

  return (
    <div className="">
      <div className="flex-container flex-between listItemLight">
        <div className="flex-container">
          <div
            className="flex-container flex-between"
            style={{ padding: "0.25rem" }}
          >
            {getIconByAction(action, "ic ic_md ic_decore ic_margins")}
            {!isFinished && (
              <span className="description">
                {formatDateOnly(item.transaction_date)}
              </span>
            )}
          </div>
          {isFinished ? (
            <span className="success">Payment complete!</span>
          ) : (
            <>
              <div>
                <p>
                  <span>
                    &nbsp; &nbsp;
                    {item.from_user.name} paid{" "}
                    {formatCurrency(item.total_amount)}
                  </span>
                </p>
                {item.user_comment && (
                  <p className="description comment comment-indent">
                    {item.user_comment.msg}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
        <div>
          {!isFinished && <span>{item.reference_num}</span>}
          <span style={{ marginLeft: "0.5rem" }}>
            {" "}
            {item &&
              item.from_user._id === userId() &&
              getIcon(
                "delete",
                "Remove payment",
                "ic ic_md ic_alert paymentDelete",
                (e) => handlePaymentRemove(e)
              )}
          </span>
        </div>
      </div>

      <hr className="separator-light"></hr>
    </div>
  );
}
