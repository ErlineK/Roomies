import React, { useContext } from "react";
import "./bills.scss";
import { getIcon } from "../../general/utils/iconManager";
import {
  formatDayMonth,
  formatDateOnly,
} from "../../general/utils/formatHelper";
import { BillsContext } from "./utils/BillsContext";
import AddPayment from "./Payments/AddPayment";
import EditableDataItem from "../GenericComponents/EditableDataItem/EditableDataItem";
import PaymentItem from "./Payments/PaymentItem";
import { useHistory, Redirect } from "react-router-dom";
import CommentItem from "../GenericComponents/Comment/CommentItem";
import AddComment from "../GenericComponents/Comment/AddComment";
import CardWithLoader from "../GenericComponents/CardWithLoader";

export default function ViewBill(props) {
  const history = useHistory();
  const {
    showAddPayment,
    toggleAddPayment,
    // getBillById,
    // editBill,
    billActs,
    requestStatus,
  } = useContext(BillsContext);

  const billId = props.location.state.billId;
  const bill = billActs.getBillById(billId);

  const billPeriod =
    bill && bill.start_date !== "" && bill.end_date !== ""
      ? `${formatDayMonth(bill.start_date)} - ${formatDayMonth(bill.end_date)}`
      : "";

  const billTitle = bill ? `${bill.bill_type} ${billPeriod}` : "";

  const handleAddDoc = (e) => {
    e.preventDefault();

    console.log("clicked add document");
  };

  // const handleAddComment = (e) => {
  //   e.preventDefault();

  //   console.log("clicked add comment");
  // };

  const paymentItems =
    bill && bill.payments && bill.payments.length > 0 ? (
      bill.payments.map((payment) => (
        <PaymentItem key={payment._id} item={payment} />
      ))
    ) : (
      <p>No payments made yet</p>
    );

  const commentItems =
    bill && bill.bill_comments && bill.bill_comments.length > 0 ? (
      bill.bill_comments.map((comment) => (
        <CommentItem key={comment._id} item={comment} />
      ))
    ) : (
      <p>No comments</p>
    );

  return (
    <>
      {bill === undefined ? (
        <Redirect to="/" />
      ) : (
        <CardWithLoader loading={requestStatus.isLoading}>
          <div
            className="secondary-link toLeft btnBack"
            onClick={() => history.goBack()}
          >
            {getIcon("btnBack", "Back", "back-icon")} back
          </div>
          <h4 className="section-title">{billTitle}</h4>

          <div className="flex-container flex-columns-holder viewBillContainer">
            <div className="flex-container flex-fill data-section billDataSection">
              <EditableDataItem
                item={{
                  dbName: "invoice_num",
                  title: "Invoice Number",
                  data: bill.invoice_num,
                  icon: "name",
                  type: "text",
                }}
                handleUpdate={billActs.editBill}
                parentObjId={billId}
              />

              <EditableDataItem
                item={{
                  title: "Billing Period",
                  data: "",
                  icon: "doc_period",
                  type: "text",
                }}
              />

              <div className="flex-columns-holder indented">
                <EditableDataItem
                  item={{
                    dbName: "start_date",
                    title: "From",
                    data: formatDateOnly(bill.start_date),
                    icon: "",
                    type: "date",
                  }}
                  handleUpdate={billActs.editBill}
                  parentObjId={billId}
                />
                <EditableDataItem
                  item={{
                    dbName: "end_date",
                    title: "To",
                    data: formatDateOnly(bill.end_date),
                    icon: "",
                    type: "date",
                  }}
                  handleUpdate={billActs.editBill}
                  parentObjId={billId}
                />
              </div>
            </div>
            <div className="flex-container flex-fill data-section billDataSection">
              <EditableDataItem
                item={{
                  dbName: "due_date",
                  title: "Payment Due",
                  data: formatDateOnly(bill.due_date),
                  icon: "pay_due",
                  type: "date",
                }}
                handleUpdate={billActs.editBill}
                parentObjId={billId}
              />

              <EditableDataItem
                item={{
                  dbName: "total_amount",
                  title: "Total to pay",
                  data: bill.total_amount,
                  icon: "inv_amount",
                  type: "text",
                  specialChar: "$",
                }}
                handleUpdate={billActs.editBill}
                parentObjId={billId}
              />
              {bill.paid < bill.total_amount && (
                <EditableDataItem
                  item={{
                    dbName: "pay_left",
                    title: "Left to pay",
                    data: bill.total_amount - bill.paid,
                    icon: "paiment",
                    type: "text",
                    specialChar: "$",
                  }}
                />
              )}
            </div>
          </div>

          <div>
            <div id="payments Holder">
              <div className="titleContainer ">
                Payments
                {bill.paid < bill.total_amount &&
                  getIcon("add", "Add payment", "ic ic_lg ic_light", (e) =>
                    toggleAddPayment(e)
                  )}
              </div>
              {bill.total_amount <= bill.paid && (
                <PaymentItem action={"complete"} />
              )}
              {paymentItems}
            </div>

            <div id="comments Holder">
              <div className="titleContainer">
                Comments
                <AddComment billId={bill._id} />
              </div>
              {commentItems}
            </div>

            <div id="comments Holder">
              <div className="titleContainer">
                Invoice &amp; Receipts
                {getIcon(
                  "add",
                  "Add invoice/receipt",
                  "ic ic_lg ic_light",
                  (e) => handleAddDoc(e)
                )}
              </div>
              <p>No document added</p>
            </div>
          </div>
          {showAddPayment && <AddPayment bill={bill} />}
        </CardWithLoader>
      )}
    </>
  );
}
