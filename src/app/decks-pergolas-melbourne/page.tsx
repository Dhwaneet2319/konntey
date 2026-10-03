import ServicePage from "@/components/service/ServicePage";
import { services } from "@/content/services";
import { serviceMetadata } from "@/lib/seo";

const service = services["deck-pergola"];

export const metadata = serviceMetadata(service);

export default function DecksPage() {
  return <ServicePage service={service} />;
}
