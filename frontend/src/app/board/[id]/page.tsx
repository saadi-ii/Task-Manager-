import { PageProps } from "@/lib/types/pageProps.types";
import { ColumnList } from "@/features/column/components/ColumnList";
import { getColumnsServer } from "@/lib/api/column/server-get";
import { getTasksServer } from "@/lib/api/task/server-get";
import { getSubtasksServer } from "@/lib/api/subtask/server-get";
import { Column as ColumnType } from "@/lib/types/column.types";
import { Task } from "@/lib/types/task.types";
import { Subtask } from "@/lib/types/subtask.types";



export default async function Page({ params }: PageProps) {
  const { id } = await params;
    let columns: ColumnType[] = [];
    let tasks: Task[] = [];
    let subtasks: Subtask[] = [];
    try {
      columns = await getColumnsServer(id);
      tasks = await getTasksServer();
      subtasks = await getSubtasksServer();
    } catch (err) {
      console.error("Failed to fetch data for ColumnList:", err);
    }

    
  return (
    <div className="flex flex-col h-full w-full">
      <ColumnList boardid={id} columns={columns} tasks={tasks} subtasks={subtasks}/>
    </div>
  );
}
