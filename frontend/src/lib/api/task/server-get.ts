import axios from "axios";
import { api2 } from "@/lib/api/baseURL.server";
import { Task } from "@/lib/types/task.types";
import { Subtask } from "@/lib/types/subtask.types";
import { Comment } from "@/lib/types/comment.types";

export const getTasksServer = async () => {
  const { data } = await (await api2()).get("/task/get");
  return (data.tasks || []) as Task[];
};

export const getTaskDetailServer = async (taskid: string) => {
  try {
    const { data } = await (await api2()).get("/task/getall", {
      params: { taskid }, 
    });
    

    return {
      task: data.task as Task,
      subtasks: (data.subtasks || []) as Subtask[],
      comments: (data.comments || []) as Comment[],
    };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return null;
    }
    throw err;
  }
};
