// src/components/AppointmentForm.jsx
import React, { useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = () => {
  const [form, setForm] = useState({
    date: "",
    time: "",
    doctor: "",
    reason: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment booked with Dr. ${form.doctor}`);
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <h3>Book Appointment</h3>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />
      <input
        type="time"
        name="time"
        value={form.time}
        onChange={handleChange}
      />
      <input
        type="text"
        name="doctor"
        placeholder="Doctor Name"
        value={form.doctor}
        onChange={handleChange}
      />
      <textarea
        name="reason"
        placeholder="Reason for appointment"
        value={form.reason}
        onChange={handleChange}
      />
      <button type="submit">Book</button>
    </form>
  );
};

export default AppointmentForm;
