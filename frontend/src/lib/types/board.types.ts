export interface Board {
  _id: string;
  boardname: string;
  boarddescription?:string;
  isDefault?: boolean;
  todoCount?: number;
}

export interface CreateBoardPayload {
  boardname: string;
  boarddescription?:string;
}
