import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSuppliesAction } from "../../redux/actions/supplies/supplies";

const Supplies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getSupplies = () => dispatch(getSuppliesAction());
    getSupplies();
  }, [dispatch]);
  return <div>Hey, this is supplies!</div>;
};

export default Supplies;
