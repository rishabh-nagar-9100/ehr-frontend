// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
const API_HEALTH_URL = import.meta.env.VITE_API_HEALTH_URL || 'http://localhost:5001/health';

// Default headers for API requests
const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Get auth token from localStorage
const getAuthToken = () => {
  const token = localStorage.getItem('authToken');
  if (token && token !== 'undefined' && token !== 'null') {
    return token;
  }
  return null;
};

// Get headers with auth token
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    ...defaultHeaders,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: getAuthHeaders(),
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// API methods
export const api = {
  // Health check
  healthCheck: () => fetch(API_HEALTH_URL).then(res => res.json()),

  // Authentication
  auth: {
    login: (credentials) => apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    register: (userData) => apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    logout: () => apiRequest('/auth/logout', {
      method: 'POST',
    }),
    getMe: () => apiRequest('/auth/me'),
  },

  // Patients
  patients: {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiRequest(`/patients${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => apiRequest(`/patients/${id}`),
    create: (patientData) => apiRequest('/patients', {
      method: 'POST',
      body: JSON.stringify(patientData),
    }),
    update: (id, patientData) => apiRequest(`/patients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patientData),
    }),
    delete: (id) => apiRequest(`/patients/${id}`, {
      method: 'DELETE',
    }),
    search: (query) => apiRequest(`/patients/search?q=${encodeURIComponent(query)}`),
    getRecent: () => apiRequest('/patients/recent'),
  },

  // Doctors
  doctors: {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiRequest(`/doctors${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => apiRequest(`/doctors/${id}`),
    create: (doctorData) => apiRequest('/doctors', {
      method: 'POST',
      body: JSON.stringify(doctorData),
    }),
    update: (id, doctorData) => apiRequest(`/doctors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(doctorData),
    }),
    getAvailable: () => apiRequest('/doctors/available'),
  },

  // Staff
  staff: {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiRequest(`/staff${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => apiRequest(`/staff/${id}`),
    create: (staffData) => apiRequest('/staff', {
      method: 'POST',
      body: JSON.stringify(staffData),
    }),
    update: (id, staffData) => apiRequest(`/staff/${id}`, {
      method: 'PUT',
      body: JSON.stringify(staffData),
    }),
    delete: (id) => apiRequest(`/staff/${id}`, {
      method: 'DELETE',
    }),
    getDepartments: () => apiRequest('/staff/departments'),
  },

  // Appointments
  appointments: {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiRequest(`/appointments${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => apiRequest(`/appointments/${id}`),
    create: (appointmentData) => apiRequest('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    }),
    update: (id, appointmentData) => apiRequest(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    }),
    cancel: (id) => apiRequest(`/appointments/${id}`, {
      method: 'DELETE',
    }),
    getUpcoming: () => apiRequest('/appointments/upcoming'),
    getByDoctor: (doctorId) => apiRequest(`/appointments/doctor/${doctorId}`),
  },

  // Dashboard
  dashboard: {
    getStats: () => apiRequest('/dashboard/stats'),
    getRecentPatients: () => apiRequest('/dashboard/recent-patients'),
    getTodayAppointments: () => apiRequest('/dashboard/today-appointments'),
    getAppointmentTrends: () => apiRequest('/dashboard/appointment-trends'),
    getDepartmentStats: () => apiRequest('/dashboard/department-stats'),
    getDoctorWorkload: () => apiRequest('/dashboard/doctor-workload'),
  },

  // Prescriptions (placeholder)
  prescriptions: {
    getAll: () => apiRequest('/prescriptions'),
    create: (prescriptionData) => apiRequest('/prescriptions', {
      method: 'POST',
      body: JSON.stringify(prescriptionData),
    }),
  },

  // Reminders (placeholder)
  reminders: {
    getAll: () => apiRequest('/reminders'),
    create: (reminderData) => apiRequest('/reminders', {
      method: 'POST',
      body: JSON.stringify(reminderData),
    }),
  },

  // Reports (placeholder)
  reports: {
    getAll: () => apiRequest('/reports'),
    create: (reportData) => apiRequest('/reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    }),
  },
};

// Auth utilities
export const authUtils = {
  setToken: (token) => {
    if (token && token !== 'undefined' && token !== 'null') {
      localStorage.setItem('authToken', token);
    } else {
      console.error('Attempted to set invalid token:', token);
    }
  },
  
  removeToken: () => {
    localStorage.removeItem('authToken');
  },
  
  isAuthenticated: () => {
    const token = getAuthToken();
    return !!token;
  },
  
  logout: () => {
    authUtils.removeToken();
    // Redirect to login page
    window.location.href = '/login';
  },
};

export default api;
