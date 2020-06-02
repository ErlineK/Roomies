import React, { useState, useContext } from "react";
import useInputState from "../../../general/hooks/useInputState";
// import "../../auth/auth.scss";
import HouseAvatar from "./HouseAvatar";
import PopUpCard from "../../GenericComponents/PopUpCard";
import { HouseContext } from "./utils/HouseContext";
import { PROVINCES } from "../../../general/utils/AppParams";

function AddHousePop() {
  const { toggleNewHouse, handleNewHouse } = useContext(HouseContext);

  const [hName, handleHNameChange] = useInputState("");
  const [hDescription, handleHDescriptionChange] = useInputState("");
  const [hStreet, handleHStreetChange] = useInputState("");
  const [hCity, handleHCityChange] = useInputState("");
  const [hProvince, handleHProvinceChange] = useInputState(PROVINCES[0]);
  const [houseAvatar, setHouseAvatar] = useState("");

  const handleAddHouse = () => {
    let house = {
      houseName: hName,
      address: hStreet,
      city: hCity,
      province: hProvince,
      description: hDescription,
      avatar: houseAvatar,
    };

    handleNewHouse(house);

    // axios
    //   .post("http://localhost:3000/users/register", userObject)
    //   .then(res => {
    //     console.log("Registered successfully");
    //     //TODO: redirect to thank you page with second part of registration
    //   })
    //   .catch(error => {
    //     console.log("Registration Error");
    //   });
    toggleNewHouse();
  };

  function validate() {
    let validated = true;

    if (hProvince === undefined || !PROVINCES.includes(hProvince.trim())) {
      validated = false;
    }

    return validated;
  }

  const doSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      handleAddHouse();
      toggleNewHouse();
    }
  };

  return (
    <PopUpCard togglePop={toggleNewHouse}>
      <div>
        <div className="newHouseAvatar">
          <HouseAvatar avatar={houseAvatar} addAvatarToForm={setHouseAvatar} />
        </div>

        <form className="userDataItem houseForm">
          <div className="flex-container flex-between align-base form-group">
            <label htmlFor="hName">House Name</label>
            <input
              id="hName"
              type="text"
              name="hName"
              placeholder="House Name"
              className="form-control"
              value={hName}
              onChange={handleHNameChange}
              required
            />
          </div>

          <div className="flex-container flex-between align-base form-group">
            <label htmlFor="hName">Address</label>
            <input
              id="hStreet"
              type="text"
              name="hStreet"
              placeholder="123 Sesame St."
              className="form-control"
              value={hStreet}
              onChange={handleHStreetChange}
            />
          </div>

          <div className="form-group flex-container">
            <input
              id="hCity"
              type="text"
              name="hCity"
              placeholder="London"
              className="form-control"
              value={hCity}
              onChange={handleHCityChange}
              required
            />
            <select
              id="hProvince"
              className="form-control"
              value={hProvince}
              onChange={handleHProvinceChange}
            >
              {PROVINCES.map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-container flex-between align-base form-group">
            <label htmlFor="hDescription">Description</label>
            <textarea
              id="hDescription"
              type="text"
              rows="3"
              name="hDescription"
              placeholder="House description"
              className="form-control"
              value={hDescription}
              onChange={handleHDescriptionChange}
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-grad-pressed"
              onClick={(e) => doSubmit(e)}
            >
              Add House
            </button>
          </div>
        </form>
      </div>
    </PopUpCard>
  );
}

export default AddHousePop;
