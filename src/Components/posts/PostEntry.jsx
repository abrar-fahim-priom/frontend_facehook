import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { actions } from "../../actions/index.js";
import AddPhotoIcon from "../../assets/icons/addPhoto.svg";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";
import { useProfile } from "../../hooks/useProfile";
import Field from "../common/Field";

export default function PostEntry({ post, onCreate, onUpdate }) {
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { api } = useAxios();
  const { state: profile } = useProfile();
  const fileUploaderRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const user = profile?.user ?? auth?.user; // if user updates image in profile won't affect in homepage so checking profile first

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  useEffect(() => {
    if (post) {
      reset({
        content: post.content,
      });
      setPreviewUrl(
        post.image
          ? `${import.meta.env.VITE_SERVER_BASE_URL}/${post.image}`
          : null
      );
    }
  }, [post, reset]);

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploaderRef.current.click();
  };

  const handleAddPostImageUpload = () => {
    const file = fileUploaderRef.current.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handlePostSubmit = async (data) => {
    dispatch({ type: actions.post.DATA_FETCHING });

    // Create a FormData object and append the fields
    const formData = new FormData();
    formData.append("content", data.content);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    const url = `${import.meta.env.VITE_SERVER_BASE_URL}/posts${
      post ? `/${post.id}` : ""
    }`;
    const method = post ? "PATCH" : "POST"; // Use PATCH for updating existing post

    try {
      const response = await api({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log(response.data); // Log the response data for debugging

        // Determine the action type based on whether it's an update or create
        const actionType = post
          ? actions.post.DATA_EDITED
          : actions.post.DATA_CREATED;

        dispatch({
          type: actionType,
          data: response.data,
        });

        post ? onUpdate() : onCreate(); // Call onUpdate if updating, otherwise onCreate for new post
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        {post ? "Edit Post" : "Create Post"}
      </h6>

      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}
              </h6>
              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Selected"
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
            />
          ) : (
            <button
              className="btn-primary cursor-pointer !text-gray-100"
              htmlFor="image"
              onClick={handleImageUpload}
            >
              <img src={AddPhotoIcon} alt="Add Photo" />
              Add Photo
            </button>
          )}

          <input
            type="file"
            name="image"
            id="image"
            hidden
            ref={fileUploaderRef}
            onChange={handleAddPostImageUpload}
          />
        </div>

        <Field label="" error={errors.content}>
          <textarea
            {...register("content", {
              required: "Adding some texts are mandatory!",
            })}
            name="content"
            id="content"
            placeholder="Share your thoughts..."
            className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
          ></textarea>
        </Field>
        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            type="submit"
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
          >
            {post ? "Update Post" : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
