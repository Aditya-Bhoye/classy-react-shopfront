
export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export type OrderType = {
  id: string;
  items: {
    product: ProductType;
    quantity: number;
  }[];
  total: number;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
};
