import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, getUser } from '../../State/Auth/Action';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🌟 Correct selection
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

  // Fetch user profile after JWT is set
  useEffect(() => {
    if (jwt && !user) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch, user]);

  // Redirect if admin
  useEffect(() => {
    if (user && user.role === "ADMIN") {
      navigate("/admin");
    }
    else if(user && user.role == "CUSTOMER"){
      navigate("/")
    }
  }, [user, navigate]);

  return (
    <div className="max-w-3xl mx-auto px-4 bg-[#FFF8E1] py-10 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

        {/* Submit Button */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="bg-[#8B0000] hover:bg-[#FFB300] transition duration-300 text-white text-lg font-semibold w-full py-3 rounded-md shadow"
          >
            Login
          </button>
        </div>
      </form>

      {error && (
        <div className="sm:col-span-2 mt-4">
          <p className="text-red-600 font-medium text-center">
            {error}
          </p>
        </div>
      )}

      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center">
          <p>Don't have an account?</p>
          <Button onClick={() => navigate("/register")} className="ml-5" size="small">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
