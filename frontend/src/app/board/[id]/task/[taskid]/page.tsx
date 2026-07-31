import { TaskDetail } from "@/features/task/components/TaskDetail";

interface Params {
  params: Promise<{ id: string; taskid: string }>;
}

export default async function Page({ params }: Params) {
  const { id, taskid } = await params;

  return (
    <div className="flex h-full w-full flex-col">
      <TaskDetail boardid={id} taskid={taskid} />
    </div>
  );
}
