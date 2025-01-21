export interface ProductData {
    category?:string;
    _id?: string;
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
  