export interface ProductData {
    _id?: string;
    currentSlug: string;
    name: string;
    price: number;
    description: string;
    dimensions: {
      height: string;
      width: string;
      depth: string;
    };
    image: {
      asset: {
        _id: string;
        url: string;
      };
    };
    features: string[];
  }
  