import { useState } from "react";
import { validateVal } from "../utils/validations";

// TODO: rewrite validation function and return an error field

/** Hook manages input state, state change and reset
 */
export default (initialVal, valueType) => {
  const [value, setValue] = useState(initialVal);
  const [errorMsg, setError] = useState("");
  // value change callback
  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  // value reset callback
  const reset = () => {
    setValue("");
  };

  /** form input validation callback
      input:String: EMAIL, PASS 
      output:Boolean
   */
  const validate = () => {
    setError(undefined);
    let valid = true;
    const validationError = validateVal(value, valueType);

    if (validationError && validationError !== "") {
      console.log("setting error");
      valid = false;
      setError(validationError);
    }

    return valid;
  };

  return [value, handleChange, validate, errorMsg, reset];
};
