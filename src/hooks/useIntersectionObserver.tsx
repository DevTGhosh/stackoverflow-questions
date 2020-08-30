import React, { useEffect } from "react";

interface IntersectionObserver {
  root?: React.MutableRefObject<HTMLDivElement | null>;
  target?: React.MutableRefObject<HTMLElement | null>;
  onIntersect: any;
  enabled?: boolean | undefined;
  threshold?: number;
  rootMargin?: string;
}

// useIntersectionObserver checks if the target ref is intersecting with the device viewport or the root element
// if it is it calls the onIntersect function
export default function useIntersectionObserver({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = "600px",
  enabled = true,
}: IntersectionObserver) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [enabled, root, rootMargin, threshold, target, onIntersect]);
}
