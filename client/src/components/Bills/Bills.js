import React, { useContext } from "react";
import "./bills.scss";
import BillItem from "./BillItem";
import { getIcon } from "../../general/utils/iconManager";
import { BillsContext } from "./utils/BillsContext";
import AddBillPop from "./AddBillPop";
import { BILL_TYPES } from "../../general/utils/AppParams";
import useInputState from "../../general/hooks/useInputState";
import CardWithLoader from "../GenericComponents/CardWithLoader";
import {
  checkRoomieTransferAccepted,
  checkBillFullyPaid,
} from "./utils/billsHelper";

export default function Bills() {
  const { bills, showAddBill, toggleAddBill, requestStatus } = useContext(
    BillsContext
  );
  const [billType, handleBillTypeChange] = useInputState("select", "BILL_TYPE");

  console.log("Bills is called");

  const billTypeOptions = BILL_TYPES.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  // filter bills by bill type
  const filteredBills = BILL_TYPES.includes(billType)
    ? bills.filter((bill) => bill.bill_type === billType)
    : bills;

  const billItems = filteredBills
    ? filteredBills
        .sort((a, b) => {
          return (
            new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
          );
        })
        .reverse()
        .sort((b) => (checkBillFullyPaid(b) ? -1 : 1))
        .sort((b) => (checkRoomieTransferAccepted(b) ? 1 : -1))
        .map((bill, i) => <BillItem key={`bill${i}`} item={bill} />)
    : "";

  return (
    <CardWithLoader loading={requestStatus.isLoading}>
      <h3>Bills and Payments</h3>

      <div className="billsHolder flex-container flex-between flex-center-vertical">
        <select
          className="form-control filterSelect"
          id="billType"
          onChange={handleBillTypeChange}
          value={billType}
        >
          <option value="select" disabled>
            Filter Bill Type...
          </option>
          <option value="all">All</option>
          {billTypeOptions}
        </select>

        {getIcon("addFile", "Add new bill", "ic ic_lg ic_roomies", () =>
          toggleAddBill()
        )}
      </div>
      <div className="billsHolder listContainer">{billItems}</div>
      {showAddBill && <AddBillPop />}
    </CardWithLoader>
  );
}
