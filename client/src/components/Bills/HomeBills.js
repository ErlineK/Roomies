import React, { useContext } from "react";
import HomeFragment from "../Home/UserHome/HomeFragment";
import BillItem from "./BillItem";
import { BillsContext } from "./utils/BillsContext";
import {
  checkBillFullyPaid,
  checkRoomieTransferAccepted,
  checkRoomieTransfer,
} from "./utils/billsHelper";

export default function HomeBills() {
  const { bills, requestStatus } = useContext(BillsContext);

  const homeBills =
    bills && bills.length > 0
      ? bills
          .filter((b) => b.due_date || !checkRoomieTransferAccepted(b))
          .sort((a, b) => {
            return (
              new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
            );
          })
          .reverse()
          .sort((b) =>
            checkBillFullyPaid(b) && !checkRoomieTransfer(b) ? 1 : -1
          )
          .slice(0, 5)
      : bills;

  const billItems = homeBills
    ? homeBills.map((bill, i) => (
        <BillItem key={`bill${i}`} item={bill} type={"HOME"} />
      ))
    : "";

  return (
    <div className="homeItem">
      <div className="card ">
        <HomeFragment
          isLoading={requestStatus ? false : requestStatus.isLoading}
          isError={requestStatus ? false : requestStatus.isError}
          noData={bills === undefined || bills.length < 1}
          title={"Latest bills"}
          itemsName={"bills"}
          linkTitle={"All bills"}
          linkPath={"Bills"}
        >
          {billItems}
        </HomeFragment>
      </div>
    </div>
  );
}
