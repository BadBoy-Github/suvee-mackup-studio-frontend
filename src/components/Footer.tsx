import { Link } from 'react-router-dom';
import { Globe, Share2, Heart, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Works', path: '/works' },
  { name: 'About', path: '/about' },
];

const socialLinks = [
  { icon: Globe, href: '#', label: 'Website' },
  { icon: Share2, href: '#', label: 'Share' },
  { icon: Heart, href: '#', label: 'Favorite' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-sandal to-cream/50 min-h-[80vh] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div className="space-y-6 animate-slideInLeft">
            <h3 className="text-4xl md:text-5xl font-bold text-olive leading-tight">
              Ready to look <span className="text-yellow">stunning</span>?
            </h3>
            <p className="text-olive-dark/70 text-lg max-w-lg">
              Let us create magic for your special day. Book your appointment today and experience the art of bridal elegance.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/919842852121"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-olive text-white px-6 py-3 rounded-full font-medium hover:bg-olive-dark transition-all hover:scale-105 shadow-lg shadow-olive/20"
              >
                <Phone className="w-5 h-5" />
                Book Now
              </a>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border-2 border-olive text-olive px-6 py-3 rounded-full font-medium hover:bg-olive hover:text-white transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="space-y-8 animate-slideInRight">
            <div>
              <h4 className="text-lg font-semibold text-olive mb-4">Quick Links</h4>
              <nav className="grid grid-cols-2 gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center gap-2 text-olive-dark/70 hover:text-olive transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 text-yellow group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-olive mb-4">Connect With Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 rounded-full bg-white border border-olive/20 flex items-center justify-center text-olive hover:bg-olive hover:text-white transition-all hover:scale-110 shadow-md"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-olive mb-4">Contact Info</h4>
              <div className="space-y-2 text-olive-dark/70">
                <a href="mailto:contact@suveemakeup.com" className="flex items-center gap-2 hover:text-olive transition-colors">
                  <Mail className="w-4 h-4 text-yellow" />
                  contact@suveemakeup.com
                </a>
                <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-olive transition-colors">
                  <Phone className="w-4 h-4 text-yellow" />
                  +91 98765 43210
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-yellow" />
                  Erode, Tamil Nadu, India
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-olive/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-olive">Suvee<span className="text-yellow">Makeup</span></span>
              <span className="text-olive-dark/50 text-sm">© {new Date().getFullYear()} All rights reserved.</span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/terms" className="text-olive-dark/70 hover:text-olive transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="text-olive-dark/70 hover:text-olive transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
