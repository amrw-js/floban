"use client";

import { FC, useRef } from "react";

import { Paper } from "@mui/material";
import cn from "clsx";

import { Task } from "../../types/tasks.types";
import { TaskCard } from "../TaskCard";
import { VirtualList } from "../VirtualList";
import { ColumnError } from "./ColumnError";
import { ColumnHeader } from "./ColumnHeader";
import { ColumnPlaceHolder } from "./ColumnPlaceholder";
import { ColumnSkeleton } from "./ColumnSkeleton";

type ColumnProps = {
  title: string;
  taskCount: number;
  tasks: Task[];
  loading: boolean;
  errored: boolean;
  className?: string;
};

export const Column: FC<ColumnProps> = (props) => {
  const { title, taskCount, tasks, loading, errored, className } = props;

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const renderContent = () => {
    if (loading) {
      return <ColumnSkeleton />;
    }

    if (errored) {
      return <ColumnError />;
    }

    return (
      <VirtualList
        itemCount={taskCount}
        renderItem={(index) => <TaskCard task={tasks[index]} />}
        itemHeight={200}
        gap={12}
        overscan={3}
        emptyState={<ColumnPlaceHolder />}
        scrollContainerRef={scrollContainerRef}
      />
    );
  };

  return (
    <Paper
      elevation={2}
      className={cn(
        "flex h-full min-w-74 flex-1 flex-col overflow-hidden rounded-lg bg-gray-100",
        className
      )}
    >
      <ColumnHeader title={title} taskCount={taskCount} />
      <div
        ref={scrollContainerRef}
        className={cn(
          "flex-1 overflow-x-hidden overflow-y-auto px-4 pb-4",
          "scrollbar-thin scrollbar-track-transparent"
        )}
      >
        {renderContent()}
      </div>
    </Paper>
  );
};
