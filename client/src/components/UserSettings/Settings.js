import React, { useContext } from "react";
import "./settings.scss";
import HouseCard from "./House/HouseCard";
import SettingsProfile from "../Profile/SettingsProfile";
import AddHousePop from "./House/AddHouse";
import { HouseContext } from "./House/utils/HouseContext";
import AddTenantsPop from "./House/Tenants/AddTenantsPop";
import CardWithLoader from "../GenericComponents/CardWithLoader";

// TODO: get houses list by user id from db order by active

export default function UserSettings() {
  const { houses, showNewHouse, showAddTenants, isLoading } = useContext(
    HouseContext
  );

  const houseItems = houses
    ? houses.map((house) => <HouseCard key={house._id} house={house} />)
    : "";

  return (
    <CardWithLoader loading={isLoading}>
      <SettingsProfile />
      <div className="housesHolder">
        {/* <h4>Houses</h4> */}
        {!houses && (
          <p className="toCenter">Add new house and invite Roomies</p>
        )}
        <div className="flex-container flex-center">
          {houseItems}
          <HouseCard key="house0" />
        </div>
      </div>
      {showNewHouse && <AddHousePop />}
      {showAddTenants && <AddTenantsPop />}
    </CardWithLoader>
  );
}
