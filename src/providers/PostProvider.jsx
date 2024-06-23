import { useReducer } from "react";
import { PostContext } from "../contexts";
import { PostReducer, initialState } from "../reducers/PostReducer";

export default function PostProvider({ children }) {
  const [state, dispatch] = useReducer(PostReducer, initialState);
  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
}
