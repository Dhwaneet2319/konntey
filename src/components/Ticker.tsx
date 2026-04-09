"use client";

interface TickerProps {
  dark?: boolean;
  text: string;
}

export default function Ticker({ dark = false, text }: TickerProps) {
  const repeatedText = `${text}\u00a0\u00a0\u00a0${text}\u00a0\u00a0\u00a0${text}\u00a0\u00a0\u00a0${text}\u00a0\u00a0\u00a0`;

  return (
    <div
      className={`${
        dark
          ? "bg-navy text-gold-bright"
          : "bg-gold text-navy"
      } overflow-hidden border-y border-white/10 py-3`}
    >
      <div className="ticker-track font-display text-[20px] font-black uppercase tracking-kicker whitespace-nowrap">
        <span>{repeatedText}</span>
        <span>{repeatedText}</span>
      </div>
    </div>
  );
}
