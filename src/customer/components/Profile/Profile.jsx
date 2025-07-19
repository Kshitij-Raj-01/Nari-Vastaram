"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../../config/apiConfig";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
  });
  
  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/users/profile");
      setProfile(res.data);
      setFormData({
        firstName: res.data.firstName || "",
        lastName: res.data.lastName || "",
        mobile: res.data.mobile || "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/api/users/profile", formData);
      await fetchProfile(); // 🌸 This re-fetches the full profile, including addresses
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };
  

  if (loading) {
    return (
      <div className="p-10 text-xl text-purple-700">
        Loading your profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-red-600">Error: {error}</div>
    );
  }

  return (
    <div className="bg-[#FFE0BC] min-h-screen flex flex-col items-center py-10 px-6 lg:px-20">
      <motion.header
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="max-w-3xl text-center mb-10"
      >
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-2 text-gray-700">
          Update your details anytime you wish 💖
        </p>
      </motion.header>

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#F1D4A9] w-full max-w-3xl rounded-lg shadow-md p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>
            <input
              type="text"
              value={profile.email}
              disabled
              className="w-full border rounded-md p-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Created At</label>
            <input
              type="text"
              value={new Date(profile.createdAt).toLocaleDateString()}
              disabled
              className="w-full border rounded-md p-2 bg-gray-100"
            />
          </div>
        </div>

        {/* Addresses */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Addresses</h2>
          {profile.address?.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5 text-gray-700">
              {profile.address.map((addr) => (
                <li key={addr._id}>
                  {addr.streetAddress}, {addr.city}, {addr.state}, {addr.pinCode}
                  {addr.mobile ? ` (📞 ${addr.mobile})` : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No addresses saved.</p>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#9155fd] text-white px-6 py-3 mt-6 rounded-md hover:bg-[#7d3fdf] transition"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </motion.section>
    </div>
  );
};

export default Profile;
