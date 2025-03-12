import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define upload untuk gambar produk
    productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
      .middleware(async () => {
        // Bisa tambahkan auth check disini
        return { };
      })
      .onUploadComplete(async ({ file }) => {
        if (!file?.ufsUrl) {
          throw new Error("Upload failed: No file URL received");
        }
        console.log("Upload complete for productImage:", {
          ufsUrl: file.ufsUrl,
          key: file.key
        });
        return { url: file.ufsUrl };
      }),
  
    // Define upload untuk gallery produk
    productGallery: f({ image: { maxFileSize: "8MB", maxFileCount: 5 } })
      .middleware(async () => {
        return { };
      })
      .onUploadComplete(async ({ file }) => {
        if (!file?.ufsUrl) {
          throw new Error("Upload failed: No file URL received");
        }
        console.log("Gallery upload complete:", {
          ufsUrl: file.ufsUrl,
          key: file.key
        });
        return { url: file.ufsUrl };
      })
  } satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
