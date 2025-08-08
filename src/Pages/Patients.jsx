import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const Patients = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Patients</h1>
      <p>Manage patient records here.</p>
    </DashboardLayout>
  );
};

export default Patients;
