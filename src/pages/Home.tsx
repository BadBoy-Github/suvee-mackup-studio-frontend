import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, ChevronRight, Star, Sparkles, Heart, Camera, Award } from 'lucide-react';
import { api } from '../utils/api';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const services = [
  {
    name: 'Bridal Makeup',
    description: 'A flawless bridal look that enhances your natural beauty for your special day.',
    image: 'https://placehold.co/600x400/olive/white?text=Bridal+Makeup',
  },
  {
    name: 'Bridesmaid Makeup',
    description: 'Elegant and complementary looks perfect for the bridal party.',
    image: 'https://placehold.co/600x400/yellow/white?text=Bridesmaid+Makeup',
  },
  {
    name: 'Groom Makeup',
    description: 'Polished and refined grooming services for the groom and groomsmen.',
    image: 'https://placehold.co/600x400/olive/white?text=Groom+Makeup',
  },
];

const reviews = [
  {
    name: 'Priya Sharma',
    rating: 5,
    comment: 'Absolutely stunning! My bridal makeup was flawless and lasted the entire day. Highly recommend Suvee Makeup Studios!',
    avatar: 'https://placehold.co/100x100/olive/white?text=PS',
  },
  {
    name: 'Anita Reddy',
    rating: 5,
    comment: 'The team is so professional and creative. They made me feel like a princess on my wedding day.',
    avatar: 'https://placehold.co/100x100/yellow/white?text=AR',
  },
  {
    name: 'Meera Krishnan',
    rating: 5,
    comment: 'Best makeup artists in Erode! The trial session was thorough and the final result exceeded my expectations.',
    avatar: 'https://placehold.co/100x100/olive/white?text=MK',
  },
  {
    name: 'Divya Iyer',
    rating: 4,
    comment: 'Gorgeous makeup and wonderful staff. The only reason for 4 stars is the waiting time, but totally worth it.',
    avatar: 'https://placehold.co/100x100/yellow/white?text=DI',
  },
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    context: 'Bridal Makeup',
    message: '',
  });
  const [status, setStatus] = useState({ submitting: false, success: null as string | null, error: null as string | null });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, success: null, error: null });

    try {
      await api.post('/contact', formData);
      setStatus({ submitting: false, success: 'Message sent successfully!', error: null });
      setFormData({ name: '', email: '', phone: '', context: 'Bridal Makeup', message: '' });
    } catch (error) {
      setStatus({ submitting: false, success: null, error: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <div className="overflow-x-hidden">
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sandal via-cream/30 to-sandal overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 left-10 text-yellow/20"
          >
            <Sparkles className="w-16 h-16" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-40 right-20 text-olive/10"
          >
            <Heart className="w-24 h-24" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-32 left-1/4 text-yellow/15"
          >
            <Camera className="w-20 h-20" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-20 right-1/3 text-olive/10"
          >
            <Award className="w-16 h-16" />
          </motion.div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-olive mb-6 leading-tight"
          >
            Where Beauty Meets <span className="text-yellow">Elegance</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.2 }}
            variants={fadeInUp}
            className="text-lg md:text-xl text-olive-dark/70 mb-10 max-w-2xl mx-auto"
          >
            Experience the finest bridal makeup artistry in Erode. Let us transform your special day with elegance, grace, and timeless beauty that leaves a lasting impression.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.4 }}
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-olive text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-olive-dark transition-all hover:scale-105 shadow-lg shadow-olive/20"
            >
              Explore Services
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              to="/works"
              className="inline-flex items-center gap-2 border-2 border-olive text-olive px-8 py-4 rounded-full font-semibold text-lg hover:bg-olive hover:text-white transition-all"
            >
              View Our Work
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-sandal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center text-olive mb-16"
          >
            Our Top Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                variants={scaleIn}
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
                  <h3 className="text-2xl font-bold text-olive mb-3">{service.name}</h3>
                  <p className="text-olive-dark/70 mb-6 line-clamp-2">{service.description}</p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 text-olive font-semibold group/link"
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              variants={scaleIn}
            >
              <Link
                to="/services"
                className="block h-full bg-gradient-to-br from-olive/5 to-yellow/5 rounded-3xl border-2 border-dashed border-olive/30 flex items-center justify-center hover:border-olive hover:bg-olive/5 transition-all duration-500 min-h-[320px]"
              >
                <div className="text-center p-6">
                  <Sparkles className="w-12 h-12 text-yellow mx-auto mb-4" />
                  <span className="text-xl font-bold text-olive">See All Services</span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center text-olive mb-12"
          >
            Our Recent Works
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={fadeInUp}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-80 snap-center"
              >
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <img
                    src={`https://placehold.co/400x500/olive/white?text=Work+${i}`}
                    alt={`Work ${i}`}
                    className="w-full h-96 object-cover"
                  />
                </div>
              </div>
            ))}
          </motion.div>
          <div className="text-center mt-8">
            <Link
              to="/works"
              className="inline-flex items-center gap-2 bg-olive text-white px-8 py-3 rounded-full font-semibold hover:bg-olive-dark transition-all hover:scale-105"
            >
              See All Works
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-sandal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center text-olive mb-16"
          >
            What Our Clients Say
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={fadeInUp}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review) => (
              <div
                key={review.name}
                className="flex-shrink-0 w-80 snap-center bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-yellow"
                  />
                  <div>
                    <h4 className="font-bold text-olive">{review.name}</h4>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow text-yellow" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-olive-dark/70 italic">"{review.comment}"</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center text-olive mb-16"
          >
            Contact Us
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={fadeInUp}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-olive mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-olive/20 focus:border-olive focus:ring-2 focus:ring-olive/20 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-olive mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-olive/20 focus:border-olive focus:ring-2 focus:ring-olive/20 outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-olive mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-olive/20 focus:border-olive focus:ring-2 focus:ring-olive/20 outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-olive mb-2">Context</label>
                  <select name="context" value={formData.context} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-olive/20 focus:border-olive focus:ring-2 focus:ring-olive/20 outline-none transition-all">
                    <option>Bridal Makeup</option>
                    <option>Bridesmaid Makeup</option>
                    <option>Groom Makeup</option>
                    <option>Hair Do</option>
                    <option>Saree Do</option>
                    <option>Mehndi</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-olive mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-olive/20 focus:border-olive focus:ring-2 focus:ring-olive/20 outline-none transition-all resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                {status.success && (
                  <div className="p-4 rounded-xl bg-green-50 text-green-700 text-sm font-medium">
                    {status.success}
                  </div>
                )}
                {status.error && (
                  <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm font-medium">
                    {status.error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full bg-olive text-white py-4 rounded-xl font-semibold hover:bg-olive-dark transition-all hover:scale-[1.02] shadow-lg shadow-olive/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              variants={fadeInUp}
              className="space-y-8"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-olive mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-olive" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-olive">Phone</h4>
                      <a href="tel:+919876543210" className="text-olive-dark/70 hover:text-olive transition-colors">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-olive" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-olive">Email</h4>
                      <a href="mailto:contact@suveemakeup.com" className="text-olive-dark/70 hover:text-olive transition-colors">
                        contact@suveemakeup.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-olive">WhatsApp</h4>
                      <a
                        href="https://wa.me/919876543210"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-olive-dark/70 hover:text-olive transition-colors"
                      >
                        Chat with us on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
