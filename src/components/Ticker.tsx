interface TickerProps {
  dark?: boolean;
  text: string;
}

export default function Ticker({ dark = false, text }: TickerProps) {
  const repeatedText = `${text}\u00a0\u00a0\u00a0${text}\u00a0\u00a0\u00a0${text}\u00a0\u00a0\u00a0${text}\u00a0\u00a0\u00a0`;
  const spoken = text.split("◆").map((s) => s.trim()).filter(Boolean).join(", ");

  return (
    <div
      className={`${
        dark
          ? "bg-navy text-gold-bright border-y border-white/10"
          : "bg-gold text-navy border-y border-gold-bright/30"
      } overflow-hidden py-3`}
    >
      {/* Screen readers get the phrase once; the scrolling repeats are decorative. */}
      <span className="sr-only">{spoken}</span>
      <div aria-hidden="true" className="ticker-track font-display text-[20px] font-black uppercase tracking-kicker whitespace-nowrap">
        <span>{repeatedText}</span>
        <span>{repeatedText}</span>
      </div>
    </div>
  );
}
