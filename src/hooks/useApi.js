import { useState, useEffect } from 'react';
import { api } from '../services/api';

// Custom hook for API calls with loading and error states
export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

// Hook for dashboard data
export const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentPatients, setRecentPatients] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [statsRes, patientsRes, appointmentsRes] = await Promise.all([
          api.dashboard.getStats(),
          api.dashboard.getRecentPatients(),
          api.dashboard.getTodayAppointments(),
        ]);

        setStats(statsRes.data);
        setRecentPatients(patientsRes.data);
        setTodayAppointments(appointmentsRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return {
    stats,
    recentPatients,
    todayAppointments,
    loading,
    error,
  };
};

// Hook for patients
export const usePatients = (searchQuery = '') => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = searchQuery 
        ? await api.patients.search(searchQuery)
        : await api.patients.getAll();
        
      setPatients(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(fetchPatients, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const createPatient = async (patientData) => {
    try {
      const response = await api.patients.create(patientData);
      setPatients(prev => [...prev, response.data]);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const updatePatient = async (id, patientData) => {
    try {
      const response = await api.patients.update(id, patientData);
      setPatients(prev => prev.map(p => (p._id === id || p.id === id) ? response.data : p));
      return response;
    } catch (err) {
      throw err;
    }
  };

  const deletePatient = async (id) => {
    try {
      await api.patients.delete(id);
      setPatients(prev => prev.filter(p => p._id !== id && p.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return {
    patients,
    loading,
    error,
    createPatient,
    updatePatient,
    deletePatient,
    fetchPatients,
  };
};

// Hook for appointments
export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.appointments.getAll();
        setAppointments(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const addAppointment = async (appointmentData) => {
    try {
      const response = await api.appointments.create(appointmentData);
      setAppointments(prev => [...prev, response.data]);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const updateAppointment = async (id, appointmentData) => {
    try {
      const response = await api.appointments.update(id, appointmentData);
      setAppointments(prev => prev.map(a => a._id === id ? response.data : a));
      return response;
    } catch (err) {
      throw err;
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await api.appointments.cancel(id);
      setAppointments(prev => prev.map(a => 
        a._id === id ? { ...a, status: 'Cancelled' } : a
      ));
    } catch (err) {
      throw err;
    }
  };

  return {
    appointments,
    loading,
    error,
    addAppointment,
    updateAppointment,
    cancelAppointment,
  };
};

export default useApi;
