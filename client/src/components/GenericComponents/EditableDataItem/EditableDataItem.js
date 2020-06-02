import React from "react";
import "./editableDataItem.scss";
import "../../../general/ui/icons.scss";
import useInputState from "../../../general/hooks/useInputState";
import { getIcon } from "../../../general/utils/iconManager";
import { formatInputDate } from "../../../general/utils/formatHelper";
import useToggle from "../../../general/hooks/useToggle";

export default function EditableDataItem({ item, handleUpdate, parentObjId }) {
  const [editMode, toggleEdit] = useToggle(false);
  const [data, handleDataChange] = useInputState(item.data);

  const updateItem = (e) => {
    e.preventDefault();

    const edtObj = {};
    edtObj[item.dbName] = data;

    handleUpdate(edtObj, parentObjId);
    toggleEdit();
  };

  return (
    <>
      {editMode && handleUpdate ? (
        <div className="editableDataItem">
          <div className="flex-container flex-between flex-center-vertical">
            <label htmlFor={item.title}>{item.title}</label>
            <div className="toRight flex-container">
              {getIcon(
                "acceptUser",
                "Update user",
                "ic ic_lg ic_success",
                (e) => updateItem(e)
              )}
              {getIcon(
                "declineUser",
                "Cancel",
                "ic ic_lg ic_alert active",
                (e) => toggleEdit()
              )}
            </div>
          </div>
          <input
            id={item.title}
            type={item.type}
            name={item.title}
            placeholder={item.title}
            className="form-control"
            value={item.type === "date" ? formatInputDate(data) : data}
            onChange={handleDataChange}
            required
          />
        </div>
      ) : (
        <div className="editableDataItem">
          <div className="flex-container flex-between">
            <div className="flex-container flex-center-vertical">
              {getIcon(item.icon, undefined, "ic ic_lg ic_decore")}
              <p className="item itemTitle">
                {item.title}
                {item.title && ":"}
              </p>
              <span style={{ marginRight: "-0.4rem" }}>{item.specialChar}</span>
              <p className=" item itemData">{item.data}</p>
            </div>
            <div className="toRight">
              {handleUpdate
                ? getIcon(
                    "editUser",
                    "Edit",
                    "ic ic_lg ic_hidden ic_roomies ic_action",
                    () => toggleEdit()
                  )
                : ""}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
