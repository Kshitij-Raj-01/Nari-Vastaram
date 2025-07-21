import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, getUser } from "../../State/Auth/Action";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, jwt, error } = useSelector((state) => state.auth);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (jwt && !user) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch, user]);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      navigate("/admin");
    } else if (user?.role === "CUSTOMER") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="w-full px-4 sm:px-8 bg-[#FFF8E1] py-10 rounded-lg shadow-md max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm sm:text-base font-semibold text-[#3E3E3E]">
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
        <div>
          <label htmlFor="password" className="block text-sm sm:text-base font-semibold text-[#3E3E3E]">
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
        <div>
          <button
            type="submit"
            className="bg-[#8B0000] hover:bg-[#FFB300] transition duration-300 text-white text-base font-semibold w-full py-3 rounded-md shadow"
          >
            Login
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4">
          <p className="text-red-600 font-medium text-center text-sm">
            {error}
          </p>
        </div>
      )}

      <div className="mt-6 flex justify-center flex-col items-center gap-2 sm:flex-row">
        <p className="text-sm">Don't have an account?</p>
        <Button onClick={() => navigate("/register")} size="small" className="text-sm">
          Register
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
