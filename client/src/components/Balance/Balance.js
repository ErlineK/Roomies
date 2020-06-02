import React, { useContext } from "react";
import CardWithLoader from "../GenericComponents/CardWithLoader";
import { formatCurrency } from "../../general/utils/formatHelper";
import ColumnChart from "../GenericComponents/Charts/ColumnChart";
import RoomiePieChart from "../GenericComponents/Charts/RoomiePieChart";
import { BalanceContext, BalanceActionsContext } from "./utils/BalanceContext";

export default function Balance() {
  const { balance, requestStatus } = useContext(BalanceContext);
  const balanceActions = useContext(BalanceActionsContext);

  const dataNotEmpty = balance && balance.length > 0;

  const tenantsBalance = dataNotEmpty
    ? balance.map((roomie) => (
        <div key={roomie._id} className="balanceItem">
          <p className={`${roomie.totalBalance < 0 ? "red" : ""} underline`}>
            {balanceActions.isMyId(roomie._id) ? "Me" : roomie.user}
          </p>
          <p className="balance-text"> {formatCurrency(roomie.totalBalance)}</p>
        </div>
      ))
    : "";

  const billsData = dataNotEmpty
    ? balance.map((roomie) => ({
        name: balanceActions.isMyId(roomie._id) ? "Me" : roomie.user,
        balance: roomie.totals.paidBills,
        even: roomie.totals.billsEven,
      }))
    : undefined;

  const billsEven = dataNotEmpty ? balance[0].totals.billsEven : undefined;

  const rtDataTranferred = dataNotEmpty
    ? balance
        .filter(
          (r) => !balanceActions.isMyId(r._id) && r.totals.transfered !== 0
        )
        .map((roomie) => ({
          name: roomie.user,
          balance: Math.abs(roomie.totals.transfered),
          title: "From Me",
        }))
    : undefined;

  const rtDataReceived = dataNotEmpty
    ? balance
        .filter((r) => !balanceActions.isMyId(r._id) && r.totals.received !== 0)
        .map((roomie) => ({
          name: roomie.user,
          balance: Math.abs(roomie.totals.received),
          title: "To Me",
        }))
    : undefined;

  return (
    <CardWithLoader loading={requestStatus.isLoading}>
      <h4>Roomies Balance</h4>
      <div className="billsHolder listContainer">
        <div className="flex-container flex-around  ">{tenantsBalance}</div>
      </div>
      <div className="billsHolder listContainer">
        <div className="centerRsp">
          {billsData && (
            <ColumnChart
              title={"Total Bills Paid"}
              data={billsData}
              even={billsEven}
            />
          )}
        </div>
        <div
          className="flex-container flex-columns-holder billsHolder"
          style={{ marginTop: "1rem" }}
        >
          {rtDataReceived && rtDataReceived.length > 0 && (
            <RoomiePieChart
              title={"Roomie Transfers (To me)"}
              data={rtDataReceived}
            />
          )}
          {rtDataTranferred && rtDataTranferred.length > 0 && (
            <RoomiePieChart
              title={"Roomie Transfers (From me)"}
              data={rtDataTranferred}
            />
          )}
        </div>
      </div>
    </CardWithLoader>
  );
}
