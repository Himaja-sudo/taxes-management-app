import { useState, useEffect } from 'react';
import type { Tax, Country } from '../types';
import { fetchCountries, updateTax } from '../api/api';

interface EditModalProps {
  tax: Tax | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTax: Tax) => void;
}

export default function EditModal({ tax, isOpen, onClose, onSave }: EditModalProps) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [countryError, setCountryError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && tax) {
      setName(tax.name || '');
      setCountry(tax.country || '');
      setError(null);
      setNameError(null);
      setCountryError(null);
    }
  }, [isOpen, tax]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) {
        handleClose();
      } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !loading && name.trim() && country) {
        e.preventDefault();
        // Call handleSave logic directly
        if (tax && validateForm()) {
          const saveTax = async () => {
            setLoading(true);
            setError(null);
            try {
              const updatedTax = {
                ...tax,
                name: name.trim(),
                country: country,
              };
              const savedTax = await updateTax(updatedTax);
              onSave(savedTax);
              onClose();
            } catch (err) {
              setError('Failed to save changes. Please try again.');
              console.error(err);
            } finally {
              setLoading(false);
            }
          };
          saveTax();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, loading, name, country, tax, onSave, onClose]);

  useEffect(() => {
    if (isOpen) {
      fetchCountries()
        .then(setCountries)
        .catch((err) => {
          setError('Failed to load countries');
          console.error(err);
        });
    }
  }, [isOpen]);

  const validateForm = () => {
    let isValid = true;
    
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError(null);
    }

    if (!country) {
      setCountryError('Country is required');
      isValid = false;
    } else {
      setCountryError(null);
    }

    return isValid;
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (nameError && value.trim()) {
      setNameError(null);
    }
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    if (countryError && value) {
      setCountryError(null);
    }
  };

  const handleSave = async () => {
    if (!tax) return;

    if (!validateForm()) {
      setError('Please fix the errors below');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedTax = {
        ...tax,
        name: name.trim(),
        country: country,
      };
      const savedTax = await updateTax(updatedTax);
      onSave(savedTax);
      onClose();
    } catch (err) {
      setError('Failed to save changes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  if (!isOpen || !tax) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) {
          handleClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Edit Tax</h2>
            <p className="text-sm text-gray-500 mt-0.5">Update tax information</p>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 py-6 space-y-5">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg animate-in slide-in-from-left duration-200">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-400 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              onBlur={() => {
                if (!name.trim()) {
                  setNameError('Name is required');
                }
              }}
              disabled={loading}
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 text-sm ${
                nameError
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="Enter tax name"
              autoFocus
            />
            {nameError && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {nameError}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Country <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => handleCountryChange(e.target.value)}
              onBlur={() => {
                if (!country) {
                  setCountryError('Country is required');
                }
              }}
              disabled={loading}
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 text-sm bg-white appearance-none cursor-pointer ${
                countryError
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300'
              }`}
            >
              <option value="">Select a country</option>
              {countries.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {countryError && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {countryError}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-5 border-t border-gray-200 bg-gray-50/50 rounded-b-2xl">
          <p className="text-xs text-gray-500">
            Press <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded">Esc</kbd> to close
            {' • '}
            <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded">Ctrl+Enter</kbd> to save
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleClose}
              disabled={loading}
              className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading || !name.trim() || !country}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 border border-transparent rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

