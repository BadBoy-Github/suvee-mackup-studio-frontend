import { motion } from 'framer-motion';

const customers = [
  {
    name: 'Priya & Rahul',
    photos: [
      'https://placehold.co/600x400/olive/white?text=Work+1',
      'https://placehold.co/600x400/yellow/white?text=Work+2',
      'https://placehold.co/600x400/olive/white?text=Work+3',
      'https://placehold.co/600x400/yellow/white?text=Work+4',
    ],
  },
  {
    name: 'Anita & Vikram',
    photos: [
      'https://placehold.co/600x400/yellow/white?text=Work+5',
      'https://placehold.co/600x400/olive/white?text=Work+6',
      'https://placehold.co/600x400/yellow/white?text=Work+7',
      'https://placehold.co/600x400/olive/white?text=Work+8',
    ],
  },
  {
    name: 'Meera & Arjun',
    photos: [
      'https://placehold.co/600x400/olive/white?text=Work+9',
      'https://placehold.co/600x400/yellow/white?text=Work+10',
      'https://placehold.co/600x400/olive/white?text=Work+11',
      'https://placehold.co/600x400/yellow/white?text=Work+12',
    ],
  },
  {
    name: 'Divya & Karthik',
    photos: [
      'https://placehold.co/600x400/yellow/white?text=Work+13',
      'https://placehold.co/600x400/olive/white?text=Work+14',
      'https://placehold.co/600x400/yellow/white?text=Work+15',
      'https://placehold.co/600x400/olive/white?text=Work+16',
    ],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Works() {
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

        {customers.map((customer, customerIndex) => (
          <motion.div
            key={customer.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: customerIndex * 0.2 }}
            variants={fadeInUp}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-olive mb-8 text-center">{customer.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {customer.photos.map((photo, photoIndex) => (
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
                    alt={`${customer.name} - Photo ${photoIndex + 1}`}
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
