import type { IOrganization } from './organization';
import type { IUser } from './user';
import type { IWiki } from './wiki';

/**
 * 文档状态枚举
 */
export enum DocumentStatus {
  private = 'private',
  public = 'public',
}

/**
 * 文档数据定义
 */
export type IDocument = {
  id: string;
  organizationId: IOrganization['id'];
  wikiId: IWiki['id'];
  isWikiHome: boolean;
  createUserId: IUser['id'];
  createUser: IUser;
  parentDocumentId?: IDocument['id'];
  title: string;
  content: string;
  state: Uint8Array;
  status: DocumentStatus;
  views: number;
  sharePassword?: string;
  createdAt: Date;
  updatedAt: Date;
  children?: IDocument[];
};

/**
 * 文档成员权限数据定义
 */
export type IAuthority = {
  id: string;
  documentId: IDocument['id'];
  userId: IUser['id'];
  readable: boolean;
  editable: boolean;
  createUserId: IUser['id'];
};
