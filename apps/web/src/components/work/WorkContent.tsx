import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { DocumentList } from '~/components/work/DocumentList';
import { WorkHeader } from '~/components/work/WorkHeader';
import { useCreateDocument } from '~/services/document';
import { useAuthStore } from '~/stores/authStore';

export const WorkContent = () => {
  const t = useTranslations('work');
  const router = useRouter();
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const { organization, wikiList } = useAuthStore();
  const { create: createDocument, loading: createLoading } = useCreateDocument();

  return (
    <div className="h-full">
      <WorkHeader />
      <div className='p-6 space-y-6 overflow-auto'>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <Button
            onClick={async () => {
              try {
                const doc = await createDocument({
                  organizationId: organization.id,
                  wikiId: wikiList[0].id,
                  title: '未命名文档',
                });
                if (doc?.id) {
                  router.push(locale + `/work/${doc.id}`);
                }
              } catch (error) {
                console.error('Failed to create document:', error);
              }
            }}
            disabled={createLoading}
          >
            {t('newDocument')}
          </Button>
        </div>

        <div className="w-full max-w-sm">
          <Input
            type="search"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="recent" className="w-full">
          <TabsList>
            <TabsTrigger value="recent">{t('recentDocuments')}</TabsTrigger>
            <TabsTrigger value="starred">{t('starredDocuments')}</TabsTrigger>
            <TabsTrigger value="shared">{t('sharedDocuments')}</TabsTrigger>
          </TabsList>

          <TabsContent value="recent">
            <DocumentList type="recent" />
          </TabsContent>

          <TabsContent value="starred">
            <DocumentList type="starred" />
          </TabsContent>

          <TabsContent value="shared">
            <DocumentList type="shared" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}