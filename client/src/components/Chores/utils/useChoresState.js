import { useContext, useState, useEffect } from "react";
import axios from "axios";
import useGetData from "../../../general/hooks/useGetData";
import { AuthContext } from "../../auth/utils/AuthContext";
import { BASE_URL } from "../../../general/utils/AppParams";
import { Observable } from "rxjs";
import useToggle from "../../../general/hooks/useToggle";

const BASE_URI_CHORES = `${BASE_URL}/chores`;

const choresMode = { HOME: "HOME", NONE: undefined };

export default (mode) => {
  const { activeHouseId, userId, requestHeader } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [data, setData] = useState();
  const [showAddChore, toggleAddChore] = useToggle(false);

  // const [{ data, isLoading, isError }, setRequest] = useGetData(
  //   {
  //     reqUri: `chores/${houseId}`,
  //     reqType: "get",
  //     reqData: { leader: userId() },
  //   },
  //   {}
  // );

  const getChores = () => {
    let choresObservable = Observable.create((observer) => {
      if (activeHouseId) {
        console.log("Calling to get house chores");
        axios
          .get(`${BASE_URI_CHORES}/${activeHouseId}`, requestHeader)
          .then((response) => {
            // console.log("got chores:");
            // console.log(response.data);

            observer.next(response.data);
            observer.complete();
          })
          .catch((error) => {
            console.log("observer error:");
            console.log(error);
            console.log(error.response.data.error);
            observer.error(error);
          });
      }
    });

    return choresObservable;
  };

  useEffect(() => {
    if (activeHouseId != null) {
      console.log("Entered Chores use effect");
      // const getChores =
      getChores().subscribe({
        next: (data) => {
          console.log("got chores => ", data);
          setData(data);
        },
        complete: (data) => console.log("[complete]"),
      });
    }

    // getChores();

    // return () => choresObservable.unsubscribe();
  }, [activeHouseId]);

  // const getAllChores = () => {
  //   // console.log("calling getAllChores from useChoresState for mode: " + mode);
  //   if (mode === choresMode.HOME) {
  //     setRequest({
  //       reqUri: `${houseId}`,
  //       reqType: "get",
  //       reqData: { leader: userId() },
  //     });
  //   } else {
  //     setRequest({
  //       reqUri: `${houseId}`,
  //       reqType: "get",
  //       reqData: null,
  //     });
  //   }
  // };

  const addChore = (chore) => {
    setLoading(true);
    setError(undefined);

    axios
      .post(
        `${BASE_URI_CHORES}/${activeHouseId}/${userId()}`,
        chore,
        requestHeader
      )
      .then((res) => {
        console.log("added chore.");
        console.log(res.data);

        setData(res.data);

        setLoading(false);
        toggleAddChore();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.error);
        console.log("Error in addChore!");

        setLoading(false);
        setError(err.response.data.error);
      });
  };

  const editChore = (newTask, choreId) => {
    // const updatedChores = data.chores.map(chore =>
    //   chore.id === choreId ? { ...chore, task: newTask } : chore
    // );
    // setChores(updatedChores);
  };

  const removeChore = (choreId) => {
    isLoading(true);
    isError(undefined);
    axios
      .delete(`${BASE_URI_CHORES}/${activeHouseId}/${choreId}`, requestHeader)
      .then((res) => {
        console.log("deleted chore " + choreId);
        console.log(res.data);

        setData(res.data);

        isLoading(false);
        isError(undefined);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.error);
        console.log("Error in removeChore!");

        isLoading(false);
        isError(err.response.data.error);
      });
  };

  const toggleChore = (choreId, choreStatus) => {
    setError(undefined);
    const nChore = {
      choreId: choreId,
      complete: !choreStatus,
    };

    console.log("updating chore:");
    console.log(nChore);

    axios
      .patch(
        `${BASE_URI_CHORES}/${activeHouseId}/${userId()}`,
        nChore,
        requestHeader
      )
      .then((res) => {
        console.log("toggled chore.");
        console.log(res.data);

        setData(res.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.error);
        console.log("Error in toggleChore!");

        setLoading(false);
        setError(err.response.data.error);
      });
  };

  const choresActions = {
    addChore: addChore,
    editChore: editChore,
    removeChore: removeChore,
    toggleChore: toggleChore,

    showAddChore: showAddChore,
    toggleAddChore: toggleAddChore,
    // getAllChores: getAllChores,
  };

  // const requestStatus = [isLoading, isError];
  const requestStatus = { isLoading: isLoading, isError: isError };

  return [{ data, choresActions, requestStatus }];
};
