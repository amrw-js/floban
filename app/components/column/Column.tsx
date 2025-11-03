"use client";

import { FC, useRef } from "react";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Paper } from "@mui/material";
import cn from "clsx";

import { Columns } from "../../constants/board.constants";
import { Task } from "../../types/board.types";
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
  overIndex: number | null;
  overColumn: Columns | null;
  activeTask?: Task | null;
  onTaskClick?: (task: Task, column: Columns | null) => void;
  onAddTask?: (column: Columns) => void;
};

const ITEM_HEIGHT = 150;
const GAP = 12;

export const Column: FC<ColumnProps> = (props) => {
  const {
    column,
    title,
    taskCount,
    tasks,
    loading,
    errored,
    className,
    overIndex,
    overColumn,
    activeTask,
    onTaskClick,
    onAddTask,
  } = props;

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const { setNodeRef } = useDroppable({
    id: column,
    data: { column },
  });

  const taskIds = tasks.map((task) => task.id.toString());

  const renderContent = () => {
    if (loading) {
      return <ColumnSkeleton />;
    }

    if (errored) {
      return <ColumnError />;
    }

    const renderItem = (index: number) => {
      const task = tasks[index];
      if (!task) {
        return <div />;
      }

      const isActiveTask = activeTask?.id === task.id;
      const shouldShowPlaceholder =
        overColumn === column && overIndex === index && !isActiveTask;

      return (
        <div className="relative h-full">
          {shouldShowPlaceholder && (
            <div className="absolute inset-0 z-10 rounded-lg border-2 border-dashed border-blue-400 bg-blue-50 opacity-70" />
          )}
          <TaskCard
            onClick={onTaskClick}
            column={column}
            task={task}
            index={index}
          />
        </div>
      );
    };

    return (
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <VirtualList
          itemCount={taskCount}
          generateKey={(index) => `${tasks[index]?.title}-${index}`}
          renderItem={renderItem}
          itemHeight={ITEM_HEIGHT}
          gap={GAP}
          overscan={3}
          emptyState={<ColumnPlaceHolder />}
          scrollContainerRef={scrollContainerRef}
        />
      </SortableContext>
    );
  };

  return (
    <Paper
      ref={setNodeRef}
      className={cn(
        "flex h-full min-w-[250px] flex-1 flex-col overflow-hidden rounded-lg transition-all duration-200",
        className
      )}
    >
      <ColumnHeader
        column={column}
        onAddTask={onAddTask}
        title={title}
        taskCount={taskCount}
      />

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-x-hidden overflow-y-auto px-4 py-2"
      >
        {renderContent()}
      </div>
    </Paper>
  );
};
