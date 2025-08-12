import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Labs from './pages/Labs';
import LabList from './pages/LabList';
import Login from './pages/Login';
import Theory from './pages/Theory';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/labs" element={<Labs />} />
              <Route path="/labs/:category" element={<LabList />} />
              <Route path="/theory" element={<Theory />} />
            </Route>
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;