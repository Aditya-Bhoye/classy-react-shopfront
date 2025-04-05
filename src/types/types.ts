
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

export type AddressType = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type UserProfileType = {
  name: string;
  email: string;
  profileImage?: string;
  addresses: {
    billing: AddressType;
    shipping: AddressType;
  };
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  profileImage?: string;
};
