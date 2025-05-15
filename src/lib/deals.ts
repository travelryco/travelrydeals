import { supabase } from './supabase';

// Define the Deal type for use throughout the application
export interface Deal {
  id: number;
  title: string;
  location: string;
  price: string;
  original_price: string; // Note: Updated to match DB snake_case
  image: string;
  discount: string;
  category: string;
  featured: boolean;
  numeric_price: number; // Note: Updated to match DB snake_case
  description?: string;
  amenities?: string[];
  bedrooms?: number;
  bathrooms?: number;
  max_guests?: number; // Note: Updated to match DB snake_case
  additional_images?: string[]; // Note: Updated to match DB snake_case
  duration?: string;
  included?: string[];
  requirements?: string[];
  max_participants?: number; // Note: Updated to match DB snake_case
  created_at?: string;
  created_by?: string;
}

// Default deals to populate if the database is empty
const defaultDeals: Omit<Deal, 'id' | 'created_at' | 'created_by'>[] = [
  {
    title: "Luxury Condo in Costa Rica",
    location: "Tamarindo, Costa Rica",
    price: "$199",
    original_price: "$399",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    discount: "50%",
    category: "Accommodation",
    featured: true,
    numeric_price: 199,
    description: "Enjoy luxury living in this stunning oceanfront condo in Tamarindo, Costa Rica. This fully furnished 2-bedroom, 2-bathroom condo offers breathtaking views of the Pacific Ocean and easy access to one of Costa Rica's most popular beaches.",
    amenities: ["Oceanfront", "Air Conditioning", "WiFi", "Full Kitchen", "Pool", "Fitness Center", "24-Hour Security"],
    bedrooms: 2,
    bathrooms: 2,
    max_guests: 6,
    additional_images: [
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29uZG98ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50JTIwYmVkcm9vbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
    ]
  },
  {
    title: "Cabo San Lucas Beachfront",
    location: "Cabo San Lucas, Mexico",
    price: "$249",
    original_price: "$499",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGx1eHVyeSUyMHJlc29ydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    discount: "50%",
    category: "Accommodation",
    featured: true,
    numeric_price: 249,
    description: "Experience luxury in this stunning beachfront property in Cabo San Lucas. This spacious 3-bedroom villa offers unparalleled views of the ocean and easy access to the beach.",
    amenities: ["Beachfront", "Private Pool", "Air Conditioning", "WiFi", "Full Kitchen", "Outdoor Dining", "Housekeeping"],
    bedrooms: 3,
    bathrooms: 3.5,
    max_guests: 8
  },
  {
    title: "Adventure ATV Tours",
    location: "Guanacaste, Costa Rica",
    price: "$59",
    original_price: "$120",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyJTIwcmVudGFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    discount: "50%",
    category: "Activity",
    featured: true,
    numeric_price: 59,
    description: "Experience the thrill of exploring Costa Rica's diverse terrain on our guided ATV tours. Navigate through lush jungle trails, cross rivers, and reach stunning viewpoints not accessible by regular vehicles.",
    duration: "3 hours",
    included: ["Professional guide", "Safety equipment", "Bottled water", "Fruit snack"],
    requirements: ["Valid driver's license", "Minimum age: 16", "Closed-toe shoes"],
    max_participants: 12
  },
  {
    title: "Oceanfront Villa with Pool",
    location: "Puerto Vallarta, Mexico",
    price: "$299",
    original_price: "$599",
    image: "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    discount: "50%",
    category: "Accommodation",
    featured: false,
    numeric_price: 299,
    description: "Relax in luxury in this oceanfront villa with a private pool in Puerto Vallarta, Mexico."
  },
  {
    title: "Midsize SUV Rental",
    location: "San Jose, Costa Rica",
    price: "$35",
    original_price: "$75",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyJTIwcmVudGFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    discount: "53%",
    category: "Transportation",
    featured: false,
    numeric_price: 35,
    description: "Explore Costa Rica at your own pace with our reliable midsize SUV rental."
  },
  {
    title: "Sunset Sailing Tour",
    location: "Manuel Antonio, Costa Rica",
    price: "$69",
    original_price: "$129",
    image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FpbGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    discount: "47%",
    category: "Activity",
    featured: false,
    numeric_price: 69,
    description: "Experience the beauty of a Costa Rican sunset from the deck of our luxury catamaran."
  }
];

// Initialize the database with default deals if empty
export async function initializeDealsDb() {
  // Check if we already have deals in the database
  const { data: existingDeals, error: fetchError } = await supabase
    .from('deals')
    .select('id')
    .limit(1);

  if (fetchError) {
    console.error('Error checking for existing deals:', fetchError);
    return;
  }

  // If no deals exist, insert the default ones
  if (!existingDeals || existingDeals.length === 0) {
    const { error: insertError } = await supabase
      .from('deals')
      .insert(defaultDeals);

    if (insertError) {
      console.error('Error inserting default deals:', insertError);
    } else {
      console.log('Successfully initialized database with default deals');
    }
  }
}

// Get all deals from the database
export async function getAllDeals(): Promise<Deal[]> {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .order('featured', { ascending: false });

  if (error) {
    console.error('Error fetching deals:', error);
    return [];
  }

  return data || [];
}

// Get a deal by ID
export async function getDealById(id: number): Promise<Deal | undefined> {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching deal #${id}:`, error);
    return undefined;
  }

  return data;
}

// Get deals by region/location
export async function getDealsByRegion(region: string): Promise<Deal[]> {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .ilike('location', `%${region}%`)
    .order('featured', { ascending: false });

  if (error) {
    console.error(`Error fetching deals for region ${region}:`, error);
    return [];
  }

  return data || [];
}

// Add a new deal
export async function addDeal(newDeal: Omit<Deal, 'id' | 'created_at' | 'created_by'>, userId?: string): Promise<Deal | null> {
  const dealToInsert = {
    ...newDeal,
    created_by: userId
  };

  const { data, error } = await supabase
    .from('deals')
    .insert(dealToInsert)
    .select()
    .single();

  if (error) {
    console.error('Error adding deal:', error);
    return null;
  }

  return data;
}

// Update an existing deal
export async function updateDeal(updatedDeal: Partial<Deal> & { id: number }): Promise<Deal | null> {
  const { data, error } = await supabase
    .from('deals')
    .update(updatedDeal)
    .eq('id', updatedDeal.id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating deal #${updatedDeal.id}:`, error);
    return null;
  }

  return data;
}

// Delete a deal
export async function deleteDeal(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('deals')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting deal #${id}:`, error);
    return false;
  }

  return true;
}

// Get all unique regions/locations
export async function getAllRegions(): Promise<string[]> {
  const { data, error } = await supabase
    .from('deals')
    .select('location');

  if (error) {
    console.error('Error fetching regions:', error);
    return [];
  }

  // Extract location parts (e.g. "Tamarindo, Costa Rica" -> "Costa Rica")
  const regions = data.map(deal => {
    const parts = deal.location.split(',');
    return parts.length > 1 ? parts[1].trim() : parts[0].trim();
  });

  // Return unique regions
  return [...new Set(regions)];
} 