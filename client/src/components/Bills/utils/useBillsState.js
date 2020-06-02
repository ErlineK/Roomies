import { useContext, useEffect } from "react";
import useGetData from "../../../general/hooks/useGetData";
import { AuthContext } from "../../auth/utils/AuthContext";

export default () => {
  const { userId, activeHouseId } = useContext(AuthContext);
  const [{ data, isLoading, isError }, setRequest] = useGetData({}, {});

  useEffect(() => {
    if (userId() && activeHouseId) {
      setRequest({
        url: `bills/${activeHouseId}/${userId()}`,
        reqType: "get",
        reqData: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId(), activeHouseId]);

  const addBill = async (bill) => {
    await setRequest({
      url: `bills/${activeHouseId}/${userId()}`,
      reqType: "post",
      reqData: bill,
    });
  };

  const editBill = async (billData, billId) => {
    // add bill Id to request
    const reqBill = {
      ...billData,
      billId: billId,
    };
    await setRequest({
      url: `bills/${activeHouseId}/${userId()}`,
      reqType: "patch",
      reqData: reqBill,
    });
  };

  const acceptBill = async (billId) => {
    await setRequest({
      url: `bills/accept/${activeHouseId}/${userId()}`,
      reqType: "patch",
      reqData: { billId: billId },
    });
  };

  const addBillPayment = async (payment, billId) => {
    console.log("requesting new payment for bill Id: " + billId);

    const newPayemnt = {
      ...payment,
      house_ref: activeHouseId,
      from_user: userId(),
    };
    setRequest({
      url: `bills/payment/${billId}/${userId()}`,
      reqType: "post",
      reqData: newPayemnt,
    });
  };

  const removeBill = (billId) => {
    setRequest({
      url: `bills/bill/${billId}/${userId()}`,
      reqType: "delete",
    });
  };

  const removePayment = (paymentId) => {
    setRequest({
      url: `bills/payment/${paymentId}/${userId()}`,
      reqType: "delete",
    });
  };

  const billActions = {
    addBill: addBill,
    editBill: editBill,
    removeBill: removeBill,
    // getAllBills: getAllBills,
    acceptBill: acceptBill,
    addBillPayment: addBillPayment,
    removePayment: removePayment,
  };

  // const requestStatus = [isLoading, isError];
  const requestStatus = { isLoading: isLoading, isError: isError };

  return [
    {
      bills: data.bills,
      billActions,
      requestStatus,
    },
  ];
};
