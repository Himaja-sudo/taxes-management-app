import { useState, useEffect } from 'react';
import Table from './components/Table';
import EditModal from './components/EditModal';
import Toast from './components/Toast';
import { TableSkeleton } from './components/SkeletonLoader';
import { fetchTaxes } from './api/api';
import type { Tax } from './types';

function App() {
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTax, setEditingTax] = useState<Tax | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({ message: '', type: 'info', isVisible: false });

  useEffect(() => {
    loadTaxes();
  }, []);

  const loadTaxes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTaxes();
      setTaxes(data);
    } catch (err) {
      setError('Failed to load taxes. Please refresh the page.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tax: Tax) => {
    setEditingTax(tax);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTax(null);
  };

  const handleSave = (updatedTax: Tax) => {
    setTaxes((prevTaxes) =>
      prevTaxes.map((tax) => (tax.id === updatedTax.id ? updatedTax : tax))
    );
    showToast('Tax updated successfully!', 'success');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Taxes Management</h1>
          <p className="text-sm text-gray-600">Manage and update tax information</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
          <div className="p-6 lg:p-8">
            {loading ? (
              <TableSkeleton />
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-400 p-5 rounded-r-lg">
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 text-red-400 mr-3 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-800 mb-1">{error}</p>
                    <button
                      onClick={loadTaxes}
                      className="mt-3 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Table data={taxes} onEdit={handleEdit} />
            )}
          </div>
        </div>
      </div>

      <EditModal
        tax={editingTax}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}

export default App;

