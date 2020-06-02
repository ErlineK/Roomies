import React, { useEffect } from "react";
import "../../Profile/profile.scss";
import "./house.scss";
import useImageUploadState from "../../../general/hooks/useImageUploadState";

export default function HouseAvatar({ avatar, addAvatarToForm }) {
  const [
    { displayImg },
    undefined,
    handleDismissImage,
    handleImageUpload,
  ] = useImageUploadState(avatar, "HOUSE");

  useEffect(() => {
    addAvatarToForm(displayImg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayImg]);

  const uploadButton = (
    <div className="edit">
      <label htmlFor="upload-house">
        <div>
          <img
            className={`homeLogo avatar edit ${
              displayImg === undefined || displayImg === "" ? "houseAvatar" : ""
            }`}
            src={
              (displayImg !== undefined) & (displayImg !== "")
                ? displayImg
                : require("../../../assets/Logo.svg")
            }
            alt="home avatar"
            aria-label="Home avatar"
          />
        </div>
      </label>
      <input
        type="file"
        id="upload-house"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );

  return <div className="userDataItem avatarHolder">{uploadButton}</div>;
}
