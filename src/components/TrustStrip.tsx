import { verifiedTrustPoints } from "@/content/business";

/**
 * Compact strip of individually verified business facts, sourced only from
 * the central business config. Renders nothing if no verified points exist.
 */
export default function TrustStrip({
  theme = "light",
}: {
  theme?: "light" | "dark";
}) {
  if (verifiedTrustPoints.length === 0) return null;

  const textColor = theme === "light" ? "text-navy/70" : "text-white/80";
  const dividerColor = theme === "light" ? "text-gold" : "text-gold-bright";

  return (
    <ul
      aria-label="Business facts"
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-[13px] font-medium tracking-[0.5px] ${textColor}`}
    >
      {verifiedTrustPoints.map((point, i) => (
        <li key={point} className="flex items-center gap-3">
          {i > 0 && (
            <span aria-hidden="true" className={dividerColor}>
              ·
            </span>
          )}
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}
