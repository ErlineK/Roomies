import React from "react";
import {
  FaAt,
  FaUser,
  FaPhone,
  FaBirthdayCake,
  FaEdit,
  FaEye,
  FaUserPlus,
  FaMinusCircle,
  FaCheck,
  FaUserEdit,
  FaUserCheck,
  FaUserTimes,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { GoPlus, GoCalendar, GoMegaphone } from "react-icons/go";
// import { GrDocumentTime } from "react-icons/gr";
import { TiMessages } from "react-icons/ti";
import { MdReplyAll, MdArrowBack } from "react-icons/md";
import { AiFillFileAdd } from "react-icons/ai";
import { RiTimerFlashLine } from "react-icons/ri";
import { GiTakeMyMoney, GiKeyring } from "react-icons/gi";

function getIcon(iconName, iconTitle, classNames, onIconClick) {
  let iconObj;
  switch (iconName) {
    case "email":
      iconObj = (
        <FaAt title={iconTitle} className={classNames} onClick={onIconClick} />
      );
      break;

    case "name":
      iconObj = (
        <FaUser
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "user":
      iconObj = (
        <FaUser
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "phone":
      iconObj = (
        <FaPhone
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "bday":
      iconObj = (
        <FaBirthdayCake
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "add":
      iconObj = (
        <GoPlus
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "addFile":
      iconObj = (
        <AiFillFileAdd
          title={iconTitle}
          className={classNames}
          style={{ fontSize: "1.75rem" }}
          onClick={onIconClick}
        />
      );
      break;

    case "addUser":
      iconObj = (
        <FaUserPlus
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "editUser":
      iconObj = (
        <FaUserEdit
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "acceptUser":
      iconObj = (
        <FaUserCheck
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "declineUser":
      iconObj = (
        <FaUserTimes
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "edit":
      iconObj = (
        <FaEdit
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "reply":
      iconObj = (
        <MdReplyAll
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "watch":
      iconObj = (
        <FaEye title={iconTitle} className={classNames} onClick={onIconClick} />
      );
      break;

    case "accept":
      iconObj = (
        <FaCheck
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "decline":
      iconObj = (
        <FaMinusCircle
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "delete":
      iconObj = (
        <IoMdClose
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "messages":
      iconObj = (
        <TiMessages
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "inv_amount":
      iconObj = (
        <FaFileInvoiceDollar
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "welcome_home":
      iconObj = (
        <GiKeyring
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "doc_period":
      iconObj = (
        <GoCalendar
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      // iconObj = <GrDocumentTime className={classNames} onClick={onIconClick} />;
      break;

    case "pay_due":
      iconObj = (
        <RiTimerFlashLine
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "paiment":
      iconObj = (
        <GiTakeMyMoney
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    case "btnBack":
      iconObj = (
        <MdArrowBack
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    /* Notification icons */
    case "notificationMsg":
      iconObj = (
        <GoMegaphone
          title={iconTitle}
          className={classNames}
          onClick={onIconClick}
        />
      );
      break;

    default:
      break;
  }

  return iconObj;
}

export { getIcon };
