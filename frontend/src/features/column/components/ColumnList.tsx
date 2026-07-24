"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoAddSharp } from "react-icons/io5";
import { getColumns } from "@/lib/api/column/get";
import { getTasks } from "@/lib/api/task/get";
import { Column as ColumnType } from "@/lib/types/column.types";
import { Task } from "@/lib/types/task.types";
import { Column } from "./Column";

interface ColumnListProps {
  boardid: string;
}

export const ColumnList = ({ boardid }: ColumnListProps) => {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchColumns = () => {
    getColumns(boardid).then((res) => setColumns(res.data.columns));
  };

  const fetchTasks = () => {
    getTasks().then((res) => setTasks(res.data.tasks));
  };

  useEffect(() => {
    fetchColumns();
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardid]);

  return (
    <div className="flex flex-1 gap-5 pl-35 p-5 overflow-x-auto overflow-y-hidden">
      {columns.map((column) => (
        <Column
          key={column._id}
          column={column}
          columns={columns}
          tasks={tasks}
          onTasksChanged={fetchTasks}
          onDeleted={fetchColumns}
        />
      ))}
      <Link href={`/${boardid}/createColumn`}>
        <div className="p-3 border-2 border-dashed rounded-2xl">
          <IoAddSharp className="text-black size-20" />
        </div>
      </Link>
    </div>
  );
};
