import React from "react";
import {
  GiHeatHaze,
  GiMilkCarton,
  GiPayMoney,
  GiPodiumWinner,
} from "react-icons/gi";
import { FaSatelliteDish } from "react-icons/fa";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";

export function getIconByBillType(billType, classNames) {
  let iconObj;
  switch (billType) {
    case "Hydro":
      iconObj = <RiLightbulbFlashLine className={classNames} />;
      break;

    case "Gas":
      iconObj = <GiHeatHaze className={classNames} />;
      break;

    case "Internet/TV":
      iconObj = <FaSatelliteDish className={classNames} />;
      break;

    case "Groceries":
      iconObj = <GiMilkCarton className={classNames} />;
      break;

    default:
      iconObj = <GiPayMoney className={classNames} />;
      break;
  }

  return iconObj;
}

export function getIconByAction(actionType, classNames) {
  let iconObj;
  switch (actionType) {
    case "payment":
      iconObj = <GiPayMoney className={classNames} />;
      break;

    case "comment":
      iconObj = <TiMessages className={classNames} />;
      break;

    case "complete":
      iconObj = <GiPodiumWinner className={classNames} />;
      break;

    default:
      iconObj = <GiPayMoney className={classNames} />;
      break;
  }

  return iconObj;
}

function billHasPayments(billItem) {
  return billItem && billItem.payments && billItem.payments.length > 0;
}

export function checkRoomieTransfer(billItem) {
  return billItem && billItem.bill_type === "Roomie Transfer";
}

export function checkRoomieTransferAccepted(billItem) {
  return (
    checkRoomieTransfer(billItem) &&
    billHasPayments(billItem) &&
    billItem.payments[0].accepted
  );
}

export function checkBillFullyPaid(billItem) {
  return billItem && billItem.paid && billItem.paid >= billItem.total_amount;
}

export function checkRtFromMe(billItem, userId) {
  return (
    billItem &&
    checkRoomieTransfer(billItem) &&
    billHasPayments(billItem) &&
    billItem.payments[0].from_user._id === userId
  );
}
