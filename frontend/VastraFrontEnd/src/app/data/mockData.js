// Mock data for the e-commerce application

/* ---------- Categories ---------- */
export const categories = [
  {
    id: '1',
    name: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    productCount: 45,
  },
  {
    id: '2',
    name: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    productCount: 32,
  },
  {
    id: '3',
    name: 'Jeans',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    productCount: 28,
  },
  {
    id: '4',
    name: 'Jackets',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    productCount: 19,
  },
];

/* ---------- Products ---------- */
export const Product = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    category: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    rating: 4.5,
    reviews: 128,
    description: 'Premium cotton t-shirt with a classic fit. Perfect for everyday wear.',
    fabric: '100% Organic Cotton',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Navy', 'Grey'],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600',
    ],
    stock: 45,
    isNew: false,
    isTrending: true,
  },
  {
    id: '2',
    name: 'Elegant Summer Dress',
    price: 79.99,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    rating: 4.8,
    reviews: 96,
    description: 'Flowing summer dress with beautiful floral patterns.',
    fabric: 'Soft Linen Blend',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Floral Blue', 'Floral Pink', 'Solid Beige'],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
      'https://images.unsplash.com/photo-1585487000143-66b1526d253f?w=600',
    ],
    stock: 23,
    isNew: true,
    isTrending: true,
  },
  {
    id: '3',
    name: 'Slim Fit Denim Jeans',
    price: 89.99,
    originalPrice: 129.99,
    discount: 31,
    category: 'Jeans',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600',
    rating: 4.6,
    reviews: 215,
    description: 'Modern slim fit jeans with premium denim fabric and stretch.',
    fabric: '98% Cotton, 2% Elastane',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Dark Blue', 'Light Blue', 'Black'],
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600',
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600',
    ],
    stock: 67,
    isNew: false,
    isTrending: true,
  },
  {
    id: '4',
    name: 'Leather Bomber Jacket',
    price: 199.99,
    category: 'Jackets',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
    rating: 4.9,
    reviews: 87,
    description: 'Premium leather bomber jacket with classic design.',
    fabric: 'Genuine Leather',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Brown', 'Tan'],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
      'https://images.unsplash.com/photo-1520975867597-0af37a22e31e?w=600',
    ],
    stock: 12,
    isNew: true,
    isTrending: false,
  },
  {
    id: '5',
    name: 'Striped Polo Shirt',
    price: 45.99,
    category: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600',
    rating: 4.3,
    reviews: 64,
    description: 'Classic polo shirt with elegant stripes.',
    fabric: 'Cotton Pique',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy/White', 'Black/Grey', 'Green/White'],
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600',
    ],
    stock: 34,
    isNew: false,
    isTrending: false,
  },
  {
    id: '6',
    name: 'Casual Midi Dress',
    price: 69.99,
    originalPrice: 99.99,
    discount: 30,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1585487000143-66b1526d253f?w=600',
    rating: 4.7,
    reviews: 112,
    description: 'Versatile midi dress perfect for any occasion.',
    fabric: 'Viscose Blend',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Emerald', 'Burgundy'],
    images: [
      'https://images.unsplash.com/photo-1585487000143-66b1526d253f?w=600',
    ],
    stock: 28,
    isNew: false,
    isTrending: true,
  },
];

/* ---------- Orders ---------- */
export const orders = [
  {
    id: 'ORD-001',
    userId: 'user-1',
    items: [
      {
        productId: '1',
        productName: 'Classic White T-Shirt',
        quantity: 2,
        price: 29.99,
        size: 'M',
        color: 'White',
      },
    ],
    total: 59.98,
    status: 'Delivered',
    date: '2024-12-15',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'New York',
      zipCode: '10001',
      country: 'USA',
    },
  },
  {
    id: 'ORD-002',
    userId: 'user-1',
    items: [
      {
        productId: '2',
        productName: 'Elegant Summer Dress',
        quantity: 1,
        price: 79.99,
        size: 'M',
        color: 'Floral Blue',
      },
    ],
    total: 79.99,
    status: 'Shipped',
    date: '2024-12-20',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'New York',
      zipCode: '10001',
      country: 'USA',
    },
  },
];

/* ---------- Admin Stats ---------- */
export const adminStats = {
  totalUsers: 1245,
  totalOrders: 3789,
  totalRevenue: 156789,
  totalProducts: 234,
  salesData: [
    { month: 'Jan', sales: 12000, orders: 230 },
    { month: 'Feb', sales: 15000, orders: 280 },
    { month: 'Mar', sales: 18000, orders: 320 },
    { month: 'Apr', sales: 22000, orders: 380 },
    { month: 'May', sales: 28000, orders: 450 },
    { month: 'Jun', sales: 24000, orders: 410 },
  ],
};


// src/data/mockData.js

