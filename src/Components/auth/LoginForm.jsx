import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import Field from "../common/Field";
export default function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [defaultCredentials, setDefaultCredentials] = useState({
    email: "admin@email.com",
    password: "admin1234",
  });

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData,
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        const { user, token } = response.data;

        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;
          setAuth({ user, authToken, refreshToken });
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      setError("root.random", {
        type: "random",
        message: `Email with ${formData.email} is not found`,
      });
    }
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <h3 className="flex justify-center text-slate-500 mb-2">
        The mock backend is based on json-server, once database is integrated
        you can use through authentication, for now login with the default
        credentials, all other functionalities are live
      </h3>
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", {
            required: "Email ID is Required",
          })}
          className={`auth-input ${
            errors.email ? "border-red-500" : "border-gray-200"
          } `}
          type="email"
          value={defaultCredentials.email}
          name="email"
          id="email"
        />
      </Field>

      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password ID is Required",
            minLength: {
              value: 6,
              message: "Your password must be at least 6 characters",
            },
          })}
          className={`auth-input ${
            errors.password ? "border-red-500" : "border-gray-200"
          } `}
          type="password"
          name="password"
          value={defaultCredentials.password}
          id="password"
        />
      </Field>
      <p className="text-center m-2">{errors?.root?.random?.message}</p>
      <Field>
        <button className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90">
          Login
        </button>
      </Field>
    </form>
  );
}
