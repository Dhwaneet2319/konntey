import ServicePage from "@/components/service/ServicePage";
import { services } from "@/content/services";
import { serviceMetadata } from "@/lib/seo";

const service = services.extension;

export const metadata = serviceMetadata(service);

export default function HomeExtensionsPage() {
  return <ServicePage service={service} />;
}
