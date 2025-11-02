import { FC, ReactElement, RefObject } from "react";

import { Box } from "@mui/material";

import { useVirtualScroll } from "../hooks/useVirtualScroll";

type VirtualListProps = {
  itemCount: number;
  itemHeight: number;
  gap?: number;
  overscan?: number;
  emptyState?: ReactElement;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  renderItem: (index: number) => ReactElement;
};

export const VirtualList: FC<VirtualListProps> = (props) => {
  const {
    itemCount,
    renderItem,
    itemHeight,
    gap = 12,
    overscan = 3,
    emptyState,
    scrollContainerRef,
  } = props;

  const { visibleIndices, totalHeight, offsetTop } = useVirtualScroll({
    itemCount,
    itemHeight,
    gap,
    overscan,
    scrollContainerRef,
  });

  if (itemCount === 0 && emptyState) {
    return <Box sx={{ height: "100%", width: "100%" }}>{emptyState}</Box>;
  }

  return (
    <Box
      sx={{
        height: `${totalHeight}px`,
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        sx={{
          transform: `translateY(${offsetTop}px)`,
        }}
      >
        {visibleIndices.map((index) => (
          <Box
            key={index}
            sx={{
              height: `${itemHeight}px`,
              marginBottom: index < itemCount - 1 ? `${gap}px` : 0,
            }}
          >
            {renderItem(index)}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
