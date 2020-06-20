import React, { useContext, useState } from "react";
import useInputState from "../../general/hooks/useInputState";
import "../../general/ui/forms.scss";
import PopUpCard from "../GenericComponents/PopUpCard";
import CircleLoader from "../GenericComponents/Loader/CircleLoader";
import { formatInputDate } from "../../general/utils/formatHelper";
import CustomInput from "../GenericComponents/CustomInput";
import { HouseContext } from "../UserSettings/House/utils/HouseContext";
import { AuthContext } from "../auth/utils/AuthContext";
import { ChoresActionsContext } from "./utils/ChoresContext";

function AddChorePop() {
  const { choresActions, requestStatus } = useContext(ChoresActionsContext);
  const { getActiveTenants } = useContext(HouseContext);
  const { userId } = useContext(AuthContext);
  const [error, setError] = useState();

  const ROOMIES = getActiveTenants();

  const [task, handleTaskChange, validateTask, taskError] = useInputState(
    "",
    "TXT_INPUT"
  );

  const [
    dueDate,
    handleDueDateChange,
    validateDueDate,
    dueDateError,
  ] = useInputState(formatInputDate(new Date()), "DATE");

  const [
    leader,
    handleLeaderChange,
    validateLeader,
    leaderError,
  ] = useInputState("select", "");

  // ovveride leader validation
  const doValidateLeader = () => {
    var validLeader = true;
    const tenantNamesList = ROOMIES ? ROOMIES.map((tenant) => tenant.name) : "";
    if (!tenantNamesList.includes(leader)) {
      validLeader = false;
      setError("Please select a valid chore leader");
    }
    return validLeader;
  };

  const handleAddChore = () => {
    const chore = {
      task,
      dueDate,
      leader: getLeaderId(leader),
    };

    choresActions.addChore(chore);
  };

  //   Validate name exist and not empty
  function validate() {
    let validated = false;
    setError(undefined);

    validated = validateTask() && validateDueDate() && doValidateLeader();

    return validated;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      handleAddChore();
    } else {
      // setError("Invalid data.\n");
    }
  };

  // get id of the selected roomie for leader
  function getLeaderId() {
    if (leader === "me") {
      return userId;
    } else {
      const recepient = ROOMIES
        ? ROOMIES.filter((tenant) => tenant.name === leader)
        : [];
      return recepient[0]._id;
    }
  }

  // get roomies names
  const roomieOptions = ROOMIES.map((roomie) => (
    <option key={roomie.name} value={roomie.name}>
      {roomie._id === userId() ? "Me" : roomie.name}
    </option>
  ));

  return (
    <PopUpCard togglePop={choresActions.toggleAddChore}>
      <div>
        <h4 className="section-title">Add New Chore</h4>

        {requestStatus.isError ||
          (error && <div className="alert alert-danger">{error}</div>)}

        <div>
          <form className="addPopupForm">
            <CustomInput
              itemId={"task"}
              value={task}
              label={"Chore"}
              type={"text"}
              handleOnChange={handleTaskChange}
              errorMsg={taskError}
              placeHolder={"Example: Save the world"}
            />

            <CustomInput
              itemId={"dueDate"}
              value={dueDate}
              label={"Chore due"}
              type={"date"}
              handleOnChange={handleDueDateChange}
              errorMsg={dueDateError}
            />

            <div className="flex-container flex-between flex-center-vertical form-group ">
              <label htmlFor={"leader"}>Leader</label>
              <div className="flex-container data-section">
                <div className="flex-container">
                  <span style={{ marginTop: "0.75rem" }}></span>
                  <select
                    className="form-control"
                    id="leader"
                    onChange={handleLeaderChange}
                    value={leader}
                  >
                    <option value="select" disabled>
                      {roomieOptions && roomieOptions.length > 0
                        ? "Select Roomie..."
                        : "Sorry! No roomies to select"}
                    </option>
                    {roomieOptions}
                  </select>
                </div>
                <small className="form-alert">{leaderError}</small>
              </div>
            </div>

            <div className="form-group">
              {requestStatus.isLoading ? (
                <CircleLoader />
              ) : (
                <button
                  type="submit"
                  className="btn btn-grad-pressed"
                  onClick={(e) => handleSubmit(e)}
                >
                  Add Chore
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </PopUpCard>
  );
}

export default AddChorePop;
