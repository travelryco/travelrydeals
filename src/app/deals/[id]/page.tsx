import { getDealById } from "@/lib/deals";
import { Metadata } from "next";
import DealClientPage from "./DealClientPage";

// Define page params type
interface PageProps {
  params: {
    id: string;
  };
}

// Server component for fetching data
export default async function DealPage({ params }: PageProps) {
  const dealId = parseInt(params.id);
  const deal = await getDealById(dealId);
  
  // Pass fetched data to client component
  return <DealClientPage deal={deal} />;
} 