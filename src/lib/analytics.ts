/**
 * Neutral analytics event hooks.
 *
 * No analytics vendor is bundled and no IDs are hard-coded. Events are:
 *  1. pushed to window.dataLayer if the owner later adds GTM/GA4 via their
 *     own configuration, and
 *  2. dispatched as a "konntey:event" CustomEvent so any future integration
 *     can subscribe without code changes.
 *
 * PRIVACY RULE: never pass names, phone numbers, emails or free-text form
 * contents as event properties. Only page/service/suburb context and slugs.
 */

export type AnalyticsEvent =
  | "quote_form_start"
  | "quote_form_submit"
  | "phone_click"
  | "whatsapp_click"
  | "project_view"
  | "project_gallery_interaction";

export type AnalyticsProps = Record<string, string | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
  if (typeof window === "undefined") return;
  const payload: Record<string, unknown> = { event };
  for (const [key, value] of Object.entries(props)) {
    if (value) payload[key] = value;
  }
  window.dataLayer?.push(payload);
  window.dispatchEvent(new CustomEvent("konntey:event", { detail: payload }));
}

/** Derives non-PII page context from the current pathname. */
export function pageContext(pathname: string): AnalyticsProps {
  const serviceRoutes: Record<string, string> = {
    "/kitchen-renovations-melbourne": "kitchen",
    "/bathroom-renovations-melbourne": "bathroom",
    "/home-extensions-melbourne": "extension",
    "/decks-pergolas-melbourne": "deck-pergola",
    "/interior-painting-melbourne": "painting",
    "/vastu-renovations-melbourne": "vastu",
  };

  if (pathname === "/") return { page_type: "home" };
  if (serviceRoutes[pathname])
    return { page_type: "service", service_context: serviceRoutes[pathname] };
  if (pathname.startsWith("/renovations/"))
    return {
      page_type: "location",
      suburb_context: pathname.split("/")[2],
    };
  if (pathname === "/renovations") return { page_type: "areas_hub" };
  if (pathname.startsWith("/projects/"))
    return { page_type: "project", project_slug: pathname.split("/")[2] };
  if (pathname === "/projects") return { page_type: "projects_hub" };
  if (pathname.startsWith("/guides")) return { page_type: "guide" };
  if (pathname === "/quote") return { page_type: "quote" };
  return { page_type: "other" };
}
