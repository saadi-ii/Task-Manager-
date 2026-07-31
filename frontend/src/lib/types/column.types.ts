export interface Column {
  _id: string;
  boardid: string;
  columnname: string;
  isDefault?: boolean;
}

export interface CreateColumnPayload {
  columnname: string;
  boardid: string;
}

export interface DeleteColumnPayload {
  columnname: string;
  boardid: string;
}
