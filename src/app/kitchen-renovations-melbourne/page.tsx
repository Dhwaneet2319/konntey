import ServicePage from "@/components/service/ServicePage";
import { services } from "@/content/services";
import { serviceMetadata } from "@/lib/seo";

const service = services.kitchen;

export const metadata = serviceMetadata(service);

export default function KitchenRenovationsPage() {
  return <ServicePage service={service} />;
}
