import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { getTaskDetailServer } from "@/lib/api/task/server-get";
import { getColumnsServer } from "@/lib/api/column/server-get";
import { getTasksServer } from "@/lib/api/task/server-get";
import { getUserServer } from "@/lib/api/auth/server-get";
import { Task } from "@/lib/types/task.types";
import { Subtask } from "@/lib/types/subtask.types";
import { Column } from "@/lib/types/column.types";
import { Comment } from "@/lib/types/comment.types";
import { DueDate } from "@/shared/components/task-subtask/DueDate";
import { Priority } from "@/shared/components/task-subtask/Priority";
import { AddSubtask } from "@/features/subtask/components/AddSubtask";
import { SubtaskCard } from "@/features/subtask/components/SubtaskCard";
import { MoveTask } from "./MoveTask";
import { AdvanceTaskButton } from "./AdvanceTaskButton";
import { RenameButton } from "@/shared/components/task-subtask/RenameButton";
import { DeleteButton } from "@/shared/components/task-subtask/DeleteButton";
import { CommentSection } from "./CommentSection";
import { revalidatePath } from "next/cache";

interface TaskDetailProps {
  boardid: string,
  taskid: string,
  task: Task | null,
  subtasks: Subtask[],
  comments: Comment[],
  columns: Column[],
  allTasks: Task[],
  username: string,
  notFound: boolean,
}

export const TaskDetail = async ({ boardid, taskid, task, subtasks, comments, columns, allTasks, username, notFound }: TaskDetailProps) => {
  const load = async () => {
    "use server";
    revalidatePath(`/board/${boardid}/${taskid}`);
  };

  const goToBoard = async () => {
    "use server";
    redirect(`/board/${boardid}`);
  };

  const currentColumn = columns.find((c) => c._id === task?.columnid);
  if (notFound || !task) {
    return (
      <div className="p-8">
        <div className="text-lg font-semibold">Task not found</div>
        <Link href={`/board/${boardid}`} className="text-sm text-primary underline">
          Back to board
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      <div className="flex-1 min-w-0 flex flex-col border-b lg:border-b-0 lg:border-r border-border">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={`/board/${boardid}`}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Back to board"
            >
              <ArrowLeft className="size-5" />
            </Link>
            <div className="text-sm text-muted-foreground truncate">Task</div>
          </div>
          <div className="flex items-center gap-2">
            {currentColumn && (
              <AdvanceTaskButton
                taskId={task._id}
                currentColumn={currentColumn}
                columns={columns}
                onSuccess={load}
              />
            )}
            <MoveTask
              taskId={task._id}
              taskName={task.taskname}
              currentColumnId={task.columnid}
              columns={columns}
              tasks={allTasks}
              onSuccess={load}
            />
            <RenameButton mode="task" taskname={task.taskname} onSuccess={load} />
            <DeleteButton
              mode="task"
              taskname={task.taskname}
              columnid={task.columnid}
              onSuccess={goToBoard}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          <h1 className="text-3xl font-bold break-words">{task.taskname}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <FieldRow label="Status">
              <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                {task.columnname}
              </span>
            </FieldRow>
            <FieldRow label="Priority">
              <Priority mode="task" taskname={task.taskname} columnid={task.columnid} priority={task.priority} />
            </FieldRow>
            <FieldRow label="Due">
              <DueDate mode="task" taskname={task.taskname} columnid={task.columnid} date={task.date} />
            </FieldRow>
            <FieldRow label="Repeat">
              <span className="text-muted-foreground capitalize">
                {task.recurrence ?? "once"}
              </span>
            </FieldRow>
          </div>

          <section>
            <div className="text-sm font-semibold mb-2">Description</div>
            <div className="rounded-md border border-border bg-muted/40 p-3 min-h-24 whitespace-pre-wrap text-sm">
              {task.description?.trim() ? task.description : (
                <span className="text-muted-foreground">No description.</span>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold">
                Subtasks <span className="text-muted-foreground font-normal">({subtasks.length})</span>
              </div>
              <AddSubtask taskid={task._id} onSuccess={load} />
            </div>
            <div className="flex flex-col gap-2">
              {subtasks.length === 0 ? (
                <div className="text-sm text-muted-foreground">No subtasks yet.</div>
              ) : (
                subtasks.map((st) => (
                  <SubtaskCard key={st._id} subtask={st} onChanged={load} />
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      <aside className="w-full lg:w-96 shrink-0 flex flex-col min-h-96">
        <CommentSection taskid={task._id} initialComments={comments} currentUsername={username} />
      </aside>
    </div>
  );
};

const FieldRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-4">
    <div className="w-24 text-muted-foreground">{label}</div>
    <div className="flex-1 min-w-0">{children}</div>
  </div>
);
