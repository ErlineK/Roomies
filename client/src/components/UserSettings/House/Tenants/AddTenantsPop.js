import React, { useContext, useState } from "react";
import useInputState from "../../../../general/hooks/useInputState";
import "../../../auth/auth.scss";
import PopUpCard from "../../../GenericComponents/PopUpCard";
import { HouseContext } from "../utils/HouseContext";

function AddTenantsPop() {
  const { toggleAddTenants, handleNewTenant } = useContext(HouseContext);
  const [error, setError] = useState();

  const [name, handleNameChange] = useInputState("");
  const [email, handleEmailChange, validateEmail, emailError] = useInputState(
    "",
    "EMAIL"
  );

  const handleAddTenant = () => {
    console.log("saving tenant");

    // TODO: add loader

    const tenantError = handleNewTenant(email, name);
    if (tenantError && tenantError !== "") {
      // TODO: handle error
      setError(tenantError);
    }
    // else {
    //   toggleAddTenants();
    // }
  };

  //   Validate name exist and not empty
  function validate() {
    let validated = true;

    if (name === undefined || name.trim() === "" || name.length < 2) {
      validated = false;
    }

    if (validated) {
      validated = validateEmail();
    }

    return validated;
  }

  const doSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      handleAddTenant();
      toggleAddTenants();
    } else {
      setError("Invalid data.\n" + emailError);
    }
  };

  return (
    <PopUpCard togglePop={toggleAddTenants}>
      <div>
        {error && <div className="alert-danger">{error}</div>}
        <p className="form-text">
          To invite a tenant, please enter their name and email.
        </p>
        <small className="form-text">
          Please note - only registered Roomies will be able to recieve an
          invitation.
        </small>
        <hr></hr>

        <form className="userDataItem houseForm">
          <div className="flex-container flex-between align-base form-group">
            <label htmlFor="name">Tenant Name</label>
            <input
              id="name"
              type="text"
              name="hNnameame"
              placeholder="Example: Chuck Norris"
              className="form-control"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div className="flex-container flex-between align-base form-group">
            <label htmlFor="email">Tenant Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Example: gmail@allmighty.com"
              className="form-control"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-grad-pressed"
              onClick={(e) => doSubmit(e)}
            >
              Invite Tenant
            </button>
          </div>
        </form>
      </div>
    </PopUpCard>
  );
}

export default AddTenantsPop;
