import type { ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';

import { useCallback } from 'react';

import { Button } from '~/components/ui/button';

import { Spinner } from '~/components/ui/spinner';
import { cn } from '~/helpers/utils';
import { useDropZone, useFileUpload, useUploader } from './hooks';
import { Icon } from '~/components/ui/icon';

export const ImageUploader = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const t = useTranslations('upload');

  const { loading, uploadFile } = useUploader({ onUpload });
  const { handleUploadClick, ref } = useFileUpload();
  const { draggedInside, onDrop, onDragEnter, onDragLeave } = useDropZone({ uploader: uploadFile });

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => (e.target.files ? uploadFile(e.target.files[0]) : null),
    [uploadFile],
  );

  if (loading) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-lg bg-opacity-80 p-8">
        <Spinner className="text-neutral-500" size={1.5} />
      </div>
    );
  }

  const wrapperClass = cn(
    'flex flex-col items-center justify-center px-8 py-10 rounded-lg bg-opacity-80',
    draggedInside && 'bg-neutral-100',
  );

  return (
    <div
      className={wrapperClass}
      onDrop={onDrop}
      onDragOver={onDragEnter}
      onDragLeave={onDragLeave}
      contentEditable={false}
    >
      <Icon name="Image" className="mb-4 size-12 text-black opacity-20 dark:text-white" />
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-center text-sm font-medium text-neutral-400 dark:text-neutral-500">
          { }
          {draggedInside ? t('dropImageTip') : t('dragDropTip')}
        </div>
        <div>
          <Button disabled={draggedInside} onClick={handleUploadClick} variant="primary" buttonSize="small">
            <Icon name="Upload" />
            {t('uploadBtn')}
          </Button>
        </div>
      </div>
      <input
        className="size-0 overflow-hidden opacity-0"
        ref={ref}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.gif"
        onChange={onFileChange}
      />
    </div>
  );
};

export default ImageUploader;
