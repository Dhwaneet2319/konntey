import ServicePage from "@/components/service/ServicePage";
import { services } from "@/content/services";
import { serviceMetadata } from "@/lib/seo";

const service = services.bathroom;

export const metadata = serviceMetadata(service);

export default function BathroomRenovationsPage() {
  return <ServicePage service={service} />;
}
