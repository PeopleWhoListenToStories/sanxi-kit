import type { Instance } from 'tippy.js';
import type { MenuProps } from '~/components/Menus/types';

import { BubbleMenu as BaseBubbleMenu } from '@sanxi-kit/react';
import React, { useCallback, useRef } from 'react';

import { sticky } from 'tippy.js';

import { Icon } from '~/components/ui/icon';
import { Toolbar } from '~/components/ui/toolbar';
import { generateNanoId } from '~/helpers/nanoid';
import { getRenderContainer } from '~/helpers/utils';
import { ImageBlockWidth } from './ImageBlockWidth';

export const ImageBlockMenu = ({ editor, appendTo }: MenuProps): JSX.Element => {
  const menuRef = useRef<HTMLDivElement>(null);
  const tippyInstance = useRef<Instance | null>(null);

  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, 'node-imageBlock');
    const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0);

    return rect;
  }, [editor]);

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive('imageBlock');

    return isActive;
  }, [editor]);

  const onAlignImageLeft = useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('left').run();
  }, [editor]);

  const onAlignImageCenter = useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('center').run();
  }, [editor]);

  const onAlignImageRight = useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('right').run();
  }, [editor]);

  const onWidthChange = useCallback(
    (value: number) => {
      editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockWidth(value).run();
    },
    [editor],
  );

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`imageBlockMenu-${generateNanoId()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        getReferenceClientRect,
        onCreate: (instance: Instance) => {
          tippyInstance.current = instance;
        },
        appendTo: () => {
          return appendTo?.current;
        },
        plugins: [sticky],
        sticky: 'popper',
      }}
    >
      <Toolbar.Wrapper shouldShowContent={shouldShow()} ref={menuRef}>
        <Toolbar.Button
          tooltip="Align image left"
          active={editor.isActive('imageBlock', { align: 'left' })}
          onClick={onAlignImageLeft}
        >
          <Icon name="AlignHorizontalDistributeStart" />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip="Align image center"
          active={editor.isActive('imageBlock', { align: 'center' })}
          onClick={onAlignImageCenter}
        >
          <Icon name="AlignHorizontalDistributeCenter" />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip="Align image right"
          active={editor.isActive('imageBlock', { align: 'right' })}
          onClick={onAlignImageRight}
        >
          <Icon name="AlignHorizontalDistributeEnd" />
        </Toolbar.Button>
        <Toolbar.Divider />
        <ImageBlockWidth onChange={onWidthChange} value={Number.parseInt(editor.getAttributes('imageBlock').width)} />
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  );
};

export default ImageBlockMenu;
