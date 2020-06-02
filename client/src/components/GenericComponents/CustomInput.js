import React from "react";

export default function CustomInput({
  itemId,
  value,
  label,
  type,
  handleOnChange,
  errorMsg,
  placeHolder,
  specialChar,
}) {
  return (
    <div className="flex-container flex-between flex-center-vertical form-group ">
      <label htmlFor={itemId}>{label}</label>
      <div className="flex-container data-section">
        <div className="flex-container">
          <span style={{ marginTop: "0.75rem" }}>{specialChar}</span>
          <input
            className="form-control"
            id={itemId}
            type={type}
            name={itemId}
            placeholder={placeHolder}
            value={value}
            onChange={handleOnChange}
          />
        </div>
        <small className="form-alert">{errorMsg}</small>
      </div>
    </div>
  );
}
