import React, { createContext, useEffect, useContext, useState } from "react";
import useToggle from "../../../../general/hooks/useToggle";
import { BASE_URL } from "../../../../general/utils/AppParams";
import { AuthContext } from "../../../auth/utils/AuthContext";
import axios from "axios";

export const HouseContext = createContext();

export function HouseProvider(props) {
  const { requestHeader, user, loginUser } = useContext(AuthContext);

  const [houses, setHousesState] = useState();
  const [showAddTenants, toggleAddTenants] = useToggle(false);
  const [showNewHouse, toggleNewHouse] = useToggle(false);
  const [selectedHouseId, setSelectedHouseId] = useState("");
  const [isLoading, setLoading] = useState(false);

  // console.log("house context is called");

  useEffect(() => {
    if (user !== undefined && user._id !== undefined) {
      // get houses from DB
      setLoading(true);
      axios
        .get(`${BASE_URL}/houses/${user._id}`, requestHeader)
        .then((res) => {
          setHouses(res.data.houses);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Get houses Error: ");
          // console.log(error);
          console.log(error.response.data.error);
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const setHouses = (houses) => {
    setSelectedHouseId(user.active_house);
    setHousesState(houses);
  };

  const handleNewHouse = (newHouse) => {
    if (user !== undefined && user._id !== "") {
      console.log("Trying to add house for user " + user._id);
      console.log(newHouse);

      setLoading(true);

      // add new house to DB.
      // responds with updated user
      // getHouses called upon user updates
      axios
        .post(
          `${BASE_URL}/houses/${user._id}`,
          { userId: user._id, newHouse: newHouse },
          requestHeader
        )
        .then((res) => {
          console.log("Added new house successfully");
          console.log(res);

          loginUser(res.data.user);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Add new house Error: ");
          // console.log(error);
          console.log(error.response.data.error);
          setLoading(false);
        });
    }
  };

  const handleNewTenant = (email, name) => {
    // check if tenant's email exist in list
    const currentHouse = getSelectedHouse();

    const tenantInList =
      currentHouse && currentHouse.house_tenants
        ? currentHouse.house_tenants.filter((tenant) => tenant.email === email)
        : [];

    if (tenantInList.length === 0) {
      console.log("trying to add tenants to tenants list");

      setLoading(true);
      axios
        .put(
          `${BASE_URL}/houses/${user._id}/tenants`,
          { houseId: selectedHouseId, email, name },
          requestHeader
        )
        .then((res) => {
          //update houses, clode add tenants popup
          setHouses(res.data.houses);
          toggleAddTenants();

          setLoading(false);
        })
        .catch((error) => {
          console.log("Add tenant error: ");
          console.log(error.response.data.error);

          setLoading(false);
          return error.response.data.error;
        });
    } else {
      console.log("tenant alredy in list");
      console.log(tenantInList);

      setLoading(false);
      return "Tenant already exist";
    }
  };

  const getSelectedHouse = () => {
    const selectedHouse = houses.filter(
      (house) => house._id === selectedHouseId
    );
    return selectedHouse ? selectedHouse[0] : "";
  };

  const getSelectedHouseActiveTenants = () => {
    const selectedHouse = getSelectedHouse();

    return selectedHouse.approved_tenants;
  };

  return (
    <HouseContext.Provider
      value={{
        houses: houses,
        setHouses: setHouses,
        activeHouseId: user ? user.active_house : "",
        getSelectedHouse: getSelectedHouse,

        showNewHouse: showNewHouse,
        toggleNewHouse: toggleNewHouse,
        handleNewHouse: handleNewHouse,

        showAddTenants: showAddTenants,
        toggleAddTenants: toggleAddTenants,
        handleNewTenant: handleNewTenant,
        getActiveTenants: getSelectedHouseActiveTenants,

        isLoading: isLoading,
      }}
    >
      {props.children}
    </HouseContext.Provider>
  );
}
