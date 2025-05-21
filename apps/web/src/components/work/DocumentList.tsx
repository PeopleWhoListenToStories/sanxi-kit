import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export const DocumentList = ({ type }: { type: 'recent' | 'starred' | 'shared' }) => {
  // 这里后续需要根据type获取不同类型的文档列表
  const documents = [];

  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="py-10">
          <div className="text-center text-muted-foreground">
            暂无文档
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <Card key={doc.id}>
          <CardHeader>
            <CardTitle>{doc.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* 文档内容预览和操作按钮 */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}