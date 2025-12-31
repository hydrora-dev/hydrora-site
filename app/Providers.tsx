"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { MotionDiv } from "@/components/motion";

export function Providers({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <MotionDiv
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </MotionDiv>
    </AnimatePresence>
  );
}
