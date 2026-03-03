import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import CasesPage from './pages/CasesPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="services">
          <Route index element={<ServicesPage />} />
          <Route path=":slug" element={<ServiceDetailPage />} />
        </Route>
        <Route path="cases" element={<CasesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contacts" element={<ContactsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
