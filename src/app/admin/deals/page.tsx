'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Deal, getAllDeals, deleteDeal, updateDeal } from '@/lib/deals';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminDealsPage() {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Check authentication and admin status
  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push('/login');
    }
  }, [user, isAdmin, isLoading, router]);

  // Load deals from Supabase
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const allDeals = await getAllDeals();
        setDeals(allDeals);
      } catch (error) {
        console.error('Error fetching deals:', error);
        setMessage({ type: 'error', text: 'Failed to load deals. Please try again.' });
      } finally {
        setLoading(false);
      }
    };

    if (user && isAdmin) {
      fetchDeals();
    }
  }, [user, isAdmin]);

  const handleDelete = async (id: number) => {
    try {
      // Delete from Supabase
      const success = await deleteDeal(id);
      
      if (success) {
        // Update local state
        setDeals(deals.filter(deal => deal.id !== id));
        setMessage({ type: 'success', text: 'Deal deleted successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to delete deal. Please try again.' });
      }
    } catch (error) {
      console.error('Error deleting deal:', error);
      setMessage({ type: 'error', text: 'An error occurred while deleting the deal.' });
    } finally {
      setDeleteConfirmation(null);
    }
  };

  const toggleFeatured = async (id: number) => {
    try {
      const dealToUpdate = deals.find(deal => deal.id === id);
      
      if (dealToUpdate) {
        const updatedDeal = { 
          ...dealToUpdate, 
          featured: !dealToUpdate.featured 
        };
        
        // Update in Supabase
        const result = await updateDeal(updatedDeal);
        
        if (result) {
          // Update local state
          setDeals(deals.map(deal => 
            deal.id === id ? result : deal
          ));
          setMessage({ type: 'success', text: `Deal ${result.featured ? 'featured' : 'unfeatured'} successfully!` });
        } else {
          setMessage({ type: 'error', text: 'Failed to update deal. Please try again.' });
        }
      }
    } catch (error) {
      console.error('Error updating deal:', error);
      setMessage({ type: 'error', text: 'An error occurred while updating the deal.' });
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading deals...</div>
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
                    className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New Deal
                  </Link>
                  <Link 
                    href="/admin/deals"
                    className="w-full flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md"
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
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Manage Deals</h2>
                  <Link
                    href="/admin"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New Deal
                  </Link>
                </div>
                
                {message && (
                  <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {message.text}
                  </div>
                )}
                
                {deals.length === 0 ? (
                  <div className="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
                    <p className="text-gray-500 mb-4">Get started by creating a new deal.</p>
                    <Link
                      href="/admin"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Your First Deal
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto shadow rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Deal
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {deals.map((deal) => (
                          <tr key={deal.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 relative">
                                  <Image
                                    className="h-10 w-10 rounded-md object-cover"
                                    src={deal.image}
                                    alt={deal.title}
                                    width={40}
                                    height={40}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {deal.title}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {deal.location}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {deal.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{deal.price} <span className="text-xs text-gray-500 line-through">{deal.original_price}</span></div>
                              <div className="text-xs text-green-600">{deal.discount} OFF</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button 
                                onClick={() => toggleFeatured(deal.id)}
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${deal.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                              >
                                {deal.featured ? 'Featured' : 'Not Featured'}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link 
                                href={`/deals/${deal.id}`} 
                                className="text-blue-600 hover:text-blue-900 mr-4"
                                target="_blank"
                              >
                                View
                              </Link>
                              <Link 
                                href={`/admin/deals/edit/${deal.id}`} 
                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                              >
                                Edit
                              </Link>
                              {deleteConfirmation === deal.id ? (
                                <>
                                  <button 
                                    onClick={() => handleDelete(deal.id)} 
                                    className="text-red-600 hover:text-red-900 mr-2"
                                  >
                                    Confirm
                                  </button>
                                  <button 
                                    onClick={() => setDeleteConfirmation(null)} 
                                    className="text-gray-600 hover:text-gray-900"
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <button 
                                  onClick={() => setDeleteConfirmation(deal.id)} 
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Delete
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 