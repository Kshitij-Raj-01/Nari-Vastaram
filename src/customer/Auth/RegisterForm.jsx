import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getUser, register } from "../../State/Auth/Action";

const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { auth } = useSelector((store) => store);
  const jwt = sessionStorage.getItem("jwt");

  useEffect(() => {
    if (
      jwt &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt, location.pathname]);

  useEffect(() => {
    if (auth.error?.includes("already exists")) {
      const timeout = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [auth.error]);

  useEffect(() => {
    if (auth.jwt && auth.user) {
      navigate("/");
    }
  }, [auth.jwt, auth.user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password")
    };
    dispatch(register(userData));
  };

  return (
    <div className="max-w-xl mx-auto sm:px-8 px-4 bg-[#FFF8E1] py-10 rounded-lg shadow-md w-full">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold text-[#3E3E3E]">
            First Name
          </label>
          <input
            required
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-[#8B0000] focus:border-[#8B0000]"
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold text-[#3E3E3E]">
            Last Name
          </label>
          <input
            required
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-[#8B0000] focus:border-[#8B0000]"
          />
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label htmlFor="email" className="block text-sm font-semibold text-[#3E3E3E]">
            Email
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-[#8B0000] focus:border-[#8B0000]"
          />
        </div>

        {/* Password */}
        <div className="sm:col-span-2">
          <label htmlFor="password" className="block text-sm font-semibold text-[#3E3E3E]">
            Password
          </label>
          <input
            required
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-[#8B0000] focus:border-[#8B0000]"
          />
        </div>

        {/* Submit */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="bg-[#8B0000] hover:bg-[#FFB300] transition duration-300 text-white text-base font-semibold w-full py-3 rounded-md shadow"
          >
            Register
          </button>
        </div>
      </form>

      {auth.error && (
        <div className="mt-4 sm:col-span-2">
          <p className="text-red-600 font-medium text-center text-sm">
            {auth.error}
          </p>
        </div>
      )}

      <div className="mt-6 flex justify-center flex-col items-center gap-2 sm:flex-row">
        <p className="text-sm">Already have an account?</p>
        <Button onClick={() => navigate("/login")} size="small" className="text-sm">
          Login
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
