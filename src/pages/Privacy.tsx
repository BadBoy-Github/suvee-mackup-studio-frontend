import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-sandal pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold text-center text-olive mb-12"
        >
          Privacy Policy
        </motion.h1>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          variants={fadeInUp}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl space-y-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-olive mb-4">Introduction</h2>
            <p className="text-olive-dark/70 leading-relaxed">
              Suvee Makeup Studios ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-olive mb-4">Information We Collect</h2>
            <p className="text-olive-dark/70 leading-relaxed">
              We may collect personal information such as your name, email address, phone number, and any other information you voluntarily provide when filling out a contact form, booking an appointment, or subscribing to our newsletter.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-olive mb-4">How We Use Your Information</h2>
            <p className="text-olive-dark/70 leading-relaxed">
              The information we collect is used to provide and improve our services, communicate with you about appointments and promotions, process payments, and enhance your overall experience. We do not sell or rent your personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-olive mb-4">Data Security</h2>
            <p className="text-olive-dark/70 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-olive mb-4">Cookies and Tracking</h2>
            <p className="text-olive-dark/70 leading-relaxed">
              Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can choose to disable cookies through your browser settings, but this may affect the functionality of our website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-olive mb-4">Third-Party Services</h2>
            <p className="text-olive-dark/70 leading-relaxed">
              We may use third-party services such as Google Maps for displaying our location. These third parties have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices of these third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-olive mb-4">Your Rights</h2>
            <p className="text-olive-dark/70 leading-relaxed">
              You have the right to access, correct, or delete your personal information. You may also opt out of receiving promotional communications from us by contacting us at contact@suveemakeup.com or using the unsubscribe link in our emails.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-olive mb-4">Changes to This Policy</h2>
            <p className="text-olive-dark/70 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-olive mb-4">Contact Us</h2>
            <p className="text-olive-dark/70 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy, please contact us at contact@suveemakeup.com or call +91 98765 43210.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
