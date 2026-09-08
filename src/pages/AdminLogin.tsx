import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf6e3]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md bg-[#f5e6d3] rounded-2xl shadow-lg border-2 border-[#556b2f] p-8"
      >
        <h1 className="text-3xl font-bold text-[#556b2f] text-center mb-8">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#556b2f] mb-1">Email</label>
            <input
              type="email"
              value={import.meta.env.VITE_ADMIN_EMAIL || ''}
              readOnly
              className="w-full px-4 py-3 bg-white border border-[#556b2f] rounded-lg text-[#556b2f] cursor-not-allowed opacity-80"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#556b2f] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#556b2f] rounded-lg text-[#556b2f] focus:outline-none focus:ring-2 focus:ring-[#f4c430]"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-[#f4c430] text-[#556b2f] font-semibold rounded-lg hover:bg-[#e6b82e] transition-colors"
          >
            Login
          </button>
          <Link
            to="/"
            className="block w-full py-3 text-center border-2 border-[#556b2f] text-[#556b2f] font-semibold rounded-lg hover:bg-[#556b2f] hover:text-white transition-colors"
          >
            Go back to website
          </Link>
        </form>
      </motion.div>
    </div>
  );
}
