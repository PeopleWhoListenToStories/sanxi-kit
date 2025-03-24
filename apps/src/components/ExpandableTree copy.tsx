"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, EllipsisHorizontalIcon, StarIcon, TrashIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { Move } from "lucide-react";
import { useLocale } from "next-intl";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { cn } from "~/helpers/utils";
import { Link } from "~/i18n/navigation";
import { useTreeStore } from '~/stores/treeStore';
import { useAuthStore } from '~/stores/authStore';
import { useSearchDocuments } from "~/services/document";
import { IDocument } from "~/types";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction, SidebarMenuSub } from "~/components/ui/sidebar";

type TreeNode = {
  id: string;
  title: string;
  children?: TreeNode[];
  disableLink?: boolean;
};

const defaulltTreeData: TreeNode = [
  {
    id: "",
    title: "我的文档",
    disableLink: true,
    children: []
  },
];

export default function ExpandableTree() {
  const [treeData, setTreeData] = useState(defaulltTreeData);
  const [keyword, setKeyword] = useState('');
  const [searchDocs, setSearchDocs] = useState<IDocument[]>([]);
  const { organization } = useAuthStore();
  const [error, setError] = useState(null);
  const { search: searchApi, loading } = useSearchDocuments();
  const search = useCallback(() => {
    setError(null);
    searchApi({
      keyword,
      organizationId: organization.id,
    })
      .then((res) => {
        setSearchDocs(res);
        setTreeData((pre) => ([{ ...pre[0], children: res.map(v => ({ id: v.id, title: v.title })) }]));
      })
      .catch((err) => {
        setError(err);
      });
  }, [searchApi, keyword]);

  useEffect(() => {
    if (organization.id) {
      setKeyword('');
      search();
    }
  }, [organization]);

  return (
    <SidebarMenu>
      {treeData.map((node) => (
        <TreeNode key={node.id} node={node} isRoot={true} />
      ))}
    </SidebarMenu>
  );
}

function TreeNode({ node, isRoot = false }: { node: TreeNode; isRoot?: boolean }) {
  const disableLink = node.disableLink || false;
  const { expandedNodes, setExpanded } = useTreeStore();
  const isOpen = expandedNodes.has(node.id);
  const [isStarred, setIsStarred] = useState(false);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className="group/menu-button"
        onClick={(e) => {
          if (node.children && isRoot) {
            e.preventDefault();
            setExpanded(node.id, !isOpen);
          }
        }}
      >
        {disableLink ? (
          <div className="flex items-center gap-2">
            {node.children && isRoot && (
              <span className="flex items-center justify-center">
                {isOpen ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
              </span>
            )}
            <span>{node.title}</span>
          </div>
        ) : (
          <Link href={`/work/${node.id}`} className="flex items-center gap-2">
            {node.children && isRoot && (
              <span className="flex items-center justify-center">
                {isOpen ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
              </span>
            )}
            <span>{node.title}</span>
          </Link>
        )}
      </SidebarMenuButton>

      {!disableLink && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction showOnHover>
              <EllipsisHorizontalIcon className="w-4 h-4" />
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setIsStarred(!isStarred)}>
              <StarIcon className={cn("mr-2 h-4 w-4", isStarred ? "text-yellow-400 fill-yellow-400" : "")} />
              <span>{isStarred ? "取消收藏" : "收藏"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ClipboardDocumentIcon className="mr-2 h-4 w-4" />
              <span>复制</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Move className="mr-2 h-4 w-4" />
              <span>移动</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <TrashIcon className="mr-2 h-4 w-4" />
              <span>删除</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {isOpen && node.children && (
        <SidebarMenuSub>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} isRoot={false} />
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}
