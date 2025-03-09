// src/components/shared/ImageUpload.tsx
'use client';

import { useState } from 'react';
import { UploadButton } from '@uploadthing/react';
import { toast } from 'sonner';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
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
            className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="w-full max-w-[200px] aspect-square">
          <UploadButton<OurFileRouter, typeof endpoint>
            endpoint={endpoint}
            onClientUploadComplete={onUploadComplete}
            onUploadError={(error: Error) => {
              toast.error(`ERROR! ${error.message}`);
            }}
            appearance={{
              button: "w-full h-full bg-muted hover:bg-muted/80 rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition flex flex-col items-center justify-center gap-2",
              allowedContent: "hidden"
            }}
            content={{
              button({ ready }) {
                if (ready) {
                  return (
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-2 bg-background rounded-lg">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium text-black">Pilih File</span>
                        <span className="text-xs text-muted-foreground">
                          {endpoint === "productImage" ? "Maks. 8MB" : "Maks. 8MB"}
                        </span>
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Loading...</span>
                  </div>
                );
              }
            }}
          />
        </div>
      )}
    </div>
  );
}