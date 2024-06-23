import { useState } from "react";
import { actions } from "../actions";
import EditIcon from "../assets/icons/edit.svg";
import SaveIcon from "../assets/icons/share.svg";
import useAxios from "../hooks/useAxios";
import { useProfile } from "../hooks/useProfile";

export default function Bio() {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const [EditMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(state?.user?.bio);

  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,
        { bio }
      );

      if (response.status === 200) {
        console.log(response);
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data,
        });
      }
      setEditMode(false);
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };
  return (
    <>
      <div className="mt-4 flex items-start gap-2 lg:mt-6">
        <div className="flex-1">
          {!EditMode ? (
            <p className="leading-[188%] text-gray-400 lg:text-lg">
              {state?.user?.bio}
            </p>
          ) : (
            <textarea
              className='p-2 className="leading-[188%] text-gray-600 lg:text-lg rounded-md'
              value={bio}
              rows={4}
              cols={55}
              onChange={(e) => setBio(e.target.value)}
            />
          )}
        </div>
        {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}
        <button className="flex-center h-7 w-7 rounded-full">
          {!EditMode ? (
            <img src={EditIcon} onClick={() => setEditMode(true)} alt="Edit" />
          ) : (
            <img src={SaveIcon} onClick={handleBioEdit} alt="Save" />
          )}
        </button>
      </div>
    </>
  );
}
