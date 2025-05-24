
import { Product } from '../components/ProductCard';

export const initialProducts: Product[] = [
  // Fruits & Vegetables
  {
    id: '1',
    name: 'Fresh Tomatoes',
    price: 40,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
    category: 'fruits-vegetables'
  },
  {
    id: '2',
    name: 'Fresh Onions',
    price: 30,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400',
    category: 'fruits-vegetables'
  },
  {
    id: '3',
    name: 'Green Bananas',
    price: 60,
    unit: 'dozen',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
    category: 'fruits-vegetables'
  },
  {
    id: '4',
    name: 'Fresh Potatoes',
    price: 25,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
    category: 'fruits-vegetables'
  },
  {
    id: '5',
    name: 'Fresh Carrots',
    price: 50,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
    category: 'fruits-vegetables'
  },
  {
    id: '6',
    name: 'Green Capsicum',
    price: 80,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1525607551316-4a8e16d1f9a1?w=400',
    category: 'fruits-vegetables'
  },

  // Dairy, Bread & Eggs
  {
    id: '7',
    name: 'Fresh Milk',
    price: 60,
    unit: 'litre',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
    category: 'dairy-bread-eggs'
  },
  {
    id: '8',
    name: 'White Bread',
    price: 25,
    unit: 'pack',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    category: 'dairy-bread-eggs'
  },
  {
    id: '9',
    name: 'Farm Fresh Eggs',
    price: 120,
    unit: 'dozen',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400',
    category: 'dairy-bread-eggs'
  },
  {
    id: '10',
    name: 'Paneer',
    price: 200,
    unit: '250g',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',
    category: 'dairy-bread-eggs'
  },
  {
    id: '11',
    name: 'Butter',
    price: 50,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400',
    category: 'dairy-bread-eggs'
  },
  {
    id: '12',
    name: 'Curd',
    price: 40,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1571212515416-6c40f98bb2b2?w=400',
    category: 'dairy-bread-eggs'
  },

  // Munchies & Namkeen
  {
    id: '13',
    name: 'Mixture Namkeen',
    price: 80,
    unit: '200g',
    image: 'https://images.unsplash.com/photo-1606907600587-4dfaa5d2c4c8?w=400',
    category: 'munchies-namkeen'
  },
  {
    id: '14',
    name: 'Bhujia',
    price: 60,
    unit: '150g',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400',
    category: 'munchies-namkeen'
  },
  {
    id: '15',
    name: 'Roasted Peanuts',
    price: 100,
    unit: '250g',
    image: 'https://images.unsplash.com/photo-1568471173955-25b729f8bd32?w=400',
    category: 'munchies-namkeen'
  },
  {
    id: '16',
    name: 'Chana Masala',
    price: 70,
    unit: '200g',
    image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400',
    category: 'munchies-namkeen'
  },

  // Cold Drinks & Juices
  {
    id: '17',
    name: 'Mango Juice',
    price: 40,
    unit: '200ml',
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400',
    category: 'cold-drinks-juices'
  },
  {
    id: '18',
    name: 'Fresh Lime Water',
    price: 20,
    unit: '250ml',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400',
    category: 'cold-drinks-juices'
  },
  {
    id: '19',
    name: 'Buttermilk',
    price: 25,
    unit: '200ml',
    image: 'https://images.unsplash.com/photo-1634141510639-d691d86f47be?w=400',
    category: 'cold-drinks-juices'
  },
  {
    id: '20',
    name: 'Coconut Water',
    price: 35,
    unit: '250ml',
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400',
    category: 'cold-drinks-juices'
  },

  // Atta, Rice, Oil & Dal
  {
    id: '21',
    name: 'Wheat Flour (Atta)',
    price: 320,
    unit: '10kg',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    category: 'atta-rice-oil-dal'
  },
  {
    id: '22',
    name: 'Basmati Rice',
    price: 150,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    category: 'atta-rice-oil-dal'
  },
  {
    id: '23',
    name: 'Cooking Oil',
    price: 180,
    unit: 'litre',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    category: 'atta-rice-oil-dal'
  },
  {
    id: '24',
    name: 'Toor Dal',
    price: 120,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400',
    category: 'atta-rice-oil-dal'
  },
  {
    id: '25',
    name: 'Moong Dal',
    price: 140,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400',
    category: 'atta-rice-oil-dal'
  },
  {
    id: '26',
    name: 'Chana Dal',
    price: 100,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400',
    category: 'atta-rice-oil-dal'
  }
];

export const categories = [
  {
    id: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    icon: '🥬',
    description: 'Fresh from farm'
  },
  {
    id: 'dairy-bread-eggs',
    name: 'Dairy, Bread & Eggs',
    icon: '🥛',
    description: 'Daily essentials'
  },
  {
    id: 'munchies-namkeen',
    name: 'Munchies & Namkeen',
    icon: '🍿',
    description: 'Snacks & treats'
  },
  {
    id: 'cold-drinks-juices',
    name: 'Cold Drinks & Juices',
    icon: '🧃',
    description: 'Refreshing drinks'
  },
  {
    id: 'atta-rice-oil-dal',
    name: 'Atta, Rice, Oil & Dal',
    icon: '🌾',
    description: 'Kitchen staples'
  }
];
