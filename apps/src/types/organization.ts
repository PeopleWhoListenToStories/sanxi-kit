import type { IUser } from './user';

/**
 * 组织数据定义
 */
export type IOrganization = {
  id: string;
  name: string;
  description: string;
  logo: string;
  createUserId: IUser['id'];
  isPersonal: boolean;
};
