import React, { useState, useContext } from "react";
import "./profile.scss";
import "../auth/auth.scss";
import EditableDataItem from "../GenericComponents/EditableDataItem/EditableDataItem";
import { formatInputDate } from "../../general/utils/formatHelper";
import UserAvatarSettings from "./UserAvatarSettings";
import { AuthContext } from "../auth/utils/AuthContext";

export default function SettingsProfile() {
  const { user } = useContext(AuthContext);

  const [name, handleNameChange] = useState(user ? user.name : "");
  const [brthDate, handleBDayChange] = useState(user ? user.brthDate : "");
  const [phone, handlePhoneChange] = useState(user ? user.phone : "");
  const [avatar, handleAvatarChange] = useState(user ? user.user_avatar : "");

  const saveUpdate = (itemTitle, newVal) => {
    switch (itemTitle) {
      case "Name":
        handleNameChange(newVal);
        break;

      case "Birth Date":
        let newDate = new Date(newVal);
        // add a day
        newDate.setDate(newDate.getDate() + 1);
        handleBDayChange(newDate);
        break;

      case "Phone":
        handlePhoneChange(newVal);
        break;

      case "avatar":
        handleAvatarChange(newVal);
        break;

      default:
        break;
    }
    // TODO: send user profile change to db
  };

  return (
    <div className="userDataHolder">
      <h3>Profile</h3>

      <div className="flex-container flex-center flex-columns-holder from-container ">
        <div className="avatarContainer">
          <UserAvatarSettings avatar={avatar} />
        </div>

        <div className="flex-container flex-fill data-section">
          <EditableDataItem
            item={{
              title: "Name",
              data: name,
              icon: "name",
              type: "text",
            }}
            handleUpdate={saveUpdate}
          />
          <EditableDataItem
            item={{
              title: "Email",
              data: user ? user.email : "",
              icon: "email",
            }}
          />
        </div>
        <div className="flex-container flex-fill data-section">
          <EditableDataItem
            item={{
              title: "Birth Date",
              data: formatInputDate(brthDate),
              icon: "bday",
              type: "date",
            }}
            handleUpdate={saveUpdate}
          />
          <EditableDataItem
            item={{
              title: "Phone",
              data: phone,
              icon: "phone",
              type: "phone",
            }}
            handleUpdate={saveUpdate}
          />
        </div>
      </div>
    </div>
  );
}
