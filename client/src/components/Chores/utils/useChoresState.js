import { useContext } from "react";
import axios from "axios";
import useGetData from "../../../general/hooks/useGetData";
import { AuthContext } from "../../auth/utils/AuthContext";

const BASE_URI_CHORES = "http://localhost:5000/api/chores";

const choresMode = { HOME: "HOME", NONE: undefined };

export default (mode) => {
  const { houseId, userId } = useContext(AuthContext);
  const [{ data, isLoading, isError }, setRequest] = useGetData(
    {
      reqUri: `chores/${houseId}`,
      reqType: "get",
      reqData: { leader: userId() },
    },
    {}
  );

  const getAllChores = () => {
    console.log("calling getAllChores from useChoresState for mode: " + mode);
    if (mode === choresMode.HOME) {
      setRequest({
        reqUri: `${houseId}`,
        reqType: "get",
        reqData: { leader: userId() },
      });
    } else {
      setRequest({
        reqUri: `${houseId}`,
        reqType: "get",
        reqData: null,
      });
    }
  };

  const addChoreToDB = (chore) => {
    const data = {
      task: chore,
      completed: false,
    };

    axios
      .post(BASE_URI_CHORES, data)
      .then((res) => {
        console.log("added chore successfully");
        getAllChores();
      })
      .catch((err) => {
        console.log("Error in CreateChore!");
      });
  };

  const addChore = (newChore) => {
    // setChores([...Chores, { id: uuid(), task: newChore, completed: false }]);
    addChoreToDB(newChore);
  };

  const editChore = (newTask, choreId) => {
    // const updatedChores = data.chores.map(chore =>
    //   chore.id === choreId ? { ...chore, task: newTask } : chore
    // );
    // setChores(updatedChores);
  };

  const removeChore = (choreId) => {
    // const updatedChores = data.chores.filter(chore => chore.id !== choreId);
    // setChores(updatedChores);
  };

  const toggleChore = (choreId) => {
    // const updatedChores = data.chores.map(chore =>
    //   chore.id === choreId ? { ...chore, completed: !chore.completed } : chore
    // );
    console.log("toggling chore with id " + choreId);
    // setChores(updatedChores);
  };

  const choresActions = {
    addChore: addChore,
    editChore: editChore,
    removeChore: removeChore,
    toggleChore: toggleChore,
    getAllChores: getAllChores,
  };

  // const requestStatus = [isLoading, isError];
  const requestStatus = { isLoading: isLoading, isError: isError };

  return [{ data, choresActions, requestStatus }];
};
