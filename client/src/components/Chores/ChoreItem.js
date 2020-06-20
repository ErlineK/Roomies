import React, { useContext } from "react";
import "../Home/UserHome/homeLists.scss";
import {
  formatDateOnly,
  formatDayMonth,
} from "../../general/utils/formatHelper";
import { getBackgroundByDue } from "../GenericComponents/listsHelper";
import { getIcon } from "../../general/utils/iconManager";
import { ChoresActionsContext } from "./utils/ChoresContext";
import { AuthContext } from "../auth/utils/AuthContext";

function ChoreItem({ item }) {
  const { userId } = useContext(AuthContext);
  const { choresActions } = useContext(ChoresActionsContext);

  const handleRemoveChore = (e) => {
    e.preventDefault();

    // prompt for confiramtion
    window.confirm("Are you sure you want to delete this item?") &&
      choresActions.removeChore(item._id);
  };

  const leaderName = item.leader
    ? item.leader._id === userId()
      ? "Me"
      : item.leader.name
    : "";

  return (
    <div
      className={`${
        !item.complete && getBackgroundByDue(item.dueDate)
      } listItemHolder billItem`}
    >
      <div className="listFlexHolder">
        <div
          className={`glowIndicator ic_list_item ${
            item.complete ? "indicatorActive" : ""
          } `}
          onClick={() => choresActions.toggleChore(item._id, item.complete)}
        ></div>
        <div className="choresGrid">
          <div
            className="gridItem "
            onClick={() => {
              console.log("clicked on chore");
              choresActions.toggleChore(item._id, item.complete);
            }}
          >
            <p className={item.complete ? " completeItemText" : ""}>
              {item.task}
            </p>
          </div>
          <div className="gridItem gridSecondRow">
            <div className="flex-container data-section">
              <p className="textLight">{leaderName}</p>
            </div>
          </div>
          <div className="gridItem">
            <div className="flex-container data-section">
              <p className="description textLight txr">
                {formatDateOnly(item.dueDate)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-container billsIconsHolder">
          {getIcon(
            "delete",
            "Delete item",
            `${
              item.updated_by === userId ? "ic_placeholder" : ""
            } billActionIcon ic_lg ic_alert`,
            (e) => handleRemoveChore(e)
          )}
        </div>
      </div>

      <hr></hr>
    </div>
  );
}

export default ChoreItem;
