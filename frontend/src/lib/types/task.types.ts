export interface Task {
  _id: string;
  columnid: string;
  taskname: string;
  priority?: string;
  comment?: string;
  date?: string;
}

export interface CreateTaskPayload {
  columnid: string;
  taskname: string;
}

export interface RenameTaskPayload {
  taskname: string;
  newtaskname: string;
}

export interface MoveTaskPayload {
  taskname: string;
  columnid: string;
}

export interface TaskPriorityPayload {
  taskname: string;
  columnid: string;
  priority: string;
}

export interface TaskDatePayload {
  taskname: string;
  columnid: string;
  date: string;
}

export interface DeleteTaskPayload {
  taskname: string;
  columnid: string;
}
