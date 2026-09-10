import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import { api } from '../utils/api';

interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  image: string;
  isHD: boolean;
  isTop: boolean;
}

const tags = ['All', 'Bridal', 'Bridesmaid', 'Groom', 'Hair', 'Saree', 'Mehndi'];

const defaultServices: Service[] = [
  {
    _id: 'default-1',
    name: 'Bridal Makeup',
    category: 'Bridal',
    description: 'A flawless bridal look that enhances your natural beauty for your special day.',
    fullDescription: 'Our premium bridal makeup service includes a detailed skin analysis, HD makeup application, hair styling, draping, and touch-up services. We use only premium products to ensure your makeup lasts all day and looks perfect in every photo.',
    price: 'From ₹15,000',
    image: 'https://placehold.co/600x400/olive/white?text=Bridal+Makeup',
    isHD: true,
    isTop: true,
  },
  {
    _id: 'default-2',
    name: 'Bridesmaid Makeup',
    category: 'Bridesmaid',
    description: 'Elegant and complementary looks perfect for the bridal party.',
    fullDescription: 'Beautiful makeup packages for bridesmaids that complement the bridal look while maintaining individual style. Includes skin prep, makeup application, and basic hair styling.',
    price: 'From ₹8,000',
    image: 'https://placehold.co/600x400/yellow/white?text=Bridesmaid+Makeup',
    isHD: false,
    isTop: false,
  },
  {
    _id: 'default-3',
    name: 'Groom Makeup',
    category: 'Groom',
    description: 'Polished and refined grooming services for the groom and groomsmen.',
    fullDescription: 'Professional grooming services for the groom including clean shave, facial, hair styling, and subtle makeup to ensure you look your best on your big day.',
    price: 'From ₹5,000',
    image: 'https://placehold.co/600x400/olive/white?text=Groom+Makeup',
    isHD: false,
    isTop: false,
  },
  {
    _id: 'default-4',
    name: 'Hair Do',
    category: 'Hair',
    description: 'Trendy and classic hairstyles for every occasion.',
    fullDescription: 'From traditional buns to modern curls, our hairstylists create stunning looks that complement your outfit and face shape. Includes hair treatment and styling.',
    price: 'From ₹3,000',
    image: 'https://placehold.co/600x400/yellow/white?text=Hair+Do',
    isHD: false,
    isTop: false,
  },
  {
    _id: 'default-5',
    name: 'Saree Do',
    category: 'Saree',
    description: 'Expert draping services for a perfect and elegant saree look.',
    fullDescription: 'Professional saree draping in various styles including Nivi, Bengali, Gujarati, and more. We ensure perfect pleats and comfortable draping that stays all day.',
    price: 'From ₹2,000',
    image: 'https://placehold.co/600x400/olive/white?text=Saree+Do',
    isHD: false,
    isTop: false,
  },
  {
    _id: 'default-6',
    name: 'Mehndi',
    category: 'Mehndi',
    description: 'Intricate mehndi designs for hands and feet.',
    fullDescription: 'Beautiful mehndi designs ranging from traditional to contemporary patterns. Our artists create stunning designs that complement your bridal or party look.',
    price: 'From ₹1,500',
    image: 'https://placehold.co/600x400/yellow/white?text=Mehndi',
    isHD: false,
    isTop: false,
  },
  {
    _id: 'default-7',
    name: 'Party Makeup',
    category: 'Bridal',
    description: 'Glamorous makeup for parties and special occasions.',
    fullDescription: 'Perfect for birthdays, anniversaries, and special occasions. Our party makeup service gives you a stunning look that stands out.',
    price: 'From ₹4,000',
    image: 'https://placehold.co/600x400/olive/white?text=Party+Makeup',
    isHD: false,
    isTop: false,
  },
  {
    _id: 'default-8',
    name: 'Pre-Wedding Shoot',
    category: 'Bridal',
    description: 'Complete hair and makeup packages for pre-wedding photoshoots.',
    fullDescription: 'Look stunning in your pre-wedding photos with our specialized makeup packages. Includes multiple looks, hair styling, and touch-up services during the shoot.',
    price: 'From ₹12,000',
    image: 'https://placehold.co/600x400/yellow/white?text=Pre+Wedding',
    isHD: false,
    isTop: false,
  },
];

export default function Services() {
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        if (Array.isArray(res.data) && res.data.length > 0) {
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
      const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase());
      const matchesTag = activeTag === 'All' || service.category === activeTag;
      return matchesSearch && matchesTag;
    });
  }, [search, activeTag, services]);

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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTag === tag
                  ? 'bg-olive text-white shadow-lg shadow-olive/20'
                  : 'bg-white text-olive border border-olive/20 hover:border-olive hover:bg-olive/5'
              }`}
            >
              {tag}
            </button>
          ))}
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
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-olive/10 text-olive text-xs font-medium mb-3">
                    {service.category}
                  </span>
                  <h3 className="text-xl font-bold text-olive mb-2">{service.name}</h3>
                  <p className="text-olive-dark/70 text-sm mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-olive font-bold">{service.price}</span>
                    <ChevronRight className="w-5 h-5 text-olive" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-olive/95 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-8 text-center">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">{service.name}</h3>
                    <p className="text-white/80 mb-6">{service.fullDescription || service.description}</p>
                    <span className="text-yellow font-bold text-lg">{service.price}</span>
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
