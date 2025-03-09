export interface Product {
    id: number;
    category_id: number;
    name: string;
    description: string;
    main_photo_url: string;
    instagram_link?: string;
    created_at: string;
    updated_at: string;
    category: {
      id: number;
      name: string;
    };
    galleries: ProductGallery[];
  }

  export interface ProductGallery {
    id: number;
    product_id: number;
    photo_url: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface CreateProductDTO {
    category_id: number;
    name: string;
    description: string;
    main_photo_url: string;
    instagram_link?: string;
    gallery_photos?: string[];
  }