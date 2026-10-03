"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Printer } from "lucide-react";
import type { GuideChecklist } from "@/content/guides";

// Counts unconfirmed scope items only — it deliberately never scores a quote
// or suggests a "fair price".
export default function QuoteChecklist({ checklist }: { checklist: GuideChecklist }) {
  const [confirmed, setConfirmed] = useState<Set<string>>(new Set());
  const total = checklist.items.length;
  const remaining = total - confirmed.size;

  const toggle = (id: string) =>
    setConfirmed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section aria-labelledby="quote-checklist-heading" className="mt-14">
      <h2
        id="quote-checklist-heading"
        className="font-display text-[clamp(1.5rem,3.5vw,2rem)] font-bold tracking-[-0.01em] leading-[1] text-gold-bright"
      >
        {checklist.heading}
      </h2>
      <p className="mt-5 font-body text-[16px] leading-[1.85] text-white/80">{checklist.intro}</p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border border-gold-bright/25 bg-navy-light px-5 py-4">
        <p aria-live="polite" className="font-body text-[15px] text-white/90">
          {remaining === 0 ? (
            <>All {total} items are confirmed in writing.</>
          ) : (
            <>
              <strong className="font-display text-[18px] font-bold text-gold-bright">{remaining}</strong>{" "}
              of {total} items not yet confirmed in writing
            </>
          )}
        </p>
        <div className="flex items-center gap-5 print:hidden">
          {confirmed.size > 0 && (
            <button
              type="button"
              onClick={() => setConfirmed(new Set())}
              className="font-body text-[14px] font-semibold text-white/70 underline-offset-4 hover:text-gold-bright hover:underline"
            >
              Start again
            </button>
          )}
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 font-body text-[14px] font-semibold text-gold-bright underline-offset-4 hover:underline"
          >
            <Printer aria-hidden="true" size={16} />
            Print this checklist
          </button>
        </div>
      </div>

      <ul className="mt-4 divide-y divide-white/10 border border-white/10">
        {checklist.items.map((item) => {
          const checked = confirmed.has(item.id);
          return (
            <li key={item.id}>
              <label className="flex cursor-pointer items-start gap-4 p-5 transition-colors hover:bg-white/[0.03]">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(item.id)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-gold-bright peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-navy ${
                    checked ? "border-gold-bright bg-gold-bright text-navy" : "border-white/40"
                  }`}
                >
                  {checked && <Check size={16} strokeWidth={3} />}
                </span>
                <span>
                  <span className="block font-display text-[16px] font-bold text-white">
                    {item.label}
                  </span>
                  <span className="mt-1 block font-body text-[15px] leading-[1.7] text-white/70">{item.ask}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      {checklist.example && (
        <div className="mt-12">
          <h3 className="font-display text-[20px] font-bold text-white">
            {checklist.example.heading}
          </h3>
          <p className="mt-3 border-l-4 border-gold-bright pl-4 font-body text-[14px] leading-[1.7] text-white/70">
            <strong className="text-gold-bright">Illustrative only.</strong> {checklist.example.note}
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[480px] border border-white/10 text-left font-body text-[14px]">
              <thead className="bg-white/5 font-display text-[12px] font-bold text-gold-bright">
                <tr>
                  <th scope="col" className="p-3">Checklist item</th>
                  <th scope="col" className="p-3">Quote A</th>
                  <th scope="col" className="p-3">Quote B</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-white/80">
                {checklist.example.rows.map((row) => (
                  <tr key={row.item}>
                    <th scope="row" className="p-3 font-semibold text-white">{row.item}</th>
                    <td className="p-3">{row.quoteA}</td>
                    <td className="p-3">{row.quoteB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-10 border border-white/10 p-6 print:hidden">
        <p className="font-body text-[15px] leading-[1.7] text-white/80">
          Planning your own renovation? We&apos;re happy to talk through the scope
          with you and put every item on this list in writing.
        </p>
        <Link
          href="/quote"
          className="mt-4 inline-flex min-h-[44px] items-center bg-gold-bright px-6 font-body text-[15px] font-semibold text-navy transition-colors duration-hover ease-brand hover:bg-[#e0b847]"
        >
          Discuss your project&apos;s scope
        </Link>
      </div>
    </section>
  );
}
