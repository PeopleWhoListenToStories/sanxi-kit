import type { ImageOptions } from '@sanxi-kit/ai';
import type { Extension, NodeViewWrapperProps } from '@sanxi-kit/react';
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
import { generateNanoId } from '~/helpers/nanoid';

const imageStyles = [
  { name: 'photorealistic', label: 'Photorealistic', value: 'photorealistic' },
  { name: 'digital-art', label: 'Digital art', value: 'digital_art' },
  { name: 'comic-book', label: 'Comic book', value: 'comic_book' },
  { name: 'neon-punk', label: 'Neon punk', value: 'neon_punk' },
  { name: 'isometric', label: 'Isometric', value: 'isometric' },
  { name: 'line-art', label: 'Line art', value: 'line_art' },
  { name: '3d-model', label: '3D model', value: '3d_model' },
];

type Data = {
  text: string;
  imageStyle?: ImageOptions;
};

export const AiImageView = ({ editor, node, getPos, deleteNode }: NodeViewWrapperProps) => {
  const t = useTranslations('aiImage');

  const aiOptions = editor.extensionManager.extensions.find((ext: Extension) => ext.name === 'ai').options;

  const [data, setData] = useState<Data>({
    text: '',
    imageStyle: undefined,
  });
  const currentImageStyle = imageStyles.find(t => t.value === data.imageStyle);
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);
  const textareaId = useMemo(() => generateNanoId(), []);

  const generateImage = useCallback(async () => {
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
      text: data.text,
      style: data.imageStyle,
    };

    try {
      const { baseUrl, appId, token } = aiOptions;
      const response = await fetch(`${baseUrl}/image/prompt`, {
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
      const url = json.response;

      if (!url.length) {
        return;
      }

      setPreviewImage(url);

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
    if (!previewImage?.length) {
      return;
    }

    editor
      .chain()
      .insertContent(`<img src="${previewImage}" alt="" />`)
      .deleteRange({ from: getPos(), to: getPos() })
      .focus()
      .run();

    setIsFetching(false);
  }, [editor, previewImage, getPos]);

  const discard = useCallback(() => {
    deleteNode();
  }, [deleteNode]);

  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setData(prevData => ({ ...prevData, text: e.target.value })),
    [],
  );

  const onUndoClick = useCallback(() => {
    setData(prevData => ({ ...prevData, imageStyle: undefined }));
    setPreviewImage(undefined);
  }, []);

  const createItemClickHandler = useCallback((style: { name: string; label: string; value: string }) => {
    return () => setData(prevData => ({ ...prevData, imageStyle: style.value as ImageOptions }));
  }, []);

  return (
    <NodeViewWrapper data-drag-handle>
      <Panel noShadow className="w-full">
        <div className="flex flex-col p-1">
          {isFetching && <Loader label={t('loaderLabel')} />}
          {previewImage && (
            <>
              <PanelHeadline>{t('preview')}</PanelHeadline>
              <div
                className="mb-4 aspect-square w-full rounded border border-black bg-white bg-contain bg-center bg-no-repeat dark:border-neutral-700"
                style={{ backgroundImage: `url(${previewImage})` }}
              />
            </>
          )}
          <div className="row flex items-center justify-between gap-2">
            <PanelHeadline asChild>
              <label htmlFor={textareaId}>{t('prompt')}</label>
            </PanelHeadline>
          </div>
          <Textarea
            id={textareaId}
            value={data.text}
            onChange={handleTextareaChange}
            placeholder={t('placeholder')}
            required
            className="mb-2"
          />
          <div className="flex flex-row flex-wrap items-center justify-between gap-1">
            <div className="flex w-auto justify-between gap-1">
              <Dropdown.Root>
                <Dropdown.Trigger asChild>
                  <Button variant="ghost">
                    <Icon name="Image" />
                    {currentImageStyle?.label || t('imageStyle')}
                    <Icon name="ChevronDown" />
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Portal>
                  <Dropdown.Content side="bottom" align="start" asChild>
                    <Surface className="min-w-48 p-2">
                      {!!data.imageStyle && (
                        <>
                          <DropdownButton isActive={data.imageStyle === undefined} onClick={onUndoClick}>
                            <Icon name="Undo2" />
                            {t('reset')}
                          </DropdownButton>
                          <Toolbar.Divider horizontal />
                        </>
                      )}
                      {imageStyles.map(style => (
                        <DropdownButton
                          isActive={style.value === data.imageStyle}
                          key={style.value}
                          onClick={createItemClickHandler(style)}
                        >
                          {style.label}
                        </DropdownButton>
                      ))}
                    </Surface>
                  </Dropdown.Content>
                </Dropdown.Portal>
              </Dropdown.Root>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-between gap-1">
              {previewImage && (
                <Button
                  variant="ghost"
                  className="text-red-500 hover:bg-red-500/10 hover:text-red-500"
                  onClick={discard}
                >
                  <Icon name="Trash" />
                  {t('discard')}
                </Button>
              )}
              {previewImage && (
                <Button variant="ghost" onClick={insert}>
                  <Icon name="Check" />
                  {t('insert')}
                </Button>
              )}
              <Button variant="default" onClick={generateImage}>
                {previewImage ? <Icon name="Repeat" /> : <Icon name="Sparkles" />}
                {previewImage ? t('regenerate') : t('generateImage')}
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </NodeViewWrapper>
  );
};
