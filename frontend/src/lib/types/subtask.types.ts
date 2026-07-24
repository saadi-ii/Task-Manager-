export interface Subtask {
  _id: string;
  taskid: string;
  subtaskname: string;
  priority?: string;
  date?: string;
}

export interface CreateSubtaskPayload {
  taskid: string;
  subtaskname: string;
}

export interface RenameSubtaskPayload {
  subtaskname: string;
  taskid: string;
  newsubtaskname: string;
}

export interface SubtaskPriorityPayload {
  subtaskname: string;
  taskid: string;
  priority: string;
}

export interface SubtaskDatePayload {
  subtaskname: string;
  taskid: string;
  date: string;
}

export interface DeleteSubtaskPayload {
  subtaskname: string;
  taskid: string;
}
