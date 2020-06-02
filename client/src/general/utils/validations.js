import { BILL_TYPES } from "../utils/AppParams";

export function validateVal(value, valueType) {
  let validationErr = undefined;

  switch (valueType) {
    case "EMAIL":
      // check for email pattern
      const mailPtrn = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
      // const mailPtrn = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;

      if (!mailPtrn.test(value)) {
        validationErr = "Invalid email";
      }
      break;

    case "PASS":
      //check for at least 6 digit, no spaces
      if (value.trim().length < 6) {
        validationErr = "Password must be at least 6 characters long";
      }
      // TODO: check for strong password: at least one capital letter, one small latter
      break;

    case "NAME":
      //min 2 chars, max 20
      if (value.trim().length < 2 || value.length > 20) {
        validationErr = "Invalid name";
      }
      break;

    case "PHONE":
      var phonrPtrn = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (!phonrPtrn.test(value)) {
        validationErr = "Invalid phone number";
      }
      break;

    case "B_DATE":
      var valDate = new Date(value);
      var today = new Date(); //current Date
      if (today.getFullYear() - valDate.getFullYear() < 16) {
        validationErr = "Invalid date. User must be at least 16 years old";
      }
      break;

    case "DATE":
      try {
        new Date(value);
      } catch (err) {
        validationErr = "Invalid date";
      }

      break;

    case "INV_NUM":
      if (value.length > 12) {
        validationErr = "Invalid invoice number";
      }
      break;

    case "BILL_TYPE":
      if (!BILL_TYPES.includes(value)) {
        validationErr = "Please select bill type";
      }
      break;

    case "BILL_SUM":
      if (value < 0.1 || value > 1000) {
        validationErr = "Invalid payment amount";
      }
      break;

    default:
      break;
  }

  return validationErr;
}
