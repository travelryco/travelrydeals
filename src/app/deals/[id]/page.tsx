import { getDealById } from "@/lib/deals";
import DealClientPage from "./DealClientPage";
import { notFound } from "next/navigation";

// Use proper Next.js types for pages
type PageParams = {
  id: string;
}

export default async function DealPage({ params }: { params: PageParams }) {
  const dealId = parseInt(params.id);
  const deal = await getDealById(dealId);
  
  if (!deal) {
    notFound();
  }
  
  // Pass fetched data to client component
  return <DealClientPage deal={deal} />;
} 