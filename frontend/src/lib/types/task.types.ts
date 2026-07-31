export interface Task {
  _id: string;
  columnid: string;
  columnname: string;
  taskname: string;
  description:string;
  priority?: string;
  comment?: string;
  date?: string;
  recurrence?: "once" | "daily" | "weekly" | "monthly" | "yearly";
}

export interface CreateTaskPayload {
  columnid: string;
  taskname: string;
  columnname: string;
  description:string;
  newPriority:string;
  deadLine:string;
}

export interface RenameTaskPayload {
  taskname: string;
  newtaskname: string;
}

export interface MoveTaskPayload {
  taskid: string;
  columnid: string;
  columnname: string;
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
