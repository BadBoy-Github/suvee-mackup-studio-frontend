import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Terms() {
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
          Terms & Conditions
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
            <h2 className="text-2xl font-bold text-olive mb-4">1. Acceptance of Terms</h2>
            <p className="text-olive-dark/70 leading-relaxed">
              By accessing or using the services provided by Suvee Makeup Studios, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-olive mb-4">2. Services</h2>
            <p className="text-olive-dark/70 leading-relaxed">
              Suvee Makeup Studios provides bridal makeup, hair styling, mehndi, saree draping, and related beauty services. All services are subject to availability and prior booking. We reserve the right to modify or discontinue any service at any time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-olive mb-4">3. Booking and Cancellation</h2>
            <p className="text-olive-dark/70 leading-relaxed">
              All bookings must be made in advance. Cancellations must be made at least 48 hours before the scheduled appointment to receive a full refund. Cancellations made within 48 hours of the appointment may be subject to a cancellation fee.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-olive mb-4">4. Payment Terms</h2>
            <p className="text-olive-dark/70 leading-relaxed">
              Payment is due at the time of booking or upon completion of services, as agreed upon during the booking process. We accept cash, credit/debit cards, and digital payment methods. Prices are subject to change without prior notice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-olive mb-4">5. Intellectual Property</h2>
            <p className="text-olive-dark/70 leading-relaxed">
              All content on this website, including images, text, logos, and designs, is the property of Suvee Makeup Studios and is protected by intellectual property laws. Unauthorized use or reproduction of any content is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-olive mb-4">6. Limitation of Liability</h2>
            <p className="text-olive-dark/70 leading-relaxed">
              Suvee Makeup Studios shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our liability is limited to the amount paid for the specific service in question.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-olive mb-4">7. Governing Law</h2>
            <p className="text-olive-dark/70 leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Erode, Tamil Nadu.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-olive mb-4">8. Contact Information</h2>
            <p className="text-olive-dark/70 leading-relaxed">
              If you have any questions about these Terms and Conditions, please contact us at contact@suveemakeup.com or call +91 98765 43210.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
