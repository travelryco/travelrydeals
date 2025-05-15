import { getDealById } from "@/lib/deals";
import DealClientPage from "./DealClientPage";
import { notFound } from "next/navigation";

// Next.js page component with dynamic route params
export default async function Page({ params }: { params: { id: string } }) {
  // Get the deal data
  const dealId = parseInt(params.id);
  const deal = await getDealById(dealId);
  
  // Handle not found case
  if (!deal) {
    notFound();
  }
  
  // Render the client component with the data
  return <DealClientPage deal={deal} />;
} 