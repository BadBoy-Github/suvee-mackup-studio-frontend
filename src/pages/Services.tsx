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
  heroImage?: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState('');
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

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

  const handleCardClick = (id: string) => {
    setActiveServiceId(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-sandal pt-24 pb-12">
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
            {filteredServices.map((service, index) => {
              const isActive = activeServiceId === service._id;
              return (
                <motion.div
                  key={service._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  style={{ height: '60vh' }}
                  onClick={() => handleCardClick(service._id)}
                >
                  <div className="absolute inset-0 flex flex-col">
                    <div className="h-[70%] w-full overflow-hidden">
                      <img
                        src={service.heroImage || 'https://placehold.co/600x400/556b2f/ffffff?text=Service'}
                        alt={service.title}
                        className="w-full h-full object-cover transition-all duration-500"
                      />
                    </div>
                    <div className="h-[30%] w-full p-4 flex flex-col justify-center">
                      <h3 className="text-lg font-bold text-olive truncate">{service.title}</h3>
                      <p className="text-olive-dark/70 text-sm truncate">{service.subtitle}</p>
                      <span className="text-olive font-bold text-sm">{service.price}</span>
                    </div>
                  </div>

                  <div className={`absolute inset-0 bg-olive/90 flex items-center justify-center p-6 text-center z-10 transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-full'} md:group-hover:translate-y-0`}>
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-white/80 text-sm mb-2">{service.subtitle}</p>
                      <p className="text-yellow font-bold text-lg mb-3">{service.price}</p>
                      {renderDescription(service.description)}
                      {service.incl && (
                        <p className="text-white/70 text-xs mt-2">Incl: {service.incl}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
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