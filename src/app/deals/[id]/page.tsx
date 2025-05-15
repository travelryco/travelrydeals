'use client';

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Deal, getDealById } from "@/lib/deals";

type Props = {
  params: {
    id: string;
  };
};

export function generateMetadata({ params }: Props) {
  const deal = getDealById(parseInt(params.id));
  
  if (!deal) {
    return {
      title: "Deal Not Found - Travelry Deals",
      description: "The requested deal could not be found.",
    };
  }

  return {
    title: `${deal.title} - Travelry Deals`,
    description: `Exclusive deal: ${deal.title} in ${deal.location} for only ${deal.price} - Save ${deal.discount}!`,
  };
}

export default function DealPage({ params }: Props) {
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dealId = parseInt(params.id);
    const foundDeal = getDealById(dealId);
    
    if (foundDeal) {
      setDeal(foundDeal);
    }
    
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading deal information...</div>
      </div>
    );
  }
  
  if (!deal) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link href="/deals" className="ml-2 text-gray-500 hover:text-gray-700">Deals</Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">{deal.title}</span>
            </li>
          </ol>
        </nav>
        
        {/* Deal Title Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">{deal.title}</h1>
              <p className="mt-1 text-lg text-gray-600">{deal.location}</p>
            </div>
            <div className="mt-4 flex items-center lg:mt-0">
              <span className="text-3xl font-bold text-gray-900">{deal.price}</span>
              <span className="ml-2 text-lg line-through text-gray-500">{deal.originalPrice}</span>
              <span className="ml-4 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                {deal.discount} OFF
              </span>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Image and Gallery */}
          <div className="lg:col-span-2">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image 
                src={deal.image} 
                alt={deal.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
                priority
              />
            </div>
            
            {deal.additionalImages && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {deal.additionalImages.map((img, idx) => (
                  <div key={idx} className="relative h-32 rounded-lg overflow-hidden">
                    <Image 
                      src={img} 
                      alt={`${deal.title} - additional view ${idx + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Description */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600">{deal.description}</p>
            </div>
            
            {/* Property Details for Accommodations */}
            {deal.category === "Accommodation" && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Bedrooms</p>
                    <p className="text-lg font-medium text-gray-900">{deal.bedrooms}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Bathrooms</p>
                    <p className="text-lg font-medium text-gray-900">{deal.bathrooms}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Max Guests</p>
                    <p className="text-lg font-medium text-gray-900">{deal.maxGuests}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="text-lg font-medium text-gray-900">{deal.category}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Amenities */}
            {deal.amenities && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                  {deal.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Activity Details */}
            {deal.category === "Activity" && deal.duration && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Activity Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="text-lg font-medium text-gray-900">{deal.duration}</p>
                  </div>
                  {deal.maxParticipants && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Max Participants</p>
                      <p className="text-lg font-medium text-gray-900">{deal.maxParticipants}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Activity Inclusions */}
            {deal.included && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">What's Included</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                  {deal.included.map((item, idx) => (
                    <div key={idx} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Activity Requirements */}
            {deal.requirements && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                  {deal.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-center">
                      <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="ml-2 text-gray-600">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Booking Card */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Book this deal</h3>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm text-gray-500">Price</span>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-primary">{deal.price}</span>
                    <span className="ml-2 text-sm line-through text-gray-500">{deal.originalPrice}</span>
                  </div>
                </div>
                <div className="bg-secondary text-white font-semibold px-2 py-1 rounded text-sm">
                  {deal.discount} OFF
                </div>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="dates" className="block text-sm font-medium text-gray-700 mb-1">
                    Dates
                  </label>
                  <select
                    id="dates"
                    name="dates"
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option>Select dates</option>
                    <option>Jun 10 - Jun 17, 2023</option>
                    <option>Jun 18 - Jun 25, 2023</option>
                    <option>Jun 26 - Jul 3, 2023</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                    {deal.category === "Accommodation" ? "Guests" : "Participants"}
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option>Select {deal.category === "Accommodation" ? "guests" : "participants"}</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    {deal.category === "Accommodation" && deal.maxGuests && deal.maxGuests > 4 && (
                      <option>5+</option>
                    )}
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary w-full py-3 text-white font-bold rounded-md"
                >
                  Book Now
                </button>
              </form>
              
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Deal Highlights</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-2 text-sm text-gray-600">Exclusive member pricing</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-2 text-sm text-gray-600">Free cancellation up to 7 days before</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-2 text-sm text-gray-600">24/7 customer support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Deals (coming soon in a future update) */}
      </div>
    </div>
  );
} 