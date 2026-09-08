import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, MapPin, Globe, Share2, Heart, Award, Users, Sparkles } from 'lucide-react';

const team = [
  {
    name: 'Suvee Priya',
    role: 'Founder & Lead Makeup Artist',
    photo: 'https://placehold.co/300x300/olive/white?text=SP',
  },
  {
    name: 'Anita Devi',
    role: 'Senior Makeup Artist',
    photo: 'https://placehold.co/300x300/yellow/white?text=AD',
  },
  {
    name: 'Kavya Nair',
    role: 'Hair Stylist',
    photo: 'https://placehold.co/300x300/olive/white?text=KN',
  },
  {
    name: 'Meera Kumari',
    role: 'Mehndi Artist',
    photo: 'https://placehold.co/300x300/yellow/white?text=MK',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <div className="min-h-screen bg-sandal pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold text-center text-olive mb-6"
        >
          About Suvee Makeup Studios
        </motion.h1>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <p className="text-lg text-olive-dark/70 leading-relaxed">
            Suvee Makeup Studios is Erode's premier bridal makeup destination, founded with a passion for creating timeless beauty. With over a decade of experience, our team of skilled artists specializes in bridal makeup, hair styling, mehndi, and saree draping. We believe every bride deserves to feel like the most beautiful version of herself on her special day. Using only premium products and staying updated with the latest trends, we ensure a flawless, long-lasting look that photographs perfectly.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-olive mb-4">Our Team</h2>
          <p className="text-olive-dark/70 max-w-2xl mx-auto mb-12">
            Meet the talented artists behind every beautiful transformation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-yellow"
                />
                <h3 className="text-xl font-bold text-olive mb-1">{member.name}</h3>
                <p className="text-olive-dark/70 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-olive mb-12">Visit Us</h2>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15654.26446589243!2d77.7273!3d11.341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96fd5c4e7b8a1%3A0x9e3b8e8b5f6a7c8d!2sErode%2C%20Tamil%20Nadu%2C%20India!5e0!3m2!1sen!2sin!4v1690000000000"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map - Erode, Tamil Nadu, India"
            />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="mb-20"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-olive mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-olive" />
                    </div>
                    <div>
                      <p className="font-medium text-olive">Phone</p>
                      <a href="tel:+919876543210" className="text-olive-dark/70 hover:text-olive transition-colors">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-olive" />
                    </div>
                    <div>
                      <p className="font-medium text-olive">Email</p>
                      <a href="mailto:contact@suveemakeup.com" className="text-olive-dark/70 hover:text-olive transition-colors">
                        contact@suveemakeup.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-olive">WhatsApp</p>
                      <a
                        href="https://wa.me/919876543210"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-olive-dark/70 hover:text-olive transition-colors"
                      >
                        Chat with us
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-olive" />
                    </div>
                    <div>
                      <p className="font-medium text-olive">Location</p>
                      <p className="text-olive-dark/70">Erode, Tamil Nadu, India</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex gap-4 justify-center md:justify-start">
                  <a href="#" className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center text-olive hover:bg-olive hover:text-white transition-all hover:scale-110">
                    <Globe className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center text-olive hover:bg-olive hover:text-white transition-all hover:scale-110">
                    <Share2 className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center text-olive hover:bg-olive hover:text-white transition-all hover:scale-110">
                    <Heart className="w-6 h-6" />
                  </a>
                </div>
                <p className="text-center md:text-left mt-6 text-olive-dark/70">
                  Follow us on social media for the latest updates, bridal inspiration, and behind-the-scenes content.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {[
            { icon: Users, label: 'Happy Clients', value: '5000+' },
            { icon: Award, label: 'Years Experience', value: '10+' },
            { icon: Heart, label: 'Bridal Looks', value: '2000+' },
            { icon: Sparkles, label: 'Awards Won', value: '15+' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-10 h-10 text-yellow mx-auto mb-3" />
              <p className="text-3xl font-bold text-olive">{stat.value}</p>
              <p className="text-olive-dark/70 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
