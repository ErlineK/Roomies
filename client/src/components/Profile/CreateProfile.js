import React, { useState, useContext } from "react";
import useInputState from "../../general/hooks/useInputState";
import { Link, useHistory } from "react-router-dom";
import "./profile.scss";
import { AuthContext } from "../auth/utils/AuthContext";
import { MdArrowForward } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "../../general/utils/AppParams";
import UserAvatarSettings from "./UserAvatarSettings";
import CircleLoader from "../GenericComponents/Loader/CircleLoader";

// TODO: add loader

export default function CreateProfile() {
  const { user, requestHeader } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [srvError, setSrvError] = useState();
  const [
    phone,
    handlePhoneChange,
    validatePhone,
    phoneErr,
    resetPhone,
  ] = useInputState("", "PHONE");
  const [
    brthDate,
    handleBDayChange,
    validateBDay,
    bDateErr,
    resetBDate,
  ] = useInputState("", "B_DATE");
  // const [avatar, handleAvatarChange] = useState(user.avatar);

  const history = useHistory();

  const doSubmit = (event) => {
    event.preventDefault();
    // Validate
    if (
      (phone === "" || validatePhone()) &&
      (brthDate === "" || validateBDay())
    ) {
      handleCreateProfile();
    }
  };

  const handleCreateProfile = () => {
    setLoading(true);

    // TODO: upload avatar

    axios
      .put(
        `${BASE_URL}/users/profile`,
        { phone, birth_date: brthDate },
        requestHeader
      )
      .then((res) => {
        console.log("Profile updated successfully");
        console.log(res);

        resetPhone();
        resetBDate();

        // redirect home
        history.push("/UserHome");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data.error);
        setSrvError(error.response.data.error);
      });
  };

  const serverError = srvError ? (
    <div className="alert alert-danger" role="alert">
      {srvError}
    </div>
  ) : (
    ""
  );

  return (
    <div>
      <div className="homeContainer">
        <div className="from-container">
          <h4 className="textLight">{`Hi! ${user.name}! Welcome home`}</h4>
          <p className="textLight">
            {" "}
            Would you like share few details with your roomies?
          </p>

          <form className="card" onSubmit={doSubmit}>
            {serverError}
            <Link className="secondary-link toRight actionBtn" to="/UserHome">
              skip
              <MdArrowForward className="back-icon" />
            </Link>
            <div className="avatarContainer">
              <UserAvatarSettings />
            </div>

            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="phone"
              name="phone"
              placeholder="Phone"
              className="form-control"
              value={phone}
              onChange={handlePhoneChange}
            />
            <div className="invalid-feedback">{phoneErr}</div>

            <label htmlFor="email">Birthday</label>
            <input
              id="brthDate"
              type="date"
              name="brthDate"
              placeholder="Birthday"
              className="form-control"
              value={brthDate}
              onChange={handleBDayChange}
            />
            <div className="invalid-feedback">{bDateErr}</div>

            {isLoading ? (
              <CircleLoader />
            ) : (
              <button type="submit" className="btn btn-grad-pressed">
                Save
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
