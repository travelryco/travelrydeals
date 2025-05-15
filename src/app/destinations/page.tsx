import Image from "next/image";
import Link from "next/link";
import LocalImage from "@/components/LocalImage";

export const metadata = {
  title: 'Destinations - Travelry Deals',
  description: 'Explore our curated selection of luxury travel destinations with exclusive member deals.',
};

export default function DestinationsPage() {
  // Mock data for featured destinations
  const destinations = [
    {
      id: "costa-rica",
      name: "Costa Rica",
      description: "Experience the pure life ('Pura Vida') in Costa Rica, a paradise for nature lovers and adventure seekers. From lush rainforests and active volcanoes to pristine beaches on both the Pacific and Caribbean coasts, Costa Rica offers incredible biodiversity and natural beauty.",
      image: "https://images.unsplash.com/photo-1580094827561-4105fe6e1a57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNvc3RhJTIwcmljYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      totalDeals: 24,
      popular: true,
      activities: ["Beach", "Rainforest", "Wildlife", "Volcano", "Surfing"]
    },
    {
      id: "mexico",
      name: "Mexico",
      description: "Discover the perfect blend of ancient history, vibrant culture, and stunning beaches in Mexico. From the crystal-clear waters of the Riviera Maya to the charm of colonial towns and the majesty of ancient ruins, Mexico offers diverse experiences for every traveler.",
      image: "https://images.unsplash.com/photo-1513315045-efa5f448e4c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWV4aWNvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      totalDeals: 18,
      popular: true,
      activities: ["Beach", "Culture", "Food", "Ancient Ruins", "Snorkeling"]
    },
    {
      id: "belize",
      name: "Belize",
      description: "Experience the perfect mix of Caribbean beauty and Central American culture in Belize. Home to the second-largest barrier reef in the world, ancient Mayan ruins, and lush rainforests, Belize offers adventure, relaxation, and natural wonders in one compact destination.",
      image: "https://images.unsplash.com/photo-1544876674-2a0855c1c9e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmVsaXplfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      totalDeals: 11,
      popular: false,
      activities: ["Reef", "Diving", "Mayan Ruins", "Jungle", "Caving"]
    },
    {
      id: "panama",
      name: "Panama",
      description: "Discover the crossroads of the Americas in Panama, where modern innovation meets untouched wilderness. From the engineering marvel of the Panama Canal to pristine beaches, cloud forests, and vibrant indigenous cultures, Panama offers diverse experiences in a compact setting.",
      image: "https://images.unsplash.com/photo-1525547874952-0f490ef5c2b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhbmFtYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      totalDeals: 9,
      popular: false,
      activities: ["Panama Canal", "Islands", "Rainforest", "Bird Watching", "Hiking"]
    },
    {
      id: "dominican-republic",
      name: "Dominican Republic",
      description: "Experience the natural beauty and warm hospitality of the Dominican Republic. With its pristine white-sand beaches, turquoise waters, lush mountains, and rich colonial history, this Caribbean paradise offers the perfect blend of relaxation, adventure, and culture.",
      image: "https://images.unsplash.com/photo-1532924926504-40e9f3f91c4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRvbWluaWNhbiUyMHJlcHVibGljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      totalDeals: 15,
      popular: true,
      activities: ["Beaches", "Water Sports", "Colonial History", "Mountains", "Golf"]
    },
    {
      id: "colombia",
      name: "Colombia",
      description: "Discover the incredible diversity of Colombia, from the lush Amazon rainforest to the stunning Caribbean and Pacific coasts, through the Andean mountains and vibrant cities. Experience warm hospitality, rich culture, and landscapes that range from tropical beaches to snow-capped peaks.",
      image: "https://images.unsplash.com/photo-1622156372583-1d215d5ec4fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y29sb21iaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      totalDeals: 7,
      popular: false,
      activities: ["Coffee Region", "Colonial Cities", "Caribbean Coast", "Hiking", "Culture"]
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <LocalImage
            src="https://images.unsplash.com/photo-1490079297310-d4d4a2d14f85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJlYWNoJTIwYWVyaWFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
            alt="Destinations"
            fill
            style={{ objectFit: "cover" }}
            className="brightness-50"
          />
        </div>
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/70 to-dark/30 z-10"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center sm:px-6 lg:px-8">
          <span className="text-secondary font-semibold tracking-wider uppercase mb-2">Explore With Us</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Explore Our Destinations
          </h1>
          <div className="w-24 h-1 bg-secondary my-6"></div>
          <p className="max-w-xl text-xl text-white/90">
            Discover exclusive deals on accommodations, activities, and more in our most popular destinations.
          </p>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-dark sm:text-4xl mb-4">Popular Destinations</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-xl text-gray-700 font-medium">
            Explore our most sought-after travel destinations with exclusive member deals.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinations.filter(dest => dest.popular).map((destination) => (
            <div key={destination.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden transform transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex-shrink-0 relative h-64">
                <LocalImage
                  src={destination.image}
                  alt={destination.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                    <div className="flex-shrink-0">
                      <p className="px-3 py-1 inline-flex text-sm font-semibold rounded-full bg-secondary text-white">
                        {destination.totalDeals} deals
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-base text-gray-700 mb-4 line-clamp-3">{destination.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {destination.activities.map((activity) => (
                      <span key={activity} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <Link href={`/destinations/${destination.id}`} className="btn-primary block w-full py-3 text-center font-semibold hover:bg-primary-dark transition-colors">
                    Explore Deals
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Destinations */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-dark sm:text-4xl mb-4">All Destinations</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-xl text-gray-700 font-medium">
              Discover all the amazing places where we offer exclusive deals.
            </p>
          </div>

          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <div key={destination.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden transform transition hover:-translate-y-1 hover:shadow-xl bg-white">
                <div className="flex-shrink-0 relative h-48">
                  <LocalImage
                    src={destination.image}
                    alt={destination.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/30 to-transparent"></div>
                  <div className="absolute top-2 right-2">
                    <span className="px-3 py-1 inline-flex text-sm font-semibold rounded-full bg-secondary text-white">
                      {destination.totalDeals} deals
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-dark mb-3">{destination.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.activities.slice(0, 3).map((activity) => (
                      <span key={activity} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {activity}
                      </span>
                    ))}
                    {destination.activities.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        +{destination.activities.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="mt-auto">
                    <Link
                      href={`/destinations/${destination.id}`}
                      className="btn-primary block w-full py-3 text-center font-semibold hover:bg-primary-dark transition-colors"
                    >
                      Explore Deals
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Membership CTA */}
      <div className="bg-dark relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full bg-primary opacity-10"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-secondary opacity-10"></div>
        
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between relative z-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to explore these destinations?</span>
            <span className="block text-secondary">Join Travelry Deals today for exclusive access.</span>
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 lg:mt-0 lg:flex-shrink-0">
            <Link 
              href="/register" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-dark bg-white hover:bg-gray-100 transition-colors shadow-md"
            >
              Join for free
            </Link>
            <Link 
              href="/deals" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark transition-colors shadow-md"
            >
              Browse deals
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 