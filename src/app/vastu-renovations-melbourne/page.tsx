import ServicePage from "@/components/service/ServicePage";
import { services } from "@/content/services";
import { serviceMetadata } from "@/lib/seo";

const service = services.vastu;

export const metadata = serviceMetadata(service);

export default function VastuPage() {
  return <ServicePage service={service} />;
}
