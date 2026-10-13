import ServicePage from "@/components/service/ServicePage";
import { services } from "@/content/services";
import { serviceMetadata } from "@/lib/seo";

const service = services["new-home"];

export const metadata = serviceMetadata(service);

export default function NewHomeBuildersPage() {
  return <ServicePage service={service} />;
}
