"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fires a single non-PII project_view event when a project page renders. */
export default function ProjectViewPing({
  projectSlug,
  service,
  suburb,
}: {
  projectSlug: string;
  service: string;
  suburb: string;
}) {
  useEffect(() => {
    track("project_view", {
      project_slug: projectSlug,
      service,
      suburb,
    });
  }, [projectSlug, service, suburb]);

  return null;
}
