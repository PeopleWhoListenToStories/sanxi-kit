import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

import { getStorage, setStorage } from '~/helpers/storage';

export enum Width {
  standardWidth = 'standardWidth',
  fullWidth = 'fullWidth',
}

const WIDTH_KEY = 'document-style-width';
const FONT_SIZE_KEY = 'document-style-font-size';
const DEFAULT_WIDTH = Width.standardWidth;
const DEFAULT_FONT_SIZE = 16;

export const useDocumentStyle = () => {
  const { data, refetch } = useQuery({
    queryKey: [`/fe/mock/${WIDTH_KEY}/${FONT_SIZE_KEY}`],
    queryFn: () => {
      if (typeof window !== 'undefined') {
        return {
          width: getStorage(WIDTH_KEY) || DEFAULT_WIDTH,
          fontSize: Number.parseInt(getStorage(FONT_SIZE_KEY), 10) || DEFAULT_FONT_SIZE,
        };
      }
    },
  });

  const setWidth = useCallback(
    (width: Width) => {
      setStorage(WIDTH_KEY, width);
      refetch();
    },
    [refetch],
  );

  const setFontSize = useCallback(
    (fontSize: number) => {
      setStorage(FONT_SIZE_KEY, fontSize);
      refetch();
    },
    [refetch],
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    width: (data && data.width) || DEFAULT_WIDTH,
    fontSize: (data && data.fontSize) || DEFAULT_FONT_SIZE,
    setWidth,
    setFontSize,
  };
};
