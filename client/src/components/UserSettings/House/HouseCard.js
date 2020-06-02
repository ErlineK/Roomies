import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./house.scss";
import { getIcon } from "../../../general/utils/iconManager";
import { AuthContext } from "../../auth/utils/AuthContext";
import { HouseContext } from "./utils/HouseContext";
import { isTenantApproved } from "./utils/houseHelper";

// TODO: handle change active house in DB

// TODO: house helper

export default function HouseCard({ house }) {
  const { userId, acceptHouseInv } = useContext(AuthContext);
  const { activeHouseId, toggleAddTenants, toggleNewHouse } = useContext(
    HouseContext
  );

  const handleDeclineInvitation = (e) => {
    e.preventDefault();

    console.log("declining invitation");
    acceptHouseInv(house._id, false);
  };

  const handleAcceptInvitation = (e) => {
    e.preventDefault();
    acceptHouseInv(house._id, true);
  };

  const tenants =
    house && house.house_tenants
      ? house.house_tenants.map((tenant) =>
          userId() === tenant._id ? (
            ""
          ) : (
            <li
              key={tenant._id}
              className={
                !isTenantApproved(house, tenant._id) ? "text-muted" : ""
              }
            >
              {tenant.name}
              {house.admin === tenant._id ? (
                <span className="small-note success">admin</span>
              ) : !isTenantApproved(house, tenant._id) ? (
                <span className="small-note abort">Not Approved</span>
              ) : (
                ""
              )}
            </li>
          )
        )
      : "";

  const houseActive = house && house._id === activeHouseId;
  const houseApproved =
    house &&
    (house.admin === userId ||
      houseActive ||
      isTenantApproved(house, userId()));

  return (
    <div
      className={`${houseActive ? "activeCard" : ""} card houseCardHolder`}
      onClick={!house ? toggleNewHouse : null}
    >
      {house === undefined ? (
        getIcon("add", "Add new house", "toCenter fullCardIcon")
      ) : (
        <>
          {houseApproved && (
            <Link className="" to={`/House/${house._id}`}>
              {houseActive
                ? getIcon("edit", "Edit", "sectionIcon")
                : getIcon("watch", "Preview", "sectionIcon")}
            </Link>
          )}

          {houseActive ? (
            <span className="small-note sectionNote">Active</span>
          ) : (
            ""
          )}

          <img
            className={`homeLogo houseAvatar ${
              house.avatar && house.avatar !== "" ? "houseAvatarImg" : ""
            }`}
            src={
              house.avatar && house.avatar !== ""
                ? house.avatar
                : require("../../../assets/Logo.svg")
            }
            alt="house avatar"
          />

          <h5>{house.houseName}</h5>
          <p>{`${house.address} ${house.city}, ${house.province}`}</p>
          <div className="tenantsHolder">
            {/* Tenants can be added only to curently active house! */}
            {houseActive &&
              houseApproved &&
              getIcon("addUser", "Add tenants", "sectionIcon", () =>
                toggleAddTenants()
              )}
            <ul>
              <li>
                You
                <span className="small-note success">
                  {house.admin === userId() ? "admin" : ""}
                </span>
              </li>
              {tenants}
            </ul>
          </div>
          <p>{house.description}</p>

          {!houseApproved && (
            <div>
              <div className="buttonsHolder">
                <button
                  className="btn btn-grad-green btn-grad-red btnAction"
                  onClick={(e) => handleDeclineInvitation(e)}
                >
                  {getIcon("decline", "Decline", "accent-icon")}
                  Decline
                </button>
                <button
                  className="btn btn-grad-green btnAction"
                  onClick={(e) => handleAcceptInvitation(e)}
                >
                  {getIcon("accept", "Accept", "accent-icon")}
                  Accept
                </button>
              </div>
              <p>You were invited to join this house</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
