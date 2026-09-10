import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../utils/api';

interface Work {
  _id: string;
  groomName: string;
  brideName: string;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Works() {
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await api.get('/works');
        if (Array.isArray(res.data)) {
          setWorks(res.data);
        }
      } catch (err) {
        console.error('Failed to load works', err);
      }
    };
    fetchWorks();
  }, []);

  return (
    <div className="min-h-screen bg-sandal pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold text-center text-olive mb-20"
        >
          Our Portfolio
        </motion.h1>

        {works.map((work, customerIndex) => (
          <motion.div
            key={work._id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: customerIndex * 0.2 }}
            variants={fadeInUp}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-olive mb-8 text-center">{work.groomName} & {work.brideName}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[work.img1, work.img2, work.img3, work.img4].filter(Boolean).map((photo, photoIndex) => (
                <motion.div
                  key={photoIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: photoIndex * 0.1 }}
                  className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <img
                    src={photo}
                    alt={`${work.groomName} & ${work.brideName} - Photo ${photoIndex + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
