import { TaskDetail } from "@/features/task/components/TaskDetail";

import { getTaskDetailServer } from "@/lib/api/task/server-get";
import { getColumnsServer } from "@/lib/api/column/server-get";
import { getTasksServer } from "@/lib/api/task/server-get";
import { getUserServer } from "@/lib/api/auth/server-get";
import { Task } from "@/lib/types/task.types";
import { Subtask } from "@/lib/types/subtask.types";
import { Column } from "@/lib/types/column.types";
import { Comment } from "@/lib/types/comment.types";


interface Params {
  params: Promise<{ id: string; taskid: string }>;
}

export default async function Page({ params }: Params) {
  const { id, taskid } = await params;

    let task: Task | null = null;
    let subtasks: Subtask[] = [];
    let comments: Comment[] = [];
    let columns: Column[] = [];
    let allTasks: Task[] = [];
    let username = undefined;
    let notFound = false;
  
    try {
      const [detail, cols, tasks, user] = await Promise.all([
        getTaskDetailServer(taskid),
        getColumnsServer(id),
        getTasksServer(),
        getUserServer().catch(() => null),
      ]);
  
      if (!detail) {
        notFound = true;
      } else {
        task = detail.task;
        subtasks = detail.subtasks;
        comments = detail.comments;
      }
      columns = cols;
      allTasks = tasks;
      if (user) username = user.username;
    } catch (error) {
      console.error("Failed to load task detail:", error);
      notFound = true;
    }


  

  return (
    <div className="flex h-full w-full flex-col">
      <TaskDetail boardid={id} taskid={taskid}  task={task} subtasks={subtasks} comments={comments} columns={columns} allTasks={allTasks} username={username} notFound={notFound}/>
    </div>
  );
}
