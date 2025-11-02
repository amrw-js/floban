"use client";

import { FC, useRef } from "react";

import { Paper } from "@mui/material";
import cn from "clsx";

import { Columns } from "../../constants/tasks.constants";
import { useDndColumn } from "../../hooks/useDndColumn";
import { Task } from "../../types/tasks.types";
import { TaskCard } from "../TaskCard";
import { VirtualList } from "../VirtualList";
import { ColumnError } from "./ColumnError";
import { ColumnHeader } from "./ColumnHeader";
import { ColumnPlaceHolder } from "./ColumnPlaceholder";
import { ColumnSkeleton } from "./ColumnSkeleton";

type ColumnProps = {
  column: Columns;
  title: string;
  taskCount: number;
  tasks: Task[];
  loading: boolean;
  errored: boolean | unknown;
  className?: string;
};

const ITEM_HEIGHT = 200;
const GAP = 12;

export const Column: FC<ColumnProps> = (props) => {
  const { column, title, taskCount, tasks, loading, errored, className } =
    props;

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const { setNodeRef, isOver } = useDndColumn({ column });

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
        renderItem={(index) => {
          return <TaskCard task={tasks[index]} column={column} index={index} />;
        }}
        itemHeight={ITEM_HEIGHT}
        gap={GAP}
        overscan={3}
        emptyState={<ColumnPlaceHolder />}
        scrollContainerRef={scrollContainerRef}
      />
    );
  };

  return (
    <Paper
      ref={setNodeRef}
      elevation={isOver ? 4 : 2}
      className={cn(
        "flex h-full flex-1 flex-col overflow-hidden rounded-lg transition-all duration-200",
        isOver
          ? "scale-[1.02] bg-blue-50 ring-2 ring-blue-500 ring-offset-2"
          : "bg-gray-100",
        className
      )}
    >
      <ColumnHeader
        className={cn(isOver && "bg-blue-50")}
        title={title}
        taskCount={taskCount}
      />

      <div
        ref={scrollContainerRef}
        className="custom-scrollbar flex-1 overflow-x-hidden overflow-y-auto px-4 pb-4"
      >
        {renderContent()}
      </div>
    </Paper>
  );
};
