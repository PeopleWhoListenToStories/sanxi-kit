'use client';

import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { HocuspocusProvider } from '@hocuspocus/provider'
import { Watermark as WatermarkJS } from '@sanxi-kit/watermark'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Doc as YDoc } from 'yjs'

// import { BlockEditor } from '~/components/BlockEditor'
import { Banner } from '~/components/ui/banner'
import { Loader } from '~/components/ui/loader'
import { useNetwork } from '~/hooks/useNetwork'
import { useToggle } from '~/hooks/useToggle'
// import EditorClient from '~/components/Editor/EditorClient';
import Editor from '~/components/Editor/Editor';

// type PageProps = {
//   params: {
//     locale: string;
//     room: string;
//   };
//   searchParams?: { [key: string]: string | string[] | undefined };
// }

export interface AiState {
  isAiLoading: boolean;
  aiError?: string | null;
}

export type ProviderStatus = 'connecting' | 'connected' | 'disconnected' | 'loadCacheSuccess';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Document({ params }: any) {
  const searchParams = useSearchParams();
  const t = useTranslations();
  const { online } = useNetwork();
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);
  const [collabToken, setCollabToken] = useState<string | null>(null);
  const [aiToken, setAiToken] = useState<string | null>(null);
  const [loading, toggleLoading] = useToggle(true);
  const [status, setStatus] = useState<ProviderStatus>('connecting');

  const hasCollab = parseInt(searchParams.get('noCollab') as string) !== 1;
  const { room } = params;

  useEffect(() => {
    initWatermark();
    setCollabToken(searchParams.get('token'));
  }, []);

  useEffect(() => {
    setAiToken(searchParams.get('aiToken') || 'aiToken');
  }, []);

  const initWatermark = () => {
    new WatermarkJS({
      content: [`永远都像初次见面那样使我心荡漾 `, `              - ${searchParams.get('user')}`],
      height: 32,
      width: 165,
    })
      .create()
      .then(base64String => {
        const oDiv = document.createElement('div');
        const watermarkStyle: Partial<CSSStyleDeclaration> = {
          position: 'fixed',
          top: '0',
          left: '0',
          zIndex: '2147483647',
          width: '100%',
          height: '100%',
          backgroundSize: '332px',
          backgroundRepeat: 'repeat',
          pointerEvents: 'none',
          backgroundImage: `url(${base64String})`,
        };
        Object.assign(oDiv.style, watermarkStyle);
        document.body.appendChild(oDiv);
      })
      .catch(() => {});
  };

  const ydoc = useMemo(() => new YDoc(), []);

  useLayoutEffect(() => {
    if (hasCollab && collabToken) {
      setProvider(
        new HocuspocusProvider({
          url: process.env.COLLABORATION_API_URL as string,
          name: room,
          document: ydoc,
          token: collabToken,
          parameters: {
            targetId: room,
            userId: searchParams.get('userId'),
            docType: 'document',
            editable: true,
          },
          onAwarenessUpdate: ({ states }) => {},
          onAuthenticationFailed(e) {
            toggleLoading(false);
          },
          onSynced() {
            toggleLoading(false);
          },
          onStatus({ status }) {
            setStatus(status);
          },
        }),
      );
    }
  }, [setProvider, collabToken, ydoc, room, hasCollab]);

  if ((hasCollab && (!collabToken || !provider)) || !aiToken) return null;

  return (
    <div className='w-full h-[100vh]'>
      {loading && <Loader label={t('global.connecting')} />}
      {(!online || status === 'disconnected') && (
        <Banner
          type="warning"
          description={hasCollab ? t('global.connectingDisconnectOnlyEdit') : t('global.connectingDisconnectOnlyRead')}
        />
      )}
      <Editor userName={`游客-${searchParams.get('user')}`} docId={room} editable={false} aiToken={aiToken} hasCollab={hasCollab} ydoc={ydoc} provider={provider} />
      {/* <BlockEditor userName={`游客-${searchParams.get('user')}`} docId={room} editable={false} aiToken={aiToken} hasCollab={hasCollab} ydoc={ydoc} provider={provider} /> */}
    </div>
  );
}
