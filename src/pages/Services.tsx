import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import { api } from '../utils/api';

interface Service {
  _id: string;
  title: string;
  subtitle: string;
  price: string;
  description?: string;
  incl?: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        if (Array.isArray(res.data)) {
          setServices(res.data);
        }
      } catch (err) {
        console.error('Failed to load services', err);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch = service.title.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  }, [search, services]);

  const renderDescription = (desc?: string) => {
    if (!desc) return null;
    return desc.split(';').map((line, idx) => (
      <p key={idx} className="mb-1">{line.trim()}</p>
    ));
  };

  return (
    <div className="min-h-screen bg-sandal pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-olive mb-12"
        >
          Our Services
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-olive-dark/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-12 pr-4 py-4 rounded-full border border-olive/20 focus:border-olive focus:ring-2 focus:ring-olive/20 outline-none transition-all shadow-sm"
            />
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#f5e6d3] flex items-center justify-center">
                  <span className="text-[#556b2f] font-bold text-2xl text-center px-4">{service.title}</span>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-olive/10 text-olive text-xs font-medium mb-3">
                    {service.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-olive mb-2">{service.title}</h3>
                  <div className="text-olive-dark/70 text-sm mb-4">
                    {renderDescription(service.description)}
                  </div>
                  {service.incl && (
                    <p className="text-olive-dark/70 text-xs mb-4">Incl: {service.incl}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-olive font-bold">{service.price}</span>
                    <ChevronRight className="w-5 h-5 text-olive" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-olive-dark/50">No services found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
