"use client";

import WhatsAppButton from "@/components/WhatsAppButton";

/**
 * Floating action cluster shown on service and suburb pages.
 *
 * For now this renders the existing WhatsApp button so every page keeps the
 * same floating contact affordance as the homepage. Next iteration will pair a
 * custom-themed chat launcher alongside WhatsApp inside this container.
 */
export default function FloatingActions() {
  return <WhatsAppButton />;
}
