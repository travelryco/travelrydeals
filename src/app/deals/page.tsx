'use client';

import Image from "next/image";
import Link from "next/link";
import LocalImage from "@/components/LocalImage";
import { useState, useEffect } from "react";
import { Deal, getAllDeals } from "@/lib/deals";

export default function DealsPage() {
  // State for deals and filtering
  const [allDeals, setAllDeals] = useState<Deal[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  // Add view state (grid or list)
  const [viewType, setViewType] = useState("grid");
  const [loading, setLoading] = useState(true);

  // Load deals from shared store
  useEffect(() => {
    const fetchDeals = async () => {
      const deals = await getAllDeals();
      setAllDeals(deals);
      setLoading(false);
    };
    
    fetchDeals();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    if (allDeals.length === 0) return;
    
    let result = [...allDeals];

    // Apply category filter
    if (categoryFilter) {
      result = result.filter(deal => deal.category === categoryFilter);
    }

    // Apply location filter
    if (locationFilter) {
      result = result.filter(deal => deal.location.includes(locationFilter));
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.numeric_price - b.numeric_price);
        break;
      case "price-high":
        result.sort((a, b) => b.numeric_price - a.numeric_price);
        break;
      case "discount":
        result.sort((a, b) => {
          const discountA = parseInt(a.discount);
          const discountB = parseInt(b.discount);
          return discountB - discountA;
        });
        break;
      case "featured":
      default:
        result.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
        break;
    }

    setFilteredDeals(result);
  }, [allDeals, categoryFilter, locationFilter, sortOption]);

  // Extract unique locations for filter dropdown
  const locations = [...new Set(allDeals.map(deal => {
    const parts = deal.location.split(',');
    return parts.length > 1 ? parts[1].trim() : parts[0].trim();
  }))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading deals...</div>
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
            <span className="text-secondary font-semibold tracking-wider uppercase block mb-2">Exclusive Offers</span>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
              All Travel Deals
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-xl text-white/90">
              Browse our exclusive member-only deals
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8 -mt-8 relative z-20">
          <h2 className="text-lg font-medium text-dark mb-4">Filter & Sort Deals</h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-dark mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-dark border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary rounded-md shadow-sm"
                >
                  <option value="">All Categories</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Activity">Activities</option>
                  <option value="Transportation">Transportation</option>
                </select>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-dark mb-1">
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-dark border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary rounded-md shadow-sm"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-dark mb-1">
                  Sort By
                </label>
                <select
                  id="sort"
                  name="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-dark border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary rounded-md shadow-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>
              <div>
                <label htmlFor="viewToggle" className="block text-sm font-medium text-dark mb-1">
                  View
                </label>
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewType("grid")}
                    className={`flex-1 px-4 py-2 flex items-center justify-center ${viewType === "grid" ? "bg-primary text-white" : "bg-white text-dark"}`}
                    aria-label="Grid view"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewType("list")}
                    className={`flex-1 px-4 py-2 flex items-center justify-center ${viewType === "list" ? "bg-primary text-white" : "bg-white text-dark"}`}
                    aria-label="List view"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-dark font-medium">
            Showing <span className="text-primary font-bold">{filteredDeals.length}</span> deals
          </p>
          {(categoryFilter || locationFilter) && (
            <button 
              onClick={() => {
                setCategoryFilter("");
                setLocationFilter("");
                setSortOption("featured");
              }}
              className="text-secondary hover:text-secondary-dark font-medium flex items-center"
            >
              <span>Clear filters</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Conditional rendering based on view type */}
        {viewType === "grid" ? (
          /* Grid View */
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredDeals.map((deal) => (
              <div key={deal.id} className="card hover:shadow-2xl transform transition hover:-translate-y-1">
                <div className="relative h-48">
                  <LocalImage
                    src={deal.image}
                    alt={deal.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute top-0 right-0 bg-secondary text-white font-bold px-3 py-1 m-2 rounded-md">
                    {deal.discount} OFF
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {deal.category}
                    </span>
                    {deal.featured && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary-dark">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-dark">{deal.title}</h3>
                  <p className="text-gray-600 flex items-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {deal.location}
                  </p>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-2xl font-bold text-primary">{deal.price}</span>
                    <span className="ml-2 text-sm line-through text-gray-500">{deal.original_price}</span>
                    <span className="ml-2 text-sm text-gray-500">per night</span>
                  </div>
                  <div className="mt-5">
                    <Link href={`/deals/${deal.id}`} className="btn-primary block w-full py-3 text-center font-bold transition-all hover:bg-primary-dark">
                      View Deal
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="mt-8 space-y-4">
            {filteredDeals.map((deal) => (
              <div key={deal.id} className="card hover:shadow-lg transform transition hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative sm:w-48 h-48">
                    <LocalImage
                      src={deal.image}
                      alt={deal.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute top-0 right-0 bg-secondary text-white font-bold px-3 py-1 m-2 rounded-md">
                      {deal.discount} OFF
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {deal.category}
                        </span>
                        {deal.featured && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary-dark">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-dark">{deal.title}</h3>
                      <p className="text-gray-600 flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {deal.location}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
                      <div className="flex items-baseline mb-3 sm:mb-0">
                        <span className="text-2xl font-bold text-primary">{deal.price}</span>
                        <span className="ml-2 text-sm line-through text-gray-500">{deal.original_price}</span>
                        <span className="ml-2 text-sm text-gray-500">per night</span>
                      </div>
                      <Link href={`/deals/${deal.id}`} className="btn-primary py-2 px-6 text-center font-bold transition-all hover:bg-primary-dark">
                        View Deal
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No results message */}
        {filteredDeals.length === 0 && (
          <div className="mt-8 text-center p-8 bg-white rounded-lg shadow-md border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <h3 className="text-lg font-medium text-dark mb-2">No deals found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters to see more results.</p>
            <button 
              onClick={() => {
                setCategoryFilter("");
                setLocationFilter("");
                setSortOption("featured");
              }}
              className="btn-secondary inline-flex items-center px-4 py-2"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 