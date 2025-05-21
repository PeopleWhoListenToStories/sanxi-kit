import type { Extension, NodeViewWrapperProps } from '@sanxi-kit/react';
import type { AiTone, AiToneOption } from '~/components/BlockEditor/types';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { NodeViewWrapper } from '@sanxi-kit/react';

import { useTranslations } from 'next-intl';

import { useCallback, useMemo, useState } from 'react';
import { Button } from '~/components/ui/button';
import { DropdownButton } from '~/components/ui/dropdown';
import { Icon } from '~/components/ui/icon';
import { Loader } from '~/components/ui/loader';
import { Panel, PanelHeadline } from '~/components/ui/panel';
import { Surface } from '~/components/ui/surface';
import { Textarea } from '~/components/ui/textarea';
import { toast } from '~/components/ui/use-toast';
import { Toolbar } from '~/components/ui/toolbar';
import { tones } from '~/helpers/constants';
import { generateNanoId } from '~/helpers/nanoid';

export type DataProps = {
  text: string;
  addHeading: boolean;
  tone?: AiTone;
  textUnit?: string;
  textLength?: string;
  language?: string;
};

export const AiWriterView = ({ editor, node, getPos, deleteNode }: NodeViewWrapperProps) => {
  const t = useTranslations('aiWriter');

  const aiOptions = editor.extensionManager.extensions.find((ext: Extension) => ext.name === 'ai').options;

  const [data, setData] = useState<DataProps>({
    text: '',
    tone: undefined,
    textLength: undefined,
    addHeading: false,
    language: undefined,
  });
  const currentTone = tones.find(t => t.value === data.tone);
  const [previewText, setPreviewText] = useState(undefined);
  const [isFetching, setIsFetching] = useState(false);
  const textareaId = useMemo(() => generateNanoId(), []);

  const generateText = useCallback(async () => {
    const { text: dataText, tone, textLength, textUnit, addHeading, language } = data;

    if (!data.text) {
      toast({
        title: `${t('toastTitle')}`,
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">{t('toastText')}</code>
          </pre>
        ),
      });
      return;
    }

    setIsFetching(true);

    const payload = {
      text: dataText,
      textLength,
      textUnit,
      useHeading: addHeading,
      tone,
      language,
    };

    try {
      const { baseUrl, appId, token } = aiOptions;

      const response = await fetch(`${baseUrl}/text/prompt`, {
        method: 'POST',
        headers: {
          'accept': 'application.json',
          'Content-Type': 'application/json',
          'X-App-Id': appId.trim(),
          'Authorization': `Bearer ${token.trim()}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      const text = json.response;

      if (!text.length) {
        setIsFetching(false);

        return;
      }

      setPreviewText(text);

      setIsFetching(false);
    } catch (errPayload: any) {
      const errorMessage = errPayload?.response?.data?.error;
      const message = errorMessage !== 'An error occurred' ? `An error has occured: ${errorMessage}` : errorMessage;

      setIsFetching(false);
      toast({
        title: `${t('toastTitle')}`,
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">{message}</code>
          </pre>
        ),
      });
    }
  }, [data, aiOptions]);

  const insert = useCallback(() => {
    const from = getPos();
    const to = from + node.nodeSize;

    editor.chain().focus().insertContentAt({ from, to }, previewText).run();
  }, [editor, previewText, getPos, node.nodeSize]);

  const discard = useCallback(() => {
    deleteNode();
  }, [deleteNode]);

  const onTextAreaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(prevData => ({ ...prevData, text: e.target.value }));
  }, []);

  const onUndoClick = useCallback(() => {
    setData(prevData => ({ ...prevData, tone: undefined }));
  }, []);

  const createItemClickHandler = useCallback((tone: AiToneOption) => {
    return () => {
      setData(prevData => ({ ...prevData, tone: tone.value }));
    };
  }, []);

  return (
    <NodeViewWrapper data-drag-handle>
      <Panel noShadow className="w-full">
        <div className="flex flex-col p-1">
          {isFetching && <Loader label={t('loaderLabel')} />}
          {previewText && (
            <>
              <PanelHeadline>{t('preview')}</PanelHeadline>
              <div
                className="relative mb-4 ml-2.5 max-h-56 overflow-y-auto border-l-4 border-neutral-100 bg-white px-4 text-base text-black dark:border-neutral-700 dark:bg-black dark:text-white"
                dangerouslySetInnerHTML={{ __html: previewText }}
              />
            </>
          )}
          <div className="flex flex-row items-center justify-between gap-1">
            <PanelHeadline asChild>
              <label htmlFor={textareaId}>{t('prompt')}</label>
            </PanelHeadline>
          </div>
          <Textarea
            id={textareaId}
            value={data.text}
            onChange={onTextAreaChange}
            placeholder={t('placeholder')}
            required
            className="mb-2"
          />
          <div className="flex flex-row flex-wrap items-center justify-between gap-1">
            <div className="flex w-auto justify-between gap-1">
              <Dropdown.Root>
                <Dropdown.Trigger asChild>
                  <Button variant="tertiary">
                    <Icon name="Mic" />
                    {currentTone?.label || 'Change tone'}
                    <Icon name="ChevronDown" />
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Portal>
                  <Dropdown.Content side="bottom" align="start" asChild>
                    <Surface className="min-w-48 p-2">
                      {!!data.tone && (
                        <>
                          <Dropdown.Item asChild>
                            <DropdownButton isActive={data.tone === undefined} onClick={onUndoClick}>
                              <Icon name="Undo2" />
                              {t('reset')}
                            </DropdownButton>
                          </Dropdown.Item>
                          <Toolbar.Divider horizontal />
                        </>
                      )}
                      {tones.map(tone => (
                        <Dropdown.Item asChild key={tone.value}>
                          <DropdownButton isActive={tone.value === data.tone} onClick={createItemClickHandler(tone)}>
                            {tone.label}
                          </DropdownButton>
                        </Dropdown.Item>
                      ))}
                    </Surface>
                  </Dropdown.Content>
                </Dropdown.Portal>
              </Dropdown.Root>
            </div>
            <div className="flex w-auto flex-wrap justify-between gap-1">
              {previewText && (
                <Button
                  variant="ghost"
                  className="text-red-500 hover:bg-red-500/10 hover:text-red-500"
                  onClick={discard}
                >
                  <Icon name="Trash" />
                  {t('discard')}
                </Button>
              )}
              {previewText && (
                <Button variant="ghost" onClick={insert} disabled={!previewText}>
                  <Icon name="Check" />
                  {t('insert')}
                </Button>
              )}
              <Button variant="primary" onClick={generateText} style={{ whiteSpace: 'nowrap' }}>
                {previewText ? <Icon name="Repeat" /> : <Icon name="Sparkles" />}
                {previewText ? t('regenerate') : t('generateText')}
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </NodeViewWrapper>
  );
};
