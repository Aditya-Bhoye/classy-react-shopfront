
import { ProductType, OrderType } from '../types/types';

// Sample Products
export const sampleProducts: ProductType[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation and long battery life.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smart watch featuring heart rate monitoring and GPS.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Ultra HD 4K Smart TV',
    description: 'Experience stunning visuals with this 55-inch 4K smart TV with built-in streaming apps.',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    category: 'Electronics'
  },
  {
    id: '4',
    name: 'Premium Leather Wallet',
    description: 'Handcrafted genuine leather wallet with multiple card slots and RFID protection.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1627123409790-a3c50c5bd7ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    category: 'Accessories'
  },
  {
    id: '5',
    name: 'Stainless Steel Water Bottle',
    description: 'Eco-friendly double-walled insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    category: 'Home'
  },
  {
    id: '6',
    name: 'Organic Cotton T-shirt',
    description: 'Comfortable and sustainable t-shirt made from 100% organic cotton.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    category: 'Clothing'
  },
  {
    id: '7',
    name: 'Noise-Cancelling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    category: 'Electronics'
  },
  {
    id: '8',
    name: 'Professional Chef Knife',
    description: 'High-carbon stainless steel chef knife for precise and effortless cutting.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    category: 'Kitchen'
  },
  {
    id: '9',
    name: 'Handcrafted Ceramic Mug',
    description: 'Unique artisan-made ceramic mug, perfect for your morning coffee or tea.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    category: 'Home'
  },
  {
    id: '10',
    name: 'Yoga Mat',
    description: 'Non-slip eco-friendly yoga mat with perfect cushioning for comfort and stability.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    category: 'Fitness'
  },
  {
    id: '11',
    name: 'Digital Camera',
    description: 'Professional-grade digital camera with 24.2MP sensor and 4K video recording.',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    category: 'Electronics'
  },
  {
    id: '12',
    name: 'Leather Backpack',
    description: 'Stylish and durable leather backpack with multiple compartments for everyday use.',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    category: 'Accessories'
  }
];

// Sample Orders
export const sampleOrders: OrderType[] = [
  {
    id: 'ORD-2023-001',
    items: [
      {
        product: sampleProducts[0],
        quantity: 1
      },
      {
        product: sampleProducts[3],
        quantity: 2
      }
    ],
    total: 229.97,
    date: '2023-03-15T10:30:00Z',
    status: 'Delivered'
  },
  {
    id: 'ORD-2023-002',
    items: [
      {
        product: sampleProducts[6],
        quantity: 1
      }
    ],
    total: 249.99,
    date: '2023-04-22T14:45:00Z',
    status: 'Shipped'
  },
  {
    id: 'ORD-2023-003',
    items: [
      {
        product: sampleProducts[4],
        quantity: 1
      },
      {
        product: sampleProducts[8],
        quantity: 2
      },
      {
        product: sampleProducts[9],
        quantity: 1
      }
    ],
    total: 124.96,
    date: '2023-05-10T09:15:00Z',
    status: 'Processing'
  }
];
