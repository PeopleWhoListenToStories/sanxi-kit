import type { IDocument } from './document';
import type { IUser } from './user';

/**
 * 评论
 */
export type IComment = {
  id: string;
  parentCommentId?: IComment['id'];
  documentId: IDocument['id'];
  createUserId: IUser['id'];
  createUser: IUser;
  replyUserId?: IUser['id'];
  replyUser?: IUser;
  html: string;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
  children?: IComment[];
};
