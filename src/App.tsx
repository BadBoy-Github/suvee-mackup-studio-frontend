import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Works from './pages/Works';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="works" element={<Works />} />
            <Route path="about" element={<About />} />
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<Privacy />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;
