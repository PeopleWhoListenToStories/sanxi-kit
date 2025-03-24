import { TableRow as SanxiKitTableRow } from '@sanxi-kit/table';

export const TableRow = SanxiKitTableRow.extend({
  allowGapCursor: false,
  content: 'tableCell*',
});

export default TableRow;
