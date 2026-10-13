import { BASE_URL, business, claimText } from "@/content/business";
import { guides } from "@/content/guides";
import { serviceList } from "@/content/services";
import { suburbLinks } from "@/content/suburbs";
import { siteDescription } from "@/lib/seo";

// A plain-text site summary for AI assistants (llmstxt.org). Google does not
// use it, but other agents can. It is generated from the same content files
// as the pages, so it only ever repeats approved facts.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${business.name}`,
    "",
    `> ${siteDescription}`,
    "",
    `Service area: ${business.serviceArea}, Victoria, Australia. Phone ${business.phoneDisplay}. Email ${business.email}. ABN ${business.abn}.`,
    "",
    `Images on this site are illustrative (AI-generated design inspiration or example photos), not completed ${business.name} projects, unless a page says otherwise. ${claimText("priceRanges")} on service pages are a guide, not a quote.`,
    "",
    "## Services",
    ...serviceList.map((s) => `- [${s.name}](${BASE_URL}${s.route}): ${s.card.blurb}`),
    "",
    "## Guides",
    ...guides.map((g) => `- [${g.title}](${BASE_URL}/guides/${g.slug}): ${g.excerpt}`),
    "",
    "## Areas",
    `- [Suburbs we service](${BASE_URL}/renovations): ${suburbLinks.map((s) => s.name).join(", ")}`,
    "",
    "## Contact",
    `- [Request a free quote](${BASE_URL}/quote)`,
  ];
  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
