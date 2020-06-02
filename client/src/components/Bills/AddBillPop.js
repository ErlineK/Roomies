import React, { useContext, useState } from "react";
import useInputState from "../../general/hooks/useInputState";
// import "../auth/auth.scss";
import "../../general/ui/forms.scss";
import PopUpCard from "../GenericComponents/PopUpCard";
import { BillsContext } from "./utils/BillsContext";
import { BILL_TYPES } from "../../general/utils/AppParams";
import CircleLoader from "../GenericComponents/Loader/CircleLoader";
import { formatInputDate } from "../../general/utils/formatHelper";
import CustomInput from "../GenericComponents/CustomInput";
import { HouseContext } from "../UserSettings/House/utils/HouseContext";
import { AuthContext } from "../auth/utils/AuthContext";

function AddBillPop() {
  const { toggleAddBill, billActs, requestStatus } = useContext(BillsContext);
  const { getActiveTenants } = useContext(HouseContext);
  const { userId } = useContext(AuthContext);
  const [error, setError] = useState();

  const [
    invNum,
    handleInvNumChange,
    validateInvNum,
    invNumError,
  ] = useInputState("", "INV_NUM");
  const [
    billType,
    handleBillTypeChange,
    validateBillType,
    billTypeError,
  ] = useInputState("select", "BILL_TYPE");
  const [
    dueDate,
    handleDueDateChange,
    validateDueDate,
    dueDateError,
  ] = useInputState(formatInputDate(new Date()), "DATE");

  const [
    strDate,
    handleStrDateChange,
    validateStrDate,
    strDateError,
  ] = useInputState("", "DATE");

  const [
    endDate,
    handleEndDateChange,
    validateEndDate,
    endDateError,
  ] = useInputState("", "DATE");

  const [
    totalSum,
    handleTotalSumChange,
    validateTotalSum,
    totalSumError,
  ] = useInputState("", "BILL_SUM");

  const [
    paidTo,
    handlePaidToChange,
    validatePaidTo,
    paidToError,
  ] = useInputState("select", "");

  const [billComment, handleBillCommentChange] = useInputState("", "COMMENT");

  const isRoomiesTransfer = billType === "Roomie Transfer";

  // const [billImages, setBillImages] = useState();

  const handleAddBill = () => {
    const bill = {
      invoice_num: invNum,
      bill_type: billType,
      start_date: strDate,
      end_date: endDate,
      total_amount: totalSum,
      due_date: dueDate,
      comment: billComment,
      to_user: isRoomieTransfer ? getPaidToId() : undefined,
      // bill_images: billImages
    };

    billActs.addBill(bill);
  };

  //   Validate name exist and not empty
  function validate() {
    let validated = false;
    setError(undefined);

    if (
      validateBillType() &&
      validateInvNum() &&
      validateStrDate() &&
      validateEndDate() &&
      validateDueDate() &&
      validateTotalSum()
    ) {
      validated = true;

      // create tenant names list to check 'paid_to' field
      const tenantNamesList =
        isRoomieTransfer && houseTenants
          ? houseTenants.map((tenant) => tenant.name)
          : "";

      if (isRoomieTransfer && !tenantNamesList.includes(paidTo)) {
        validated = false;
        setError("Please select a valid payment recipient");
      } else if (endDate < strDate) {
        validated = false;
        setError("Invalid billing period");
      }
    }

    return validated;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      handleAddBill();
    } else {
      // setError("Invalid data.\n");
    }
  };

  const isRoomieTransfer = billType === "Roomie Transfer";

  const houseTenants = getActiveTenants();

  // get id of the selected roomie for paidTo
  function getPaidToId() {
    const recepient = houseTenants.filter((tenant) => tenant.name === paidTo);
    return recepient[0]._id;
  }

  // get only other roomies
  const roomieOptions = houseTenants
    .filter((tenant) => tenant._id !== userId())
    .map((roomie) => (
      <option key={roomie.name} value={roomie.name}>
        {roomie.name}
      </option>
    ));

  // create paidTo options from roomies list
  const billTypeOptions = BILL_TYPES.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  return (
    <PopUpCard togglePop={toggleAddBill}>
      <div>
        <h4 className="section-title">
          Add {isRoomiesTransfer ? "Payment" : "Bill"}
        </h4>

        {requestStatus.isError ||
          (error && <div className="alert alert-danger">{error}</div>)}

        <div className="flex-container flex-between form-group userDataItem">
          <select
            className="form-control"
            id="billType"
            onChange={handleBillTypeChange}
            value={billType}
          >
            <option value="select" disabled>
              Select Bill Type...
            </option>
            {billTypeOptions}
          </select>
          <small className="form-alert">{billTypeError}</small>
        </div>

        {isRoomieTransfer ? (
          <div className="flex-container flex-between form-group userDataItem">
            <select
              className="form-control"
              id="pay_to"
              onChange={handlePaidToChange}
              value={paidTo}
            >
              <option value="select" disabled>
                {roomieOptions && roomieOptions.length > 0
                  ? "Select Roomie..."
                  : "Sorry! No roomies to select"}
              </option>
              {roomieOptions}
            </select>
            <small className="form-alert">{paidToError}</small>
          </div>
        ) : (
          ""
        )}

        <form className="userDataItem houseForm">
          <div className="flex-container flex-between form-group">
            <label htmlFor="inv_num">
              {isRoomiesTransfer ? "Reference #" : "Invoice #"}
            </label>
            <input
              id="inv_num"
              type="text"
              maxLength="12"
              name="inv_num"
              placeholder="Example: 123456"
              className="form-control"
              value={invNum}
              onChange={handleInvNumChange}
            />
            <small className="form-alert">{invNumError}</small>
          </div>
          {!isRoomiesTransfer && (
            <div className="flex-container flex-between">
              <label htmlFor="billingPeriod">Billing Period</label>
              <div className="flex-container flex-between">
                <div
                  id="billingPeriod"
                  className="flex-container flex-between form-group"
                  style={{ maxWidth: "47%" }}
                >
                  <input
                    id="strDate"
                    type="date"
                    name="strDate"
                    className="form-control"
                    value={strDate}
                    onChange={handleStrDateChange}
                  />
                  <small className="form-alert">{strDateError}</small>
                </div>
                <span style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }}>
                  -
                </span>
                <div
                  className="flex-container flex-between form-group"
                  style={{ maxWidth: "47%" }}
                >
                  <input
                    id="endDate"
                    type="date"
                    name="endDate"
                    className="form-control"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                  <small className="form-alert">{endDateError}</small>
                </div>
              </div>
            </div>
          )}

          <div className="flex-container">
            <CustomInput
              itemId={"totalSum"}
              value={totalSum}
              label={isRoomiesTransfer ? "Total paid" : "Total to pay"}
              type={"number"}
              handleOnChange={handleTotalSumChange}
              errorMsg={totalSumError}
              placeHolder={"Example: 20.00"}
              specialChar={"$"}
            />

            <CustomInput
              itemId={"dueDate"}
              value={dueDate}
              label={isRoomiesTransfer ? "Payment Date" : "Pay before"}
              type={"date"}
              handleOnChange={handleDueDateChange}
              errorMsg={dueDateError}
            />
          </div>

          <div className="flex-container flex-between form-group">
            <label htmlFor="billComment">Comment</label>
            <input
              id="billComment"
              type="text"
              rows="3"
              name="billComment"
              placeholder="Comment..."
              className="form-control"
              value={billComment}
              onChange={handleBillCommentChange}
            />
          </div>

          {/* <div className="flex-container flex-between form-group">
            <label htmlFor="billComment" className="disabled">
              Bill Invoice
            </label>
            Upload bill images...
            <small className="form-text text-muted">(comming soon)</small>
            <div className="invalid-feedback">{totalSumError}</div>
          </div> */}

          <div className="form-group">
            {requestStatus.isLoading ? (
              <CircleLoader />
            ) : (
              <button
                type="submit"
                className="btn btn-grad-pressed"
                onClick={(e) => handleSubmit(e)}
              >
                Add {isRoomiesTransfer ? "Payment" : "Bill"}
              </button>
            )}
          </div>
        </form>
      </div>
    </PopUpCard>
  );
}

export default AddBillPop;
