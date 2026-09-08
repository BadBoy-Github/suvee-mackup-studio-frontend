import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit, Plus, Save, X } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  imageUrl: string;
  isHD: boolean;
  isTop: boolean;
}

interface Work {
  id: string;
  customerName: string;
  description: string;
  photos: string[];
}

const STORAGE_KEYS = {
  services: 'adminServices',
  works: 'adminWorks',
};

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'services' | 'works'>('services');

  const [services, setServices] = useState<Service[]>([]);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    imageUrl: '',
    isHD: false,
    isTop: false,
  });
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  const [works, setWorks] = useState<Work[]>([]);
  const [workForm, setWorkForm] = useState({
    customerName: '',
    description: '',
    photos: '',
  });
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const savedServices = localStorage.getItem(STORAGE_KEYS.services);
    if (savedServices) setServices(JSON.parse(savedServices));

    const savedWorks = localStorage.getItem(STORAGE_KEYS.works);
    if (savedWorks) setWorks(JSON.parse(savedWorks));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.services, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.works, JSON.stringify(works));
  }, [works]);

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingServiceId) {
      setServices(services.map(s => s.id === editingServiceId ? { ...serviceForm, id: editingServiceId } : s));
      setEditingServiceId(null);
    } else {
      setServices([...services, { ...serviceForm, id: Date.now().toString() }]);
    }
    setServiceForm({ name: '', description: '', category: '', price: '', imageUrl: '', isHD: false, isTop: false });
  };

  const handleEditService = (service: Service) => {
    setEditingServiceId(service.id);
    setServiceForm({
      name: service.name,
      description: service.description,
      category: service.category,
      price: service.price,
      imageUrl: service.imageUrl,
      isHD: service.isHD,
      isTop: service.isTop,
    });
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
    if (editingServiceId === id) {
      setEditingServiceId(null);
      setServiceForm({ name: '', description: '', category: '', price: '', imageUrl: '', isHD: false, isTop: false });
    }
  };

  const handleAddWork = (e: React.FormEvent) => {
    e.preventDefault();
    const photos = workForm.photos.split('\n').filter(url => url.trim() !== '');
    if (editingWorkId) {
      setWorks(works.map(w => w.id === editingWorkId ? { ...workForm, id: editingWorkId, photos } : w));
      setEditingWorkId(null);
    } else {
      setWorks([...works, { ...workForm, id: Date.now().toString(), photos }]);
    }
    setWorkForm({ customerName: '', description: '', photos: '' });
  };

  const handleEditWork = (work: Work) => {
    setEditingWorkId(work.id);
    setWorkForm({
      customerName: work.customerName,
      description: work.description,
      photos: work.photos.join('\n'),
    });
  };

  const handleDeleteWork = (id: string) => {
    setWorks(works.filter(w => w.id !== id));
    if (editingWorkId === id) {
      setEditingWorkId(null);
      setWorkForm({ customerName: '', description: '', photos: '' });
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#fdf6e3] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#556b2f]">Admin Dashboard</h1>
          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="px-4 py-2 border-2 border-[#556b2f] text-[#556b2f] rounded-lg hover:bg-[#556b2f] hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8 border-b-2 border-[#556b2f]">
          {['services', 'works'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as 'services' | 'works')}
              className={`px-6 py-3 font-semibold uppercase tracking-wider transition-colors ${
                tab === t
                  ? 'text-[#556b2f] border-b-2 border-[#f4c430] -mb-[2px]'
                  : 'text-gray-600 hover:text-[#556b2f]'
              }`}
            >
              {t === 'services' ? 'Services' : 'Works'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'services' ? (
            <motion.div
              key="services"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#f5e6d3] rounded-xl p-6 border-2 border-[#556b2f]"
              >
                <h2 className="text-xl font-bold text-[#556b2f] mb-4">
                  {editingServiceId ? 'Edit Service' : 'Add New Service'}
                </h2>
                <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Service Name"
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                    className="px-4 py-2 border border-[#556b2f] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f4c430]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="px-4 py-2 border border-[#556b2f] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f4c430]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Price"
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                    className="px-4 py-2 border border-[#556b2f] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f4c430]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={serviceForm.imageUrl}
                    onChange={(e) => setServiceForm({ ...serviceForm, imageUrl: e.target.value })}
                    className="px-4 py-2 border border-[#556b2f] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f4c430]"
                  />
                  <textarea
                    placeholder="Description"
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                    className="px-4 py-2 border border-[#556b2f] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f4c430] md:col-span-2"
                    rows={3}
                  />
                  <div className="flex gap-4 md:col-span-2">
                    <label className="flex items-center gap-2 text-[#556b2f]">
                      <input
                        type="checkbox"
                        checked={serviceForm.isHD}
                        onChange={(e) => setServiceForm({ ...serviceForm, isHD: e.target.checked })}
                        className="accent-[#f4c430]"
                      />
                      HD
                    </label>
                    <label className="flex items-center gap-2 text-[#556b2f]">
                      <input
                        type="checkbox"
                        checked={serviceForm.isTop}
                        onChange={(e) => setServiceForm({ ...serviceForm, isTop: e.target.checked })}
                        className="accent-[#f4c430]"
                      />
                      Top
                    </label>
                  </div>
                  <div className="flex gap-2 md:col-span-2">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-4 py-2 bg-[#f4c430] text-[#556b2f] font-semibold rounded-lg hover:bg-[#e6b82e] transition-colors"
                    >
                      {editingServiceId ? <Save size={18} /> : <Plus size={18} />}
                      {editingServiceId ? 'Update' : 'Add'} Service
                    </button>
                    {editingServiceId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingServiceId(null);
                          setServiceForm({ name: '', description: '', category: '', price: '', imageUrl: '', isHD: false, isTop: false });
                        }}
                        className="flex items-center gap-2 px-4 py-2 border-2 border-[#556b2f] text-[#556b2f] rounded-lg hover:bg-[#556b2f] hover:text-white transition-colors"
                      >
                        <X size={18} />
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#f5e6d3] rounded-xl p-6 border-2 border-[#556b2f]"
              >
                <h2 className="text-xl font-bold text-[#556b2f] mb-4">Services</h2>
                {services.length === 0 ? (
                  <p className="text-gray-600">No services yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b-2 border-[#556b2f]">
                          <th className="py-2 px-4 text-[#556b2f]">Name</th>
                          <th className="py-2 px-4 text-[#556b2f]">Category</th>
                          <th className="py-2 px-4 text-[#556b2f]">Price</th>
                          <th className="py-2 px-4 text-[#556b2f]">HD</th>
                          <th className="py-2 px-4 text-[#556b2f]">Top</th>
                          <th className="py-2 px-4 text-[#556b2f]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.map((service) => (
                          <motion.tr
                            key={service.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="border-b border-[#556b2f]/20"
                          >
                            <td className="py-3 px-4 text-[#556b2f] font-medium">{service.name}</td>
                            <td className="py-3 px-4 text-[#556b2f]">{service.category}</td>
                            <td className="py-3 px-4 text-[#556b2f]">{service.price}</td>
                            <td className="py-3 px-4 text-[#556b2f]">{service.isHD ? 'Yes' : 'No'}</td>
                            <td className="py-3 px-4 text-[#556b2f]">{service.isTop ? 'Yes' : 'No'}</td>
                            <td className="py-3 px-4 flex gap-2">
                              <button
                                onClick={() => handleEditService(service)}
                                className="p-2 text-[#556b2f] hover:bg-[#556b2f] hover:text-white rounded-lg transition-colors"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteService(service.id)}
                                className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="works"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#f5e6d3] rounded-xl p-6 border-2 border-[#556b2f]"
              >
                <h2 className="text-xl font-bold text-[#556b2f] mb-4">
                  {editingWorkId ? 'Edit Work' : 'Add New Work'}
                </h2>
                <form onSubmit={handleAddWork} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Customer Name"
                    value={workForm.customerName}
                    onChange={(e) => setWorkForm({ ...workForm, customerName: e.target.value })}
                    className="w-full px-4 py-2 border border-[#556b2f] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f4c430]"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={workForm.description}
                    onChange={(e) => setWorkForm({ ...workForm, description: e.target.value })}
                    className="w-full px-4 py-2 border border-[#556b2f] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f4c430]"
                    rows={3}
                  />
                  <textarea
                    placeholder="Photos (one URL per line)"
                    value={workForm.photos}
                    onChange={(e) => setWorkForm({ ...workForm, photos: e.target.value })}
                    className="w-full px-4 py-2 border border-[#556b2f] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f4c430]"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-4 py-2 bg-[#f4c430] text-[#556b2f] font-semibold rounded-lg hover:bg-[#e6b82e] transition-colors"
                    >
                      {editingWorkId ? <Save size={18} /> : <Plus size={18} />}
                      {editingWorkId ? 'Update' : 'Add'} Work
                    </button>
                    {editingWorkId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingWorkId(null);
                          setWorkForm({ customerName: '', description: '', photos: '' });
                        }}
                        className="flex items-center gap-2 px-4 py-2 border-2 border-[#556b2f] text-[#556b2f] rounded-lg hover:bg-[#556b2f] hover:text-white transition-colors"
                      >
                        <X size={18} />
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {works.length === 0 ? (
                  <p className="text-gray-600 col-span-full">No works yet.</p>
                ) : (
                  works.map((work) => (
                    <motion.div
                      key={work.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-[#f5e6d3] rounded-xl p-6 border-2 border-[#556b2f] flex flex-col"
                    >
                      <h3 className="text-xl font-bold text-[#556b2f] mb-2">{work.customerName}</h3>
                      <p className="text-gray-700 mb-4 flex-grow">{work.description}</p>
                      {work.photos.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {work.photos.slice(0, 4).map((photo, idx) => (
                            <img
                              key={idx}
                              src={photo}
                              alt={`Photo ${idx + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={() => handleEditWork(work)}
                          className="flex items-center gap-1 px-3 py-2 text-[#556b2f] border border-[#556b2f] rounded-lg hover:bg-[#556b2f] hover:text-white transition-colors"
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteWork(work.id)}
                          className="flex items-center gap-1 px-3 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
