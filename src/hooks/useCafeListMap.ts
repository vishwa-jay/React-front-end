import { useMemo } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store/reducers/rootReducer";

const UseCafeListMap = () => {

  const cafeList = useSelector((state: AppState) => state.cafe);

  //This hook returns iterable collection using cafe list, for dropdowns
  return useMemo(() => {
    return cafeList.response?.data.map((c) => {
      return { key: c.id, value: c.id, label: c.name };
    });
    
  }, [cafeList]);
};

export default UseCafeListMap;
