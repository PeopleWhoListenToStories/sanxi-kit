import { WebSocketStatus } from '@hocuspocus/provider';

export const getConnectionText = (collabState: WebSocketStatus) => {
  switch (collabState) {
    case WebSocketStatus.Connected:
      return 'connect';

    case WebSocketStatus.Connecting:
      return 'connecting';

    case WebSocketStatus.Disconnected:
      return 'disconnect';

    default:
      return 'connecting';
  }
}
