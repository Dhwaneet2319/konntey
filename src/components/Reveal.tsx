import type { ElementType, ReactNode } from "react";

type RevealVariant = "rise" | "fade" | "line";

/**
 * Marks content for a scroll entrance. Renders plain, visible HTML on the
 * server; <RevealObserver /> only hides elements that are still below the
 * viewport after hydration, then plays the entrance when they scroll in.
 * If JavaScript is slow, blocked or fails, nothing is ever hidden.
 *
 * `group` staggers direct children marked with data-reveal-item.
 */
export default function Reveal({
  children,
  className,
  as: Tag = "div",
  variant = "rise",
  group = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  variant?: RevealVariant;
  group?: boolean;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={className}
      data-reveal={group ? "group" : variant}
    >
      {children}
    </Tag>
  );
}
