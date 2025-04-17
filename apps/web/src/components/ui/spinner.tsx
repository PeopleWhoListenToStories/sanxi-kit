import React from 'react';
import { cn } from '~/helpers/utils';

type SpinnerProps = {
  text?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({ text = 'Loading...' }) => {
  return (
    <div className={cn('fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50')}>
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 size-12 animate-spin rounded-full border-4 border-gray-200 border-t-white"></div>
        <span className="text-lg text-white">{text}</span>
      </div>
    </div>
  );
};
