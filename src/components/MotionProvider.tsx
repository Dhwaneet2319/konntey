"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // reducedMotion="user" disables transform/layout animations for visitors
  // with the OS "reduce motion" setting. It does not cover explicit JS
  // scrolling — use scrollBehavior() from lib/motion for scrollIntoView.
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
