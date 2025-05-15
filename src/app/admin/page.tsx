'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { addDeal, getAllRegions } from '@/lib/deals';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [regions, setRegions] = useState<string[]>([]);
  const [customLocation, setCustomLocation] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    original_price: '',
    image: '',
    category: 'Accommodation',
    featured: false,
    description: '',
    numeric_price: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Check authentication and admin status
  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push('/login');
    }
  }, [user, isAdmin, isLoading, router]);

  // Load regions on component mount
  useEffect(() => {
    const fetchRegions = async () => {
      const allRegions = await getAllRegions();
      setRegions(allRegions);
    };
    
    fetchRegions();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (name === 'price' && !value.startsWith('$')) {
      setFormData({
        ...formData,
        [name]: `$${value}`,
        numeric_price: parseInt(value.replace(/\D/g, '')) || 0
      });
    } else if (name === 'price') {
      setFormData({
        ...formData,
        [name]: value,
        numeric_price: parseInt(value.replace(/\D/g, '')) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      });
    }
  };

  // Handle location change from either dropdown or custom input
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedRegion(value);
    
    if (value === 'custom') {
      // If custom is selected, keep the current location
      return;
    }
    
    // For existing regions, create a location in format "City, Region"
    // You might want to adjust this format depending on your needs
    const cityPart = customLocation.split(',')[0] || 'City';
    const formattedLocation = `${cityPart}, ${value}`;
    
    setFormData({
      ...formData,
      location: formattedLocation
    });
  };

  // Handle custom location input
  const handleCustomLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomLocation(value);
    
    setFormData({
      ...formData,
      location: value
    });
  };

  const calculateDiscount = (): string => {
    const originalPrice = parseFloat(formData.original_price.replace(/[^\d.]/g, ''));
    const currentPrice = parseFloat(formData.price.replace(/[^\d.]/g, ''));
    
    if (!originalPrice || !currentPrice || originalPrice <= currentPrice) return "0%";
    
    const discountPercentage = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    return `${discountPercentage}%`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Calculate discount
      const discount = calculateDiscount();
      
      // Add deal to Supabase
      const newDeal = await addDeal({
        ...formData,
        discount,
        original_price: formData.original_price,
        numeric_price: formData.numeric_price
      }, user?.id);
      
      if (newDeal) {
        setMessage({ type: 'success', text: 'Deal added successfully!' });
        setFormData({
          title: '',
          location: '',
          price: '',
          original_price: '',
          image: '',
          category: 'Accommodation',
          featured: false,
          description: '',
          numeric_price: 0
        });
        setSelectedRegion('');
        setCustomLocation('');
      } else {
        setMessage({ type: 'error', text: 'Error adding deal. Please try again.' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error adding deal. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10">
          <header className="mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <Link 
                href="/"
                className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
              >
                Back to Site
              </Link>
            </div>
          </header>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <nav className="md:w-64 flex-shrink-0">
                <div className="space-y-1">
                  <Link 
                    href="/admin"
                    className="w-full flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New Deal
                  </Link>
                  <Link 
                    href="/admin/deals"
                    className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    Manage Deals
                  </Link>
                  <Link 
                    href="/admin/users"
                    className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Manage Users
                  </Link>
                </div>
              </nav>

              <div className="flex-1 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Deal</h2>
                
                {message && (
                  <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {message.text}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Deal Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        Region <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="region"
                        name="region"
                        required
                        value={selectedRegion}
                        onChange={handleLocationChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a region</option>
                        {regions.map(region => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                        <option value="custom">Custom Location</option>
                      </select>
                    </div>

                    {selectedRegion === 'custom' && (
                      <div className="sm:col-span-2">
                        <label htmlFor="customLocation" className="block text-sm font-medium text-gray-700">
                          Custom Location <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="customLocation"
                          id="customLocation"
                          required
                          value={customLocation}
                          onChange={handleCustomLocationChange}
                          placeholder="City, Country"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="price"
                        id="price"
                        required
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="$199"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="original_price" className="block text-sm font-medium text-gray-700">
                        Original Price <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="original_price"
                        id="original_price"
                        required
                        value={formData.original_price}
                        onChange={handleInputChange}
                        placeholder="$299"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Accommodation">Accommodation</option>
                        <option value="Activity">Activity</option>
                        <option value="Transportation">Transportation</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image URL <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="url"
                        name="image"
                        id="image"
                        required
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>

                    <div className="sm:col-span-2">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="featured"
                            name="featured"
                            type="checkbox"
                            checked={formData.featured}
                            onChange={handleInputChange}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="featured" className="font-medium text-gray-700">Featured Deal</label>
                          <p className="text-gray-500">Featured deals appear prominently on the home page</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            title: '',
                            location: '',
                            price: '',
                            original_price: '',
                            image: '',
                            category: 'Accommodation',
                            featured: false,
                            description: '',
                            numeric_price: 0
                          });
                          setSelectedRegion('');
                          setCustomLocation('');
                        }}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Saving...' : 'Save Deal'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 