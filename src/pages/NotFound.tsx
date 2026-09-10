import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf6e3] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-7xl font-bold text-[#556b2f] mb-4">404</h1>
        <p className="text-xl text-[#556b2f] mb-8">Oops! Page not found</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-[#f4c430] text-[#556b2f] font-semibold rounded-lg hover:bg-[#e6b82e] transition-colors"
        >
          Go back to website
        </Link>
      </motion.div>
    </div>
  );
}
