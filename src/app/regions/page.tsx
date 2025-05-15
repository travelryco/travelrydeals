'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getAllRegions } from '@/lib/deals';

export default function RegionsPage() {
  const [regions, setRegions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get all unique regions from deals store
    const fetchRegions = async () => {
      const allRegions = await getAllRegions();
      setRegions(allRegions);
      setLoading(false);
    };
    
    fetchRegions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading regions...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section */}
      <div className="bg-dark relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full bg-primary opacity-10"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-secondary opacity-10"></div>
        
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="text-secondary font-semibold tracking-wider uppercase block mb-2">Find Your Next Adventure</span>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
              Explore Regions
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-xl text-white/90">
              Browse exclusive deals by your favorite destinations
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {regions.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-md border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <h3 className="text-lg font-medium text-dark mb-2">No regions found</h3>
            <p className="text-gray-500 mb-4">Check back later for new destinations.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region) => (
              <Link
                key={region}
                href={`/regions/${encodeURIComponent(region)}`}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:shadow-xl hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-dark">{region}</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="mt-2 text-gray-600">Explore exclusive deals in {region}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 