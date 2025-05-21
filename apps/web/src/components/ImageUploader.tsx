'use client';

import * as React from 'react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative flex items-center gap-2">
      {selectedImage ? (
        <div className="relative h-8 w-8 overflow-hidden rounded-md">
          <img
            src={selectedImage}
            alt="Uploaded"
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleButtonClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
            <line x1="16" x2="22" y1="5" y2="5" />
            <line x1="19" x2="19" y1="2" y2="8" />
          </svg>
        </Button>
      )}
      <Input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
        ref={fileInputRef}
      />
    </div>
  );
}