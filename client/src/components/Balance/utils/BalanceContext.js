import React, { createContext } from "react";
import useBalanceState from "./useBalanceState";

export const BalanceContext = createContext();
export const BalanceActionsContext = createContext();

export function BalanceProvider(props) {
  const [{ balance, requestStatus, balanceActions }] = useBalanceState();

  return (
    <BalanceContext.Provider value={{ balance, requestStatus }}>
      <BalanceActionsContext.Provider value={balanceActions}>
        {props.children}
      </BalanceActionsContext.Provider>
    </BalanceContext.Provider>
  );
}
