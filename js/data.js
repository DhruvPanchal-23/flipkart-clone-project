// Product Database
const products = [
  // Electronics - Laptops
  {
    id: 1,
    name: "ASUS Vivobook S16",
    category: "laptops",
    price: 79999,
    rating: 4.4,
    image: "assets/images/laptop.jpg"
  },
  
  // Electronics - Mobiles
  {
    id: 2,
    name: "iPhone 16 Pro",
    category: "mobiles",
    price: 159999,
    rating: 4.8,
    image: "assets/images/iphone5.jpeg"
  },
  {
    id: 4,
    name: "iPad Pro 11th Gen",
    category: "mobiles",
    price: 33490,
    rating: 4.6,
    image: "assets/images/ipad.webp"
  },

  // TV & Appliances
  {
    id: 3,
    name: "LG UA82 Series 4K Ultra HD Smart TV",
    category: "tv",
    price: 38490,
    rating: 4.7,
    image: "assets/images/tv4.jpeg"
  },
  {
    id: 13,
    name: "LG 7 Kg 5 Star Inverter Fully Automatic Top Load",
    category: "tv",
    price: 26990,
    rating: 4.8,
    image: "assets/images/washmc.webp"
  },
  {
    id: 14,
    name: "Samsung 7 kg, 5 Star, Fully-Automatic Top Load",
    category: "tv",
    price: 27900,
    rating: 4.0,
    image: "assets/images/washmc2.webp"
  },
  {
    id: 15,
    name: "LG 1.5 Ton 5 Star AI Dual Inverter Split AC",
    category: "tv",
    price: 49999,
    rating: 4.6,
    image: "assets/images/ac.jpg"
  },
  {
    id: 16,
    name: "Voltas 1.5 Ton 3 Star Split AC",
    category: "tv",
    price: 59999,
    rating: 4.2,
    image: "assets/images/ac2.webp"
  },

  // Sports
  {
    id: 5,
    name: "Lifelong PVC Hex Dumbbells",
    category: "sports",
    price: 259,
    rating: 4.2,
    image: "assets/images/dumbbell.jpeg"
  },
  {
    id: 6,
    name: "Vinex Home Gym Machine Ecos Pack",
    category: "sports",
    price: 25999,
    rating: 4.6,
    image: "assets/images/gymmc.jpeg"
  },
  {
    id: 7,
    name: "Kookaburra Turf Cricket Ball",
    category: "sports",
    price: 923,
    rating: 4.5,
    image: "assets/images/redball.jpg"
  },
  {
    id: 8,
    name: "Adidas Starlancer Club Football",
    category: "sports",
    price: 1299,
    rating: 4.6,
    image: "assets/images/football.avif"
  },

  // Fashion
  {
    id: 9,
    name: "Highlander Men's Solid Denim Jacket",
    category: "fashion",
    price: 1231,
    rating: 4.2,
    image: "assets/images/cloth1.jpeg"
  },
  {
    id: 10,
    name: "Allen Solly Women's Formal Dress",
    category: "fashion",
    price: 2622,
    rating: 4.6,
    image: "assets/images/cloth2.jpeg"
  },
  {
    id: 11,
    name: "WTFlex Solid Cream Overshirt Jacket",
    category: "fashion",
    price: 1899,
    rating: 4.7,
    image: "assets/images/cloth3.jpeg"
  },
  {
    id: 12,
    name: "Sangria Floral Dress",
    category: "fashion",
    price: 865,
    rating: 4.6,
    image: "assets/images/cloth4.jpeg"
  },
  {
    id: 31,
    name: "Nike Women Lace Up Running Shoes",
    category: "fashion",
    price: 4695,
    rating: 4.4,
    image: "assets/images/shoes.webp"
  },
  {
    id: 32,
    name: "Adidas Men's Clinch-X M Running Shoes",
    category: "fashion",
    price: 4000,
    rating: 4.4,
    image: "assets/images/shoes2.jpg"
  },

  // Home & Furniture
  {
    id: 17,
    name: "Decorative Ceramic Plante",
    category: "home",
    price: 699,
    rating: 4.4,
    image: "assets/images/pott.webp"
  },
  {
    id: 18,
    name: "Home Centre Mimosa Storage Glass Jars Set of 6",
    category: "home",
    price: 446,
    rating: 4.2,
    image: "assets/images/jar6.jpg"
  },
  {
    id: 19,
    name: "Wooden Sheesham Coffee Table",
    category: "home",
    price: 5895,
    rating: 4.4,
    image: "assets/images/table.webp"
  },
  {
    id: 20,
    name: "Sofa Yolo Ottoman (Fabric, Avocado Green)",
    category: "home",
    price: 5320,
    rating: 4.5,
    image: "assets/images/sofa.jpg"
  },

  // Beauty
  {
    id: 21,
    name: "Lakmé Absolute Skin Natural Mousse Foundation",
    category: "beauty",
    price: 1585,
    rating: 4.3,
    image: "assets/images/makeup8.webp"
  },
  {
    id: 22,
    name: "Maybelline New York Fit Me Matte + Poreless Foundation",
    category: "beauty",
    price: 799,
    rating: 4.2,
    image: "assets/images/makeup9.jpg"
  },
  {
    id: 23,
    name: "Colorbar Perfect Match Lipstick",
    category: "beauty",
    price: 599,
    rating: 4.4,
    image: "assets/images/lipstick.webp"
  },
  {
    id: 24,
    name: "Biotique Morning Nectar Moisturize & Nourish Face Wash",
    category: "beauty",
    price: 143,
    rating: 4.5,
    image: "assets/images/wash.jpg"
  },

  // Grocery
  {
    id: 25,
    name: "Tata Salt Iodised Salt 1kg",
    category: "grocery",
    price: 22,
    rating: 4.4,
    image: "assets/images/salit.webp"
  },
  {
    id: 26,
    name: "Aashirvaad Whole Wheat Atta 5kg",
    category: "grocery",
    price: 344,
    rating: 4.5,
    image: "assets/images/wheat.webp"
  },
  {
    id: 27,
    name: "Bhujialalji Bikaneri Bhujia 1kg",
    category: "grocery",
    price: 209,
    rating: 4.6,
    image: "assets/images/food.webp"
  },
  {
    id: 28,
    name: "Amul Gold Full Cream Milk Powder 500g",
    category: "grocery",
    price: 220,
    rating: 4.0,
    image: "assets/images/milk.webp"
  },

  // Accessories
  {
    id: 33,
    name: "Casio Mens MTP-V001L-1BUDF Wristwatch",
    category: "fashion",
    price: 1095,
    rating: 4.6,
    image: "assets/images/watch.jpg"
  },
  {
    id: 34,
    name: "G-Shock GA-2100 Series Watch",
    category: "fashion",
    price: 20000,
    rating: 4.5,
    image: "assets/images/watch2.jpg"
  }
];
