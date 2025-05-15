'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  // State to handle client-side rendering of video
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true once component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mock data for featured deals
  const featuredDeals = [
    {
      id: 1,
      title: "Luxury Condo in Costa Rica",
      location: "Tamarindo, Costa Rica",
      price: "$199",
      originalPrice: "$399",
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      discount: "50%"
    },
    {
      id: 2,
      title: "Cabo San Lucas Beachfront",
      location: "Cabo San Lucas, Mexico",
      price: "$249",
      originalPrice: "$499",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGx1eHVyeSUyMHJlc29ydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      discount: "50%"
    },
    {
      id: 3,
      title: "Adventure ATV Tours",
      location: "Guanacaste, Costa Rica",
      price: "$59",
      originalPrice: "$120",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyJTIwcmVudGFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      discount: "50%"
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section with Background Image */}
      <section 
        className="relative h-screen flex items-center justify-center bg-dark overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.7)"
          }}
        ></div>
        
        {/* Elegant background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-transparent z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 max-w-3xl mx-auto px-4 text-center">
          <span className="block mb-4 text-secondary font-semibold tracking-wider uppercase">Welcome to Travelry</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            Exclusive Travel Deals
          </h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="mt-6 text-xl text-white/90">
            Join Travelry Deals to access exclusive discounts on condos, rental cars, activities and more.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link href="/register" className="btn-primary inline-block px-8 py-3 text-base font-medium text-white transition hover:shadow-lg transform hover:scale-105">
              Become a Member
            </Link>
            <Link href="/deals" className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-3 text-base font-medium text-white hover:bg-white/20 transition rounded-md">
              View Deals
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark to-transparent z-10"></div>
      </section>

      {/* Featured Deals Section */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        {/* Elegant background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary"></div>
          <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-secondary"></div>
          <div className="absolute -bottom-32 right-1/4 w-72 h-72 rounded-full bg-primary"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-dark sm:text-4xl mb-4">
              Featured Deals
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-xl text-gray-700 font-medium">
              Check out these limited-time offers available exclusively to our members.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredDeals.map((deal) => (
              <div key={deal.id} className="card hover:shadow-2xl transform transition hover:-translate-y-1">
                <div className="relative h-48">
                  <Image
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
                  <h3 className="text-xl font-bold text-dark">{deal.title}</h3>
                  <p className="text-gray-600 flex items-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {deal.location}
                  </p>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-2xl font-bold text-primary">{deal.price}</span>
                    <span className="ml-2 text-sm line-through text-gray-500">{deal.originalPrice}</span>
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

          <div className="mt-12 text-center">
            <Link href="/deals" className="inline-flex items-center text-primary font-medium bg-white px-6 py-3 rounded-md shadow hover:shadow-md transition-all hover:text-primary-dark">
              View all deals
              <svg className="ml-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-dark sm:text-4xl">
              Why Join Travelry Deals?
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Our members enjoy exclusive benefits and significant savings on travel.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-dark">Exclusive Discounts</h3>
              <p className="mt-2 text-base text-gray-500">
                Access deals up to 70% off standard rates on accommodations, activities, and transportation.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-dark">Verified Quality</h3>
              <p className="mt-2 text-base text-gray-500">
                All listings are personally vetted to ensure high quality experiences for our members.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-dark">Early Access</h3>
              <p className="mt-2 text-base text-gray-500">
                Members get first access to limited-time deals before they're available to the general public.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-dark">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start saving?</span>
            <span className="block text-secondary">Join Travelry Deals today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/register" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-dark bg-white hover:bg-gray-100">
                Sign up for free
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link href="/about" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
