import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { SmartAssist } from './pages/SmartAssist';
import { Layout } from './components/Layout';
import { FileHub } from './pages/FileHub';
import { CodeLab } from './pages/CodeLab';
import { AcademicToolkit } from './pages/AcademicToolkit';
import { Collaboration } from './pages/Collaboration';
import { Productivity } from './pages/Productivity';
import { Profile } from './pages/Profile';
import { AdminDashboard } from './pages/AdminDashboard'; // ✅ Import AdminDashboard

// --- Protected Route Wrapper ---
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
};

// --- Public Route Wrapper ---
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
};

// --- Admin-Only Route Wrapper ---
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useApp();
  // Redirect if not logged in OR not an ADMIN
  if (!isAuthenticated || user?.role !== 'ADMIN') return <Navigate to="/" replace />;
  return <Layout>{children}</Layout>;
};

// --- Main App Content ---
const AppContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Login Route */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />

        {/* Main Dashboard Routes */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/smart-assist" element={<ProtectedRoute><SmartAssist /></ProtectedRoute>} />
        <Route path="/file-hub" element={<ProtectedRoute><FileHub /></ProtectedRoute>} />
        <Route path="/code-lab" element={<ProtectedRoute><CodeLab /></ProtectedRoute>} />
        <Route path="/academic" element={<ProtectedRoute><AcademicToolkit /></ProtectedRoute>} />
        <Route path="/collaboration" element={<ProtectedRoute><Collaboration /></ProtectedRoute>} />
        <Route path="/productivity" element={<ProtectedRoute><Productivity /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* --- Admin-Only Route --- */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />

        {/* Placeholder Routes (Phase 2) */}
        <Route path="/file-hub" element={<ProtectedRoute><div className="p-8 text-center text-gray-500">File Hub Module Coming Soon (Phase 2)</div></ProtectedRoute>} />
        <Route path="/code-lab" element={<ProtectedRoute><div className="p-8 text-center text-gray-500">Code Lab Simulator Coming Soon (Phase 2)</div></ProtectedRoute>} />
        <Route path="/academic" element={<ProtectedRoute><div className="p-8 text-center text-gray-500">Academic Toolkit Coming Soon (Phase 2)</div></ProtectedRoute>} />
        <Route path="/collaboration" element={<ProtectedRoute><div className="p-8 text-center text-gray-500">Collaboration Boards Coming Soon (Phase 2)</div></ProtectedRoute>} />
        <Route path="/productivity" element={<ProtectedRoute><div className="p-8 text-center text-gray-500">Productivity Timer Coming Soon (Phase 2)</div></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

// --- Main App ---
const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
