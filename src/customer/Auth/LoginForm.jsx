import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, getUser } from '../../State/Auth/Action';

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
    if (user?.role === "ADMIN") navigate("/admin");
    else if (user?.role === "CUSTOMER") navigate("/");
  }, [user, navigate]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 sm:p-10 bg-[#FFF8E1] rounded-lg shadow-md mt-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#3E3E3E] mb-1">
            Email
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-[#8B0000] focus:border-[#8B0000]"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-[#3E3E3E] mb-1">
            Password
          </label>
          <input
            required
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-[#8B0000] focus:border-[#8B0000]"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="bg-[#8B0000] hover:bg-[#FFB300] transition duration-300 text-white text-lg font-semibold w-full py-3 rounded-md shadow"
          >
            Login
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-600 font-medium text-center">{error}</p>
        )}
      </form>

      {/* Register Prompt */}
      <div className="text-center mt-6">
        <p className="text-sm">
          Don’t have an account?
          <Button onClick={() => navigate("/register")} className="ml-2" size="small">
            Register
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
