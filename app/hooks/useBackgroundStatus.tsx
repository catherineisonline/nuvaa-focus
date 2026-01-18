import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useBackgroundStatus = () => {
  return useSelector((state: RootState) =>
    Boolean(state.appearance.currentBackground)
  );
};
