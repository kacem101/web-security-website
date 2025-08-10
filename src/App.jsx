import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Theory from './pages/Theory';
import Labs from './pages/Labs';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/theory" element={<Theory />} />
          <Route path="/labs" element={<Labs />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;