import { useContext } from "react";
import { ProfileContext } from "../contexts/index.js";

export const useProfile = () => {
  return useContext(ProfileContext);
};
