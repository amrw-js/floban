import { FC } from "react";

import { Skeleton, Stack } from "@mui/material";

type ColumnSkeletonProps = {
  count?: number;
};

export const ColumnSkeleton: FC<ColumnSkeletonProps> = (props) => {
  const { count = 3 } = props;

  return (
    <Stack spacing={1.5}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height={120}
          sx={{
            borderRadius: 1,
          }}
        />
      ))}
    </Stack>
  );
};
