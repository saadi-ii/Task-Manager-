export interface Comment {
  _id: string;
  taskid: string;
  userID: string;
  username: string;
  text: string;
  createdAt: string;
}

export interface CreateCommentPayload {
  taskid: string;
  text: string;
}
