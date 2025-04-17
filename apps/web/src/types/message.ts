import type { IDocument } from './document';
import type { IOrganization } from './organization';
import type { IUser } from './user';
import type { IWiki } from './wiki';

/**
 * 消息数据定义
 */
export type IMessage = {
  id: string;
  userId: IUser['id'];
  title: string;
  message: string;
  url: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type MessageType = 'toOrganization' | 'toWiki' | 'toDocument';

export const buildMessageURL = (
  type: MessageType,
): ((arg: { organizationId: IOrganization['id']; wikiId?: IWiki['id']; documentId?: IDocument['id'] }) => string) => {
  switch (type) {
    case 'toDocument':
      return ({ organizationId, wikiId, documentId }) => {
        return `/app/org/${organizationId}/wiki/${wikiId}/doc/${documentId}`;
      };

    case 'toWiki':
      return ({ organizationId, wikiId }) => {
        return `/app/org/${organizationId}/wiki/${wikiId}`;
      };

    case 'toOrganization':
      return ({ organizationId }) => {
        return `/app/org/${organizationId}`;
      };

    default:
      throw new Error() as never;
  }
};
