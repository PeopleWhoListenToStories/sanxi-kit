import type { Transaction } from '@sanxi-kit/core';

import { ySyncPluginKey } from '~/extensions/thritypart/y-prosemirror/y-prosemirror';

export function isChangeOrigin(transaction: Transaction): boolean {
  return !!transaction.getMeta(ySyncPluginKey);
}
