import type { IDocument } from './document';
import type { IOrganization } from './organization';
import type { IUser } from './user';

/**
 * 知识库状态枚举
 */
export enum WikiStatus {
  private = 'private',
  public = 'public',
}

/**
 * 知识库数据定义
 */
export type IWiki = {
  id: string;
  organizationId: IOrganization['id'];
  name: string;
  avatar: string;
  description: string;
  createUserId: IUser['id'];
  createUser: IUser;
  status: WikiStatus;
  homeDocumentId: IDocument['id'];
  createdAt: Date;
  updatedAt: Date;
};
