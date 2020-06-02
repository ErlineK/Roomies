import React, { memo, useContext } from "react";
import HomeFragment from "../Home/UserHome/HomeFragment";
import HomeChoreItem from "./HomeChoreItem";
import { ChoresContext, ChoresActionsContext } from "./utils/ChoresContext";

// TODO: get USER'S last 5 chores by due date

function HomeChores() {
  const chores = useContext(ChoresContext);
  const { requestStatus } = useContext(ChoresActionsContext);

  const choreItems =
    chores !== undefined && Object.entries(chores).length > 0
      ? chores.map((chore) => (
          <div key={`holder${chore._id}`}>
            <HomeChoreItem item={chore} />
          </div>
        ))
      : "";

  return (
    <div className="homeItem">
      <div className="card ">
        <HomeFragment
          isLoading={requestStatus.isLoading}
          isError={requestStatus.isError}
          noData={chores === undefined || Object.entries(chores).length < 1}
          title={"Your Chores"}
          itemsName={"chores"}
          linkTitle={"All chores"}
          linkPath={"Chores"}
        >
          <div className="listContainer">{choreItems}</div>
        </HomeFragment>
      </div>
    </div>
  );
}

export default memo(HomeChores);
