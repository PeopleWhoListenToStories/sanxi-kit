import { useEffect } from 'react';

import { createGlobalHook } from '~/hooks/createGlobalHook';
import { useToggle } from '~/hooks/useToggle';

const PC_MOBILE_CRITICAL_WIDTH = 765;

const useOnMobile = (defaultIsMobile) => {
  const [isMobile, toggleIsMobile] = useToggle(defaultIsMobile);

  useEffect(() => {
    function handleResize() {
      toggleIsMobile(window.innerWidth <= PC_MOBILE_CRITICAL_WIDTH);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [toggleIsMobile]);

  return {
    isMobile,
    toggleIsMobile,
  };
};

export const IsOnMobile = createGlobalHook<{ isMobile?: boolean; toggle: () => void }, boolean>(useOnMobile);
