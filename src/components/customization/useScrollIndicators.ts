import { useEffect, useRef } from "react";

export function useScrollIndicators() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    const scrollContainer = scrollArea?.parentElement;
    if (!scrollArea || !scrollContainer) return;

    const updateIndicators = () => {
      const canScrollUp = scrollArea.scrollTop > 1;
      const canScrollDown =
        scrollArea.scrollTop + scrollArea.clientHeight <
        scrollArea.scrollHeight - 1;

      scrollContainer.dataset.canScrollUp = String(canScrollUp);
      scrollContainer.dataset.canScrollDown = String(canScrollDown);
    };

    const resizeObserver = new ResizeObserver(updateIndicators);
    resizeObserver.observe(scrollArea);

    if (scrollArea.firstElementChild) {
      resizeObserver.observe(scrollArea.firstElementChild);
    }

    scrollArea.addEventListener("scroll", updateIndicators);
    updateIndicators();

    return () => {
      resizeObserver.disconnect();
      scrollArea.removeEventListener("scroll", updateIndicators);
    };
  }, []);

  return scrollAreaRef;
}
