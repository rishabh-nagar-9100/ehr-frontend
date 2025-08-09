import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    hospitalId: "hospital_demo" // Using default hospital for now
  });
  const [error, setError] = useState("");
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      await register(formData);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4">Register for MediSync</h2>
        
        {error && (
          <div className="text-red-500 mb-3 p-2 bg-red-50 border border-red-200 rounded">
            {error}
          </div>
        )}
        
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="border w-full p-2 mb-3"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border w-full p-2 mb-3"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />
        
        <select
          name="role"
          className="border w-full p-2 mb-3"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="hospitalOwner">Hospital Owner</option>
          <option value="staff">Staff</option>
        </select>
        
        <button
          type="submit"
          className="bg-green-500 text-white p-2 w-full rounded disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        
        <div className="mt-3 text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-blue-500">Login here</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
