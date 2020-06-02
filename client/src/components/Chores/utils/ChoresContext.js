import React, { createContext } from "react";
import useChoresState from "./useChoresState";

export const ChoresContext = createContext();
export const ChoresActionsContext = createContext();

export function ChoresProvider(props) {
  const [{ data, choresActions, requestStatus }] = useChoresState();

  return (
    <ChoresContext.Provider value={data ? data.chores : data}>
      <ChoresActionsContext.Provider
        value={{
          choresActions,
          requestStatus,
        }}
      >
        {props.children}
      </ChoresActionsContext.Provider>
    </ChoresContext.Provider>
  );
}
