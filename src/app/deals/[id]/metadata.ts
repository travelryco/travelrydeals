import { getDealById } from '@/lib/deals';
import { Metadata } from 'next';

// Metadata generation for deal pages - extracted from page.tsx to avoid 'use client' directive conflicts
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const deal = await getDealById(parseInt(params.id));
  
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