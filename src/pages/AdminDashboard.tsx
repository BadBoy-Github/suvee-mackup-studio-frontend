import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit, Plus, X, LogOut } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../utils/api';

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

interface Work {
  _id: string;
  customerName: string;
  photos: string[];
  description: string;
}

const emptyService = {
  name: '',
  description: '',
  category: '',
  price: '',
  image: '',
  isHD: false,
  isTop: false,
};

const emptyWork = {
  customerName: '',
  description: '',
  photos: '',
};

export default function AdminDashboard() {
  const { isAuthenticated, email, logout } = useAdmin();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'services' | 'works'>('services');

  const [services, setServices] = useState<Service[]>([]);
  const [works, setWorks] = useState<Work[]>([]);

  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceForm, setServiceForm] = useState(emptyService);

  const [workModalOpen, setWorkModalOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [workForm, setWorkForm] = useState(emptyWork);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const fetchServices = async () => {
    try {
      const res = await adminApi.get('/services');
      setServices(res.data);
    } catch (err) {
      setError('Failed to load services');
    }
  };

  const fetchWorks = async () => {
    try {
      const res = await adminApi.get('/works');
      setWorks(res.data);
    } catch (err) {
      setError('Failed to load works');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchServices();
      fetchWorks();
    }
  }, [isAuthenticated]);

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (editingService) {
        await adminApi.put(`/services/${editingService._id}`, serviceForm);
      } else {
        await adminApi.post('/services', serviceForm);
      }
      await fetchServices();
      setServiceModalOpen(false);
      setEditingService(null);
      setServiceForm(emptyService);
    } catch (err) {
      setError('Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    try {
      await adminApi.delete(`/services/${id}`);
      setServices(services.filter(s => s._id !== id));
    } catch (err) {
      setError('Failed to delete service');
    }
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      description: service.description,
      category: service.category,
      price: service.price,
      image: service.image || '',
      isHD: service.isHD,
      isTop: service.isTop,
    });
    setServiceModalOpen(true);
  };

  const handleSaveWork = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const photos = workForm.photos.split('\n').filter(url => url.trim() !== '');
      const payload = { ...workForm, photos };
      if (editingWork) {
        await adminApi.put(`/works/${editingWork._id}`, payload);
      } else {
        await adminApi.post('/works', payload);
      }
      await fetchWorks();
      setWorkModalOpen(false);
      setEditingWork(null);
      setWorkForm(emptyWork);
    } catch (err) {
      setError('Failed to save work');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWork = async (id: string) => {
    if (!confirm('Delete this work?')) return;
    try {
      await adminApi.delete(`/works/${id}`);
      setWorks(works.filter(w => w._id !== id));
    } catch (err) {
      setError('Failed to delete work');
    }
  };

  const handleEditWork = (work: Work) => {
    setEditingWork(work);
    setWorkForm({
      customerName: work.customerName,
      description: work.description,
      photos: work.photos.join('\n'),
    });
    setWorkModalOpen(true);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#fdf6e3] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#556b2f]">
              Admin Dashboard
            </h1>
            <p className="text-[#556b2f] opacity-70">{email}</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
            className="flex items-center gap-2 px-4 py-2 border-2 border-[#556b2f] text-[#556b2f] rounded-lg hover:bg-[#556b2f] hover:text-white transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
            <button
              onClick={() => setError("")}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}

        <div className="flex gap-4 mb-8 border-b-2 border-[#556b2f]">
          {["services", "works"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as "services" | "works")}
              className={`px-6 py-3 font-semibold uppercase tracking-wider transition-colors ${
                tab === t
                  ? "text-[#556b2f] border-b-2 border-[#f4c430] -mb-[2px]"
                  : "text-gray-600 hover:text-[#556b2f]"
              }`}
            >
              {t === "services" ? "Services" : "Works"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "services" ? (
            <motion.div
              key="services"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setEditingService(null);
                    setServiceForm(emptyService);
                    setServiceModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#f4c430] text-[#556b2f] font-semibold rounded-lg hover:bg-[#e6b82e] transition-colors"
                >
                  <Plus size={18} />
                  Add Service
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#f5e6d3] rounded-xl p-6 border-2 border-[#556b2f]"
              >
                {services.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-[#556b2f] text-lg font-medium">
                      No services yet.
                    </p>
                    <p className="text-[#556b2f] opacity-70 mt-2">
                      Click "Add Service" to create your first service entry.
                    </p>
                  </div>
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
                            key={service._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="border-b border-[#556b2f]/20"
                          >
                            <td className="py-3 px-4 text-[#556b2f] font-medium">
                              {service.name}
                            </td>
                            <td className="py-3 px-4 text-[#556b2f]">
                              {service.category}
                            </td>
                            <td className="py-3 px-4 text-[#556b2f]">
                              {service.price}
                            </td>
                            <td className="py-3 px-4 text-[#556b2f]">
                              {service.isHD ? "Yes" : "No"}
                            </td>
                            <td className="py-3 px-4 text-[#556b2f]">
                              {service.isTop ? "Yes" : "No"}
                            </td>
                            <td className="py-3 px-4 flex gap-2">
                              <button
                                onClick={() => handleEditService(service)}
                                className="p-2 text-[#556b2f] hover:bg-[#556b2f] hover:text-white rounded-lg transition-colors"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteService(service._id)}
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
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setEditingWork(null);
                    setWorkForm(emptyWork);
                    setWorkModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#f4c430] text-[#556b2f] font-semibold rounded-lg hover:bg-[#e6b82e] transition-colors"
                >
                  <Plus size={18} />
                  Add Work
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {works.length === 0 ? (
                  <div className="col-span-full bg-[#f5e6d3] rounded-xl py-8 border-2 border-[#556b2f] text-center">
                    <p className="text-[#556b2f] text-lg font-medium">
                      No works yet.
                    </p>
                    <p className="text-[#556b2f] opacity-70 mt-2">
                      Click "Add Work" to create your first work entry.
                    </p>
                  </div>
                ) : (
                  works.map((work) => (
                    <motion.div
                      key={work._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-[#f5e6d3] rounded-xl p-6 border-2 border-[#556b2f] flex flex-col"
                    >
                      <h3 className="text-xl font-bold text-[#556b2f] mb-2">
                        {work.customerName}
                      </h3>
                      <p className="text-gray-700 mb-4 flex-grow">
                        {work.description}
                      </p>
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
                          onClick={() => handleDeleteWork(work._id)}
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

        {/* Service Modal */}
        <AnimatePresence>
          {serviceModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setServiceModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#f5e6d3] rounded-2xl border-2 border-[#556b2f] p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#556b2f]">
                    {editingService ? "Edit Service" : "Add New Service"}
                  </h2>
                  <button
                    onClick={() => setServiceModalOpen(false)}
                    className="p-1 text-[#556b2f] hover:bg-[#556b2f] hover:text-white rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleSaveService} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#556b2f] mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={serviceForm.name}
                      onChange={(e) =>
                        setServiceForm({ ...serviceForm, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-[#556b2f] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f4c430]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#556b2f] mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={serviceForm.category}
                      onChange={(e) =>
                        setServiceForm({
                          ...serviceForm,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-[#556b2f] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f4c430]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#556b2f] mb-1">
                      Price
                    </label>
                    <input
                      type="text"
                      value={serviceForm.price}
                      onChange={(e) =>
                        setServiceForm({
                          ...serviceForm,
                          price: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-[#556b2f] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f4c430]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#556b2f] mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={serviceForm.image}
                      onChange={(e) =>
                        setServiceForm({
                          ...serviceForm,
                          image: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-[#556b2f] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f4c430]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#556b2f] mb-1">
                      Description
                    </label>
                    <textarea
                      value={serviceForm.description}
                      onChange={(e) =>
                        setServiceForm({
                          ...serviceForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-[#556b2f] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f4c430]"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 text-[#556b2f]">
                      <input
                        type="checkbox"
                        checked={serviceForm.isHD}
                        onChange={(e) =>
                          setServiceForm({
                            ...serviceForm,
                            isHD: e.target.checked,
                          })
                        }
                        className="accent-[#f4c430]"
                      />
                      HD
                    </label>
                    <label className="flex items-center gap-2 text-[#556b2f]">
                      <input
                        type="checkbox"
                        checked={serviceForm.isTop}
                        onChange={(e) =>
                          setServiceForm({
                            ...serviceForm,
                            isTop: e.target.checked,
                          })
                        }
                        className="accent-[#f4c430]"
                      />
                      Top
                    </label>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 px-4 py-2 bg-[#f4c430] text-[#556b2f] font-semibold rounded-lg hover:bg-[#e6b82e] transition-colors disabled:opacity-50"
                    >
                      {editingService ? "Update" : "Add"} Service
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setServiceModalOpen(false);
                        setEditingService(null);
                        setServiceForm(emptyService);
                      }}
                      className="px-4 py-2 border-2 border-[#556b2f] text-[#556b2f] rounded-lg hover:bg-[#556b2f] hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Work Modal */}
        <AnimatePresence>
          {workModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setWorkModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#f5e6d3] rounded-2xl border-2 border-[#556b2f] p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#556b2f]">
                    {editingWork ? "Edit Work" : "Add New Work"}
                  </h2>
                  <button
                    onClick={() => setWorkModalOpen(false)}
                    className="p-1 text-[#556b2f] hover:bg-[#556b2f] hover:text-white rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleSaveWork} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#556b2f] mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      value={workForm.customerName}
                      onChange={(e) =>
                        setWorkForm({
                          ...workForm,
                          customerName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-[#556b2f] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f4c430]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#556b2f] mb-1">
                      Description
                    </label>
                    <textarea
                      value={workForm.description}
                      onChange={(e) =>
                        setWorkForm({
                          ...workForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-[#556b2f] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f4c430]"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#556b2f] mb-1">
                      Photos (one URL per line)
                    </label>
                    <textarea
                      value={workForm.photos}
                      onChange={(e) =>
                        setWorkForm({ ...workForm, photos: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-[#556b2f] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f4c430]"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 px-4 py-2 bg-[#f4c430] text-[#556b2f] font-semibold rounded-lg hover:bg-[#e6b82e] transition-colors disabled:opacity-50"
                    >
                      {editingWork ? "Update" : "Add"} Work
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setWorkModalOpen(false);
                        setEditingWork(null);
                        setWorkForm(emptyWork);
                      }}
                      className="px-4 py-2 border-2 border-[#556b2f] text-[#556b2f] rounded-lg hover:bg-[#556b2f] hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
