import React from "react";
import { FaUserCog, FaBell } from "react-icons/fa";
import { AiOutlineLogout, AiFillWechat } from "react-icons/ai";
import {
  GiTakeMyMoney,
  GiVacuumCleaner,
  GiMushroomHouse,
  // GiSpookyHouse,
  GiMilkCarton
} from "react-icons/gi";

function getNavIconByName(iconName, classNames) {
  let iconObj;
  switch (iconName) {
    case "userCog":
      iconObj = <FaUserCog className={classNames} />;
      break;

    case "notifications":
      iconObj = <FaBell className={classNames} />;
      break;

    case "logout":
      iconObj = <AiOutlineLogout className={classNames} />;
      break;

    case "home":
      iconObj = <GiMushroomHouse className={classNames} />;
      break;

    case "bills":
      iconObj = <GiTakeMyMoney className={classNames} />;
      break;

    case "chores":
      iconObj = <GiVacuumCleaner className={classNames} />;
      break;

    case "household":
      iconObj = <GiMilkCarton className={classNames} />;
      break;

    case "chat":
      iconObj = <AiFillWechat className={classNames} />;
      break;

    default:
      break;
  }

  return iconObj;
}

export { getNavIconByName };
