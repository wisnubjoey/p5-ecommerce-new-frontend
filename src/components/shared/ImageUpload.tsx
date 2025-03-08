// src/components/shared/ImageUpload.tsx
'use client';

import { useState } from 'react';
import { UploadButton } from '@uploadthing/react';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import Image from 'next/image';
import type { OurFileRouter } from "@/app/api/uploadthing/core";

interface ImageUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "productImage" | "productGallery";
}

export const ImageUpload = ({
  onChange,
  value,
  endpoint
}: ImageUploadProps) => {
  const [preview, setPreview] = useState(value);

  const onUploadComplete = (res: { url: string }[]) => {
    const url = res[0].url;
    onChange(url);
    setPreview(url);
    toast.success('Upload berhasil!');
  };

  const onRemove = () => {
    onChange('');
    setPreview('');
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {preview ? (
        <div className="relative">
          <Image
            src={preview}
            alt="Upload"
            width={200}
            height={200}
            className="rounded-lg"
          />
          <button
            onClick={onRemove}
            className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <UploadButton<OurFileRouter, typeof endpoint>
          endpoint={endpoint}
          onClientUploadComplete={onUploadComplete}
          onUploadError={(error: Error) => {
            toast.error(`ERROR! ${error.message}`);
          }}
        />
      )}
    </div>
  );
}