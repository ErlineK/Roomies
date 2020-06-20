import React, { useContext } from "react";
import "../Bills/bills.scss";
import "./chores.scss";
import { getIcon } from "../../general/utils/iconManager";
import AddChorePop from "./AddChorePop";
import CardWithLoader from "../GenericComponents/CardWithLoader";
import { ChoresContext, ChoresActionsContext } from "./utils/ChoresContext";
import ChoreItem from "./ChoreItem";
import { HouseContext } from "../UserSettings/House/utils/HouseContext";
import useInputState from "../../general/hooks/useInputState";
import { AuthContext } from "../auth/utils/AuthContext";

export default function Chores() {
  const { userId } = useContext(AuthContext);
  const chores = useContext(ChoresContext);
  const { getActiveTenants } = useContext(HouseContext);
  const { requestStatus, choresActions } = useContext(ChoresActionsContext);
  const [choreLeader, handleChoreLeaderChange] = useInputState("select", "ALL");

  const ROOMIES = getActiveTenants();

  console.log("choreLeader is: " + choreLeader);

  const choreLeaderOptions = ROOMIES.map((roomie) => (
    <option key={roomie._id} value={roomie.name}>
      {roomie._id === userId() ? "Me" : roomie.name}
    </option>
  ));

  console.log("choreLeaderOptions: ");
  console.log(choreLeaderOptions);

  // filter bills by bill type
  const filteredChores =
    choreLeader === "all" || choreLeader === "select"
      ? chores
      : chores.filter((chore) => chore.leader.name === choreLeader);

  // disply incomplete chores first by due date
  const choreItems = filteredChores
    ? filteredChores
        .sort((ch) => !ch.complete)
        .sort((a, b) => {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        })
        // .reverse()
        .map((chore) => <ChoreItem key={chore._id} item={chore} />)
    : "";

  return (
    <CardWithLoader loading={requestStatus.isLoading}>
      <h3>Chores</h3>

      <div className="billsHolder flex-container flex-between flex-center-vertical">
        <select
          className="form-control filterSelect"
          id="choreLeader"
          onChange={handleChoreLeaderChange}
          value={choreLeader}
        >
          <option value="select" disabled>
            Filter Chores by Roomie...
          </option>
          <option value="all">All</option>
          {choreLeaderOptions}
        </select>

        {getIcon("addFile", "Add new chore", "ic ic_lg ic_roomies", () =>
          choresActions.toggleAddChore()
        )}
      </div>
      <div className="billsHolder listContainer">{choreItems}</div>
      {choresActions.showAddChore && <AddChorePop />}
    </CardWithLoader>
  );
}
