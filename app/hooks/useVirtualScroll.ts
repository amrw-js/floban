import { RefObject, useCallback, useEffect, useState } from "react";

type UseVirtualScrollParams = {
  itemCount: number;
  itemHeight: number;
  gap?: number;
  overscan?: number;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
};

type UseVirtualScrollReturn = {
  visibleStartIndex: number;
  visibleEndIndex: number;
  totalHeight: number;
  offsetTop: number;
  visibleIndices: number[];
};

export const useVirtualScroll = (
  params: UseVirtualScrollParams
): UseVirtualScrollReturn => {
  const {
    itemCount,
    itemHeight,
    gap = 12,
    overscan = 3,
    scrollContainerRef,
  } = params;

  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [visibleEndIndex, setVisibleEndIndex] = useState(0);

  const totalHeight = itemCount * itemHeight + Math.max(0, itemCount - 1) * gap;

  const calculateVisibleRange = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const scrollTop = scrollContainerRef.current.scrollTop;
    const containerHeight = scrollContainerRef.current.clientHeight;

    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / (itemHeight + gap)) - overscan
    );

    const endIndex = Math.min(
      itemCount - 1,
      Math.ceil((scrollTop + containerHeight) / (itemHeight + gap)) + overscan
    );

    setVisibleStartIndex(startIndex);
    setVisibleEndIndex(endIndex);
  }, [itemCount, itemHeight, gap, overscan, scrollContainerRef]);

  const handleScroll = useCallback(() => {
    calculateVisibleRange();
  }, [calculateVisibleRange]);

  useEffect(() => {
    calculateVisibleRange();
  }, [calculateVisibleRange]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll, scrollContainerRef]);

  const offsetTop = visibleStartIndex * (itemHeight + gap);

  const visibleIndices = Array.from(
    { length: visibleEndIndex - visibleStartIndex + 1 },
    (_, i) => visibleStartIndex + i
  );

  return {
    visibleStartIndex,
    visibleEndIndex,
    totalHeight,
    offsetTop,
    visibleIndices,
  };
};
