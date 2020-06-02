import React from "react";
import "./profile.scss";
import { getIcon } from "../../general/utils/iconManager";
import CircleLoader from "../GenericComponents/Loader/CircleLoader";
import useImageUploadState from "../../general/hooks/useImageUploadState";

// TODO: handle error message

export default function UserAvatarSettings({ avatar }) {
  const [
    { displayImg, isLoading, readyToUpload },
    handleSaveImage,
    handleDismissImage,
    handleImageUpload,
  ] = useImageUploadState(avatar, "USER");

  const uploadButton = (
    <div className=" actionIcon ic_hidden edit">
      <label htmlFor="upload-button">
        {getIcon("editUser", "Select Image")}
      </label>
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );

  const saveSelection = (
    <div className="flex-container toRight doubleIconHolder">
      {getIcon("acceptUser", "Save", "actionIcon doubleIcon success_hov", (e) =>
        handleSaveImage(e)
      )}
      {getIcon(
        "declineUser",
        "Cancel",
        "actionIcon doubleIcon success_hov",
        (e) => handleDismissImage(e)
      )}
    </div>
  );

  return (
    <div className="userDataItem avatarHolder">
      {readyToUpload ? saveSelection : uploadButton}
      {isLoading ? (
        <CircleLoader />
      ) : (
        <div>
          {(displayImg !== undefined) & (displayImg !== "") ? (
            <img
              className="homeLogo avatar"
              src={displayImg}
              alt="user avatar"
              aria-label="User avatar"
            />
          ) : (
            getIcon("user", undefined, "homeLogo avatar")
          )}
        </div>
      )}
    </div>
  );
}
