import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { PortfolioView } from './components/PortfolioView';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';

export const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Portfolio */}
          <Route path="/" element={<PortfolioView />} />

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin CMS Dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Catch-all route redirects to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  );
};

export default App;
