import React, { useState, useContext } from "react";
import useInputState from "../../general/hooks/useInputState";
import "./auth.scss";
import { Link, useHistory } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { AuthContext } from "../auth/utils/AuthContext";
import { BASE_URL } from "../../general/utils/AppParams";
import CircleLoader from "../GenericComponents/Loader/CircleLoader";
import axios from "axios";

function Registration() {
  const history = useHistory();
  const { loginUser } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [srvError, setSrvError] = useState();
  const [name, handleNameChange, validateName, nameError] = useInputState(
    "",
    "NAME"
  );
  const [email, handleEmailChange, validateEmail, emailError] = useInputState(
    "",
    "EMAIL"
  );
  const [password, handlePassChange, validatePass, passError] = useInputState(
    "",
    "PASS"
  );
  const [passConfirm, handlePassConfirmChange] = useInputState("", "PASS");
  const [passConfirmError, setPassConfirmError] = useState("");

  const handleRegistration = () => {
    setLoading(true);
    setSrvError(undefined);

    axios
      .post(`${BASE_URL}/users`, { name, email, password })
      .then((res) => {
        console.log("Registered successfully");
        console.log(res);
        //  save user and token to context
        loginUser(res.data.user, res.data.token);

        // redirect home
        history.push("/CreateProfile");
      })
      .catch((error) => {
        setLoading(false);
        console.log("Registration Error: ");
        console.log(error.response.data.error);
        setSrvError(error.response.data.error);
      });
  };

  const validated = () => {
    let valid = true;
    valid = validateName();
    if (!valid) {
      console.log("name validation fail");
    } else {
      valid = validateEmail();
      if (!valid) {
        console.log("email validation fail");
      } else {
        valid = validatePass();
        if (!valid) {
          console.log("passwors validation fail");
        } else if (password !== passConfirm) {
          valid = false;
          if (!valid) {
            console.log("pass confirm validation fail");
            setPassConfirmError("Passwords do not match");
          }
        }
      }
    }

    return valid;
  };

  const serverError = srvError ? (
    <div className="alert alert-danger" role="alert">
      {srvError}
    </div>
  ) : (
    ""
  );

  const doSubmit = (event) => {
    //This will handle the form data
    console.log("register form submit");
    event.preventDefault();

    /** TODO: Consider adding validation to input state hook */
    if (validated()) {
      handleRegistration();
    } else {
      console.log("validation fail");
    }
  };

  return (
    <div className="homeContainer guestBackground">
      <div className="from-container">
        <Link className="secondary-link toLeft" to="/">
          <MdArrowBack className="back-icon" /> back
        </Link>

        <form className="card" onSubmit={doSubmit}>
          {serverError}
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            className="form-control"
            value={name}
            onChange={handleNameChange}
            required
          />
          <div className="invalid-feedback">{nameError}</div>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <div className="invalid-feedback">{emailError}</div>

          <label htmlFor="pass">Password</label>
          <input
            id="pass"
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            value={password}
            onChange={handlePassChange}
            required
          />

          <input
            type="password"
            name="password_confirm"
            placeholder="Confirm Password"
            className="form-control input-margin"
            value={passConfirm}
            onChange={handlePassConfirmChange}
            required
          />
          <div className="invalid-feedback">
            {passError ? passError : ""}
            {passConfirmError ? passConfirmError : ""}
          </div>

          {isLoading ? (
            <CircleLoader />
          ) : (
            <button type="submit" className="btn btn-grad-pressed">
              Register
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Registration;
