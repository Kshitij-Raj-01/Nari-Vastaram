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
    <div className="max-w-md mx-auto px-6 py-10 bg-[#FFF8E1] shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-center text-[#8B0000] mb-6">Welcome Back, Love!</h2>
      <form onSubmit={handleSubmit} className="grid gap-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#3E3E3E]">
            Email
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-[#8B0000] focus:border-[#8B0000] transition"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-[#3E3E3E]">
            Password
          </label>
          <input
            required
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-[#8B0000] focus:border-[#8B0000] transition"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#8B0000] hover:bg-[#FFB300] hover:text-black transition duration-300 text-white font-semibold w-full py-3 rounded-lg shadow"
        >
          Login
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-600 text-center text-sm font-medium">{error}</p>
      )}

      <div className="mt-6 text-center text-sm text-[#3E3E3E]">
        Don’t have an account?{" "}
        <Button onClick={() => navigate("/register")} size="small" className="text-sm">
          <span className="text-[#8B0000] font-semibold">Register</span>
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
