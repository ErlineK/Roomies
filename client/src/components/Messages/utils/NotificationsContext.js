import React, { createContext } from "react";
import useNotificationsState from "./useNotificationsState";

export const NotificationsContext = createContext();
export const NtfStatusContext = createContext();
export const NtfActionsContext = createContext();

export function NotificationsProvider(props) {
  const [{ notifications, ntfActions, ntfReqStatus }] = useNotificationsState();

  // console.log("notifications context is called");

  return (
    <NotificationsContext.Provider value={notifications}>
      <NtfStatusContext.Provider value={ntfReqStatus}>
        <NtfActionsContext.Provider
          value={{
            accacceptINV: ntfActions.acceptINV,
            declineINV: ntfActions.declineINV,
            toggleAcceptingINV: ntfActions.toggleAcceptingINV,
          }}
        >
          {props.children}
        </NtfActionsContext.Provider>
      </NtfStatusContext.Provider>
    </NotificationsContext.Provider>
  );
}
