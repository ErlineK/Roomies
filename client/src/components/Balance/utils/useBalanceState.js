import { useContext, useEffect } from "react";
import { AuthContext } from "../../auth/utils/AuthContext";
import useGetData from "../../../general/hooks/useGetData";

export default () => {
  const { user } = useContext(AuthContext);
  const [{ data, isLoading, isError }, setRequest] = useGetData({}, {});

  useEffect(() => {
    if (user && user._id !== "" && user.active_house) {
      setRequest({
        url: `bills/balance/${user.active_house}/${user._id}`,
        reqType: "get",
        reqData: {},
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const balanceNotEnpty = data && data.balance && data.balance.length > 0;

  const isMyId = (idToTest) => {
    return user && idToTest === user._id;
  };

  const getMyBalance = () => {
    const balanceObj = balanceNotEnpty
      ? data.balance.filter((blItem) => isMyId(blItem._id))
      : undefined;
    const myBalance =
      balanceObj && balanceObj.length > 0 ? balanceObj[0].totalBalance : 0;
    return myBalance;
  };

  const requestStatus = { isLoading: isLoading, isError: isError };
  const balanceActions = { getMyBalance: getMyBalance, isMyId: isMyId };

  return [
    {
      balance: data && data.balance ? data.balance : data,
      requestStatus,
      balanceActions,
    },
  ];
};
