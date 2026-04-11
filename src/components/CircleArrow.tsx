"use client";

import { ArrowRight } from "lucide-react";

interface CircleArrowProps {
  className?: string;
}

export default function CircleArrow({ className = "" }: CircleArrowProps) {
  return (
    <span
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-current ${className}`}
    >
      <ArrowRight size={18} strokeWidth={2.25} className="shrink-0" />
    </span>
  );
}
