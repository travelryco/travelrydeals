import { getDealById } from "@/lib/deals";
import DealClientPage from "./DealClientPage";
import { notFound } from "next/navigation";

// @ts-ignore - Ignoring Next.js TypeScript errors
export default async function Page(props: any) {
  // Extract the ID from params
  const id = props.params?.id;
  
  if (!id) {
    return notFound();
  }
  
  // Get the deal data
  const dealId = parseInt(id);
  const deal = await getDealById(dealId);
  
  // Handle not found case
  if (!deal) {
    notFound();
  }
  
  // Render the client component with the data
  return <DealClientPage deal={deal} />;
} 