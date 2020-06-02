import { useState } from "react";

function useToggle(initialVal = false) {
  const [value, setValue] = useState(initialVal);

  const toggle = () => {
    setValue(!value);
  };
  return [value, toggle];
}

export default useToggle;
