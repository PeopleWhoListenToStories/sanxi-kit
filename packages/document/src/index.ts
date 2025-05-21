import { Node } from "@sanxi-kit/core";

export const Document = Node.create({
  name: "doc",
  topNode: true,
  content: "block+",
});
