/**
 * Vendor-neutral analytics events.
 *
 * No analytics vendor is bundled and no IDs are hard-coded. When the owner
 * sets NEXT_PUBLIC_GTM_ID or NEXT_PUBLIC_GA4_ID (see AnalyticsScripts), the
 * matching loader is added and events flow to window.dataLayer / gtag.
 * Every event is also dispatched as a "konntey:event" CustomEvent.
 *
 * PRIVACY RULE: only the allowlisted keys below are ever sent, and service,
 * suburb and placement values are validated against known slugs. Names,
 * phone numbers, emails and free-text enquiry content are never accepted.
 */
import { isServiceSlug, suburbSlugOf } from "@/content/taxonomy";

export type AnalyticsEvent =
  | "quote_form_start"
  | "quote_form_submit"
  | "phone_click"
  | "whatsapp_click"
  | "project_view"
  | "project_gallery_interaction";

export interface AnalyticsProps {
  page_type?: string;
  service_context?: string;
  suburb_context?: string;
  project_slug?: string;
  /** Where on the page the interaction happened, e.g. "hero" or "mobile_bar". */
  placement?: string;
  interaction?: "before_after" | "gallery";
  contact_method?: "phone" | "whatsapp" | "email" | "any";
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

const SLUG = /^[a-z0-9][a-z0-9_-]{0,59}$/;

function clean(props: AnalyticsProps): Record<string, string> {
  const out: Record<string, string> = {};
  const slugKeys = ["page_type", "project_slug", "placement", "interaction", "contact_method"] as const;
  for (const key of slugKeys) {
    const v = props[key];
    if (v && SLUG.test(v)) out[key] = v;
  }
  if (isServiceSlug(props.service_context)) out.service_context = props.service_context;
  const suburb = suburbSlugOf(props.suburb_context);
  if (suburb) out.suburb_context = suburb;
  return out;
}

export function track(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
  if (typeof window === "undefined") return;
  const params = clean(props);
  window.dataLayer?.push({ event, ...params });
  window.gtag?.("event", event, params);
  window.dispatchEvent(new CustomEvent("konntey:event", { detail: { event, ...params } }));
}

const serviceRoutes: Record<string, string> = {
  "/kitchen-renovations-melbourne": "kitchen",
  "/bathroom-renovations-melbourne": "bathroom",
  "/home-extensions-melbourne": "extension",
  "/decks-pergolas-melbourne": "deck-pergola",
  "/interior-painting-melbourne": "painting",
  "/vastu-renovations-melbourne": "vastu",
};

/** Derives non-PII page context from the current pathname. */
export function pageContext(pathname: string): AnalyticsProps {
  if (pathname === "/") return { page_type: "home" };
  if (serviceRoutes[pathname])
    return { page_type: "service", service_context: serviceRoutes[pathname] };
  if (pathname.startsWith("/renovations/"))
    return { page_type: "location", suburb_context: pathname.split("/")[2] };
  if (pathname === "/renovations") return { page_type: "areas_hub" };
  if (pathname.startsWith("/projects/"))
    return { page_type: "project", project_slug: pathname.split("/")[2] };
  if (pathname === "/projects") return { page_type: "projects_hub" };
  if (pathname.startsWith("/guides")) return { page_type: "guide" };
  if (pathname === "/quote") return { page_type: "quote" };
  if (pathname === "/scan") return { page_type: "scan" };
  return { page_type: "other" };
}
