import { createGlobalHook } from '~/hooks/createGlobalHook';
import { useToggle } from '~/hooks/useToggle';

const useDocumentVersion = (defaultVisible: boolean) => {
  const [visible, toggleVisible] = useToggle(defaultVisible);

  return {
    visible,
    toggleVisible,
  };
};

export const DocumentVersionControl = createGlobalHook<
  { visible?: boolean; toggleVisible: (arg?: any) => void },
  boolean
>(useDocumentVersion);
