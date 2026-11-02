import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import Cart from '../models/Cart.js';

export const seedDatabaseIfEmpty = async () => {
  try {
    const productCount = await Product.countDocuments();
    // Re-seed if empty or if products are in dollars (< 1000)
    const sampleProd = await Product.findOne();
    if (productCount > 0 && sampleProd && sampleProd.price >= 500) {
      console.log(`[Seed] Database already populated with ${productCount} products in INR. Skipping auto-seed.`);
      return;
    }
    console.log('[Seed] Seeding initial accounts, 24 products in INR (Rupees), orders, and reviews...');
    await runSeed();
  } catch (error) {
    console.error('[Seed Error]', error);
  }
};

export const runSeed = async () => {
  try {
    // Clear collections
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Review.deleteMany({});
    await Cart.deleteMany({});

    // 1. Create Users
    const adminUser = await User.create({
      name: 'Admin Director',
      email: 'admin@shopease.com',
      password: 'admin123',
      role: 'admin',
      phone: '+91 98765 43210',
      address: {
        street: '742 Brigade Road, 4th Floor',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560001',
        country: 'India',
      },
    });

    const customer1 = await User.create({
      name: 'Alex Rivera',
      email: 'alex@example.com',
      password: 'customer123',
      role: 'customer',
      phone: '+91 91234 56789',
      address: {
        street: '120 Nariman Point, Suite 400',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400021',
        country: 'India',
      },
    });

    const customer2 = await User.create({
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      password: 'customer123',
      role: 'customer',
      phone: '+91 98111 22334',
      address: {
        street: '456 Connaught Place, Block B',
        city: 'New Delhi',
        state: 'Delhi',
        postalCode: '110001',
        country: 'India',
      },
    });

    // 2. Create Products (24 total across 6 categories in INR)
    const rawProducts = [
      // ELECTRONICS (From Design Reference)
      {
        title: 'Momentum 4 Wireless ANC Headphones',
        brand: 'Sennheiser',
        sku: 'SEN-MOM4-BLK',
        category: 'Electronics',
        subCategory: 'Audio & Sound',
        description: 'Engineered acoustic clarity, studio-grade active noise cancellation with 60-hour battery life, customizable EQ, and high-fidelity wireless performance.',
        price: 24999,
        originalPrice: 29999,
        images: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDv4V9RAs7x6kgi9ts8F7sTHM_w5-vs7iQjzBQTruonwA-Xhmjf1sHwnnFoYH0gHwy8BRDJ7mZFez8II_qdv3Jf1Lu50QdbyFQXypIwF-nMVIJwxuPxw2r25PvNEG-6HEhxALCfIgBoDo6WOv2eCQJYhVo40Rb9hBuwdCC1OEwcZ4LiaVgsYKEuZAQ6GP341eqSR56WrFcoAOGB1wIdnzT3e_Y2fdbrQ7s7UL9Qg_8',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDs3QRNyLA057MT63FXflvWORKbV4ceMRr_CKTEYCmmt2O4-xoLnXIWsqAmn-1tXLKDABfzOzXtTEdafNa-WPpDARq-kJcYzVyi8c-Vk3nv_1uSxuZy63auDRoo5GdgH-HG9CQs2pzUydc1Tq7G8pZ-O1DH3_8ICDxmYPrtuqqpDYtYPHNf7xaopfZDH99fhN548rTlqFCK9iuHrXmlxWXr60NbVYIKoU_0OYaOwOQ',
        ],
        stockCount: 18,
        rating: 4.8,
        numReviews: 940,
        features: ['Active Noise Cancellation', 'Bluetooth 5.3', 'Multipoint Pairing', '60-hour Battery', 'Fast USB-C Charging'],
        isFeatured: true,
        isBestSeller: true,
        isHotDeal: false,
      },
      {
        title: 'WH-1000XM5 Wireless Noise-Canceling',
        brand: 'Sony',
        sku: 'SNY-XM5-SLV',
        category: 'Electronics',
        subCategory: 'Audio & Sound',
        description: 'Industry-leading noise cancellation optimized with two processors and 8 microphones. Exceptional sound quality with integrated V1 processor.',
        price: 29990,
        originalPrice: 34990,
        images: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBooue7-eXAvSs7gnDdF96TioJ6vsLil1HZWTcolEyqomid9eVfl0XwxUin_eXFSHDYpWu5Re6RROC-Fq9tgGkJBFl7HvZuB9FYoiBRnKNmPqmuXAKcfiFUl_AWzZ7HBg79lnuX-yKwdnmRx7bKyAD5uZmyZDxwujwXtfxA1ySW-bgGjkMEzuZ30v6uPWK10V4FBTY0mL_LHuAFN_oLOxYasQPfl3oROSJWM-15A4M',
        ],
        stockCount: 14,
        rating: 4.9,
        numReviews: 1250,
        features: ['Auto NC Optimizer', 'Crystal Clear Hands-Free Calling', 'Multipoint Connection', '30-hour Battery Life'],
        isFeatured: true,
        isBestSeller: true,
        isHotDeal: true,
      },
      {
        title: 'Aura Pro Wireless ANC Studio Edition',
        brand: 'Aura Soundworks',
        sku: 'AUR-PR-902',
        category: 'Electronics',
        subCategory: 'Headphones',
        description: 'Flagship studio headphones with titanium acoustic drivers, spatial audio tracking, memory foam ear cups, and executive ballistic travel case.',
        price: 26999,
        originalPrice: 32999,
        images: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuB_1hFsLpd7q5Czy2r3Gp52IBdQ1LnWo5-33neOf5_G3bwe-SFW3B_spiAUI7Qm-ZdN6K4pXJN8GElG1F62PrIbvZEFoOZIP0LxmUf2AV_ajNJQqjyxStnopSa5bfVZBmrKSfcb4h-IaFdwgpUm4EQgHmeg5T1RVCHdqupAt1lGjh7OZDHFBwT3aLCHeFfZ1FzOwZNb2qO_1sJrD3Iddo4O2yrj_VzmcxfGRsRAVoM',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDniU6gRlxu6vpxDwmL2Pb68plOYvPW8H-HoqLBHgFrgtyOZ5wejdUQSDG3WkqP10eiib60TuuRwtOMhpm_ue4SSVaVXkPFIKPhdbck_IgiWQo81ZS0KmZ0rOu4ljSy1trCW-mtiSYx34Joa33JXhO5a_-dQHBUKKKESIcvQBB0qnyo94h29_kBwqnrPOaUuDMjcWeNtq049FjFxfdoTsx2U1vWZszSvtAe7p4qbVk',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDzZc6ENxhyi4VTv6edZxB1qsNzODSfi3-FpE1tJu68YoTmlGSrBWhcn687ozzTxY0-uwed2pDOWqiEYolue58Om9H_6GwAUxUhIdgAILaWcozjgoV21-e7uj4scHkTEtKt0n_KQELNWkoHc3eZS_87cWrpBxWkRDx1jsVQfv-SdFmAGMYA13mzp60SBu-m-O8K_tMw4f6whw5pBwTbfzgGtjk7T2inIb7DK3r2ky4',
        ],
        stockCount: 9,
        rating: 4.9,
        numReviews: 320,
        features: ['Spatial Audio v3', 'Bespoke Titanium Chassis', 'Ultra-Low Latency Wireless', 'Micro-perforated Cushions'],
        isFeatured: true,
        isBestSeller: true,
        isHotDeal: false,
      },
      {
        title: 'Master Series MX Mechanical Wireless Keyboard',
        brand: 'Logitech',
        sku: 'LOG-MX-MECH',
        category: 'Electronics',
        subCategory: 'Computing & Office',
        description: 'Low-profile mechanical switches, fluid and quiet typing experience with tactile bumps, smart backlighting, and multi-device Bluetooth pairing.',
        price: 13995,
        originalPrice: 15995,
        images: [
          'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 22,
        rating: 4.7,
        numReviews: 410,
        features: ['Tactile Quiet Switches', 'Smart Illumination', 'Connect up to 3 Devices', 'USB-C Rechargeable'],
        isFeatured: true,
        isBestSeller: false,
        isHotDeal: false,
      },

      // FASHION
      {
        title: 'Merino Wool Minimalist Crewneck Knitwear',
        brand: 'Nordic Studio',
        sku: 'FSH-MER-001',
        category: 'Fashion',
        subCategory: 'Apparel',
        description: '100% extrafine Australian Merino wool. Breathable, thermal-regulating, and tailored with an architectural silhouette for versatile layering.',
        price: 2499,
        originalPrice: 3299,
        images: [
          'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 25,
        rating: 4.8,
        numReviews: 184,
        features: ['100% Extrafine Merino Wool', 'Natural Odor Resistance', 'Pre-shrunk Garment Wash'],
        isFeatured: true,
        isBestSeller: false,
        isHotDeal: true,
      },
      {
        title: 'Water-Repellent Commuter Tech Trench Coat',
        brand: 'Aethel Wear',
        sku: 'FSH-TRN-002',
        category: 'Fashion',
        subCategory: 'Outerwear',
        description: 'Engineered waterproof shell with seam-sealed construction, magnetic storm flap, hidden laptop pocket, and clean minimalist lines.',
        price: 6999,
        originalPrice: 8999,
        images: [
          'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 8,
        rating: 4.9,
        numReviews: 92,
        features: ['3-Layer Waterproof Fabric', 'Magnetic Storm Closure', 'Concealed Tech Pockets'],
        isFeatured: false,
        isBestSeller: false,
        isHotDeal: false,
      },
      {
        title: 'Full-Grain Italian Leather Minimalist Sneaker',
        brand: 'Veloce Footwear',
        sku: 'FSH-SNK-003',
        category: 'Fashion',
        subCategory: 'Footwear',
        description: 'Handcrafted in Tuscany from supple calfskin leather. Features Margom rubber outsoles and moisture-wicking calf leather insoles.',
        price: 4999,
        originalPrice: 6499,
        images: [
          'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 15,
        rating: 4.7,
        numReviews: 210,
        features: ['Full-Grain Calfskin', 'Italian Margom Soles', 'Waxed Cotton Laces'],
        isFeatured: true,
        isBestSeller: true,
        isHotDeal: false,
      },
      {
        title: 'Structured Canvas Everyday Crossbody Bag',
        brand: 'Mono Studio',
        sku: 'FSH-BAG-004',
        category: 'Fashion',
        subCategory: 'Accessories',
        description: 'Durable 18oz waterproof cotton duck canvas with matte anodized aluminum hardware, internal organizer divider, and quick-release buckle.',
        price: 1899,
        originalPrice: 2499,
        images: [
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 30,
        rating: 4.6,
        numReviews: 135,
        features: ['18oz Duck Canvas', 'Anodized Buckles', 'Padded Tablet Compartment'],
        isFeatured: false,
        isBestSeller: false,
        isHotDeal: false,
      },

      // HOME & KITCHEN
      {
        title: 'Precision Temperature Electric Gooseneck Kettle',
        brand: 'Kroma Living',
        sku: 'HM-KTL-001',
        category: 'Home & Kitchen',
        subCategory: 'Brewing Gear',
        description: 'Matte black stainless steel pour-over kettle with real-time OLED temperature readout, hold function, and ergonomic balance grip.',
        price: 3499,
        originalPrice: 4299,
        images: [
          'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 16,
        rating: 4.8,
        numReviews: 310,
        features: ['Variable Temp Control', '1200W Rapid Heating', '60-Minute Temp Hold'],
        isFeatured: true,
        isBestSeller: true,
        isHotDeal: false,
      },
      {
        title: 'Culinary Japanese Damascus Steel Chef Knife 8"',
        brand: 'Seiki Forge',
        sku: 'HM-KNF-002',
        category: 'Home & Kitchen',
        subCategory: 'Cutlery',
        description: 'Forged 67-layer VG-10 Damascus steel with a hand-polished Pakkawood octagonal handle. Razor-sharp 15-degree double bevel blade.',
        price: 2999,
        originalPrice: 3999,
        images: [
          'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 12,
        rating: 4.9,
        numReviews: 180,
        features: ['67-Layer VG-10 Steel', 'HRC 60±2 Hardness', 'Ergonomic Pakkawood Grip'],
        isFeatured: false,
        isBestSeller: false,
        isHotDeal: true,
      },
      {
        title: 'Minimalist Ceramic Matte Stoneware Dinner Set (16pc)',
        brand: 'Form & Clay',
        sku: 'HM-PLT-003',
        category: 'Home & Kitchen',
        subCategory: 'Tableware',
        description: 'Artisan hand-glazed stoneware service for four. Scratch-resistant matte mineral glaze, dishwasher safe, and microwave friendly.',
        price: 3899,
        originalPrice: 4999,
        images: [
          'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 10,
        rating: 4.7,
        numReviews: 95,
        features: ['Lead-Free Ceramic', 'Oven & Dishwasher Safe', 'Matte Chalk Finish'],
        isFeatured: true,
        isBestSeller: false,
        isHotDeal: false,
      },
      {
        title: 'Architectural Sculptural Ambient LED Table Lamp',
        brand: 'Lumen Lux',
        sku: 'HM-LMP-004',
        category: 'Home & Kitchen',
        subCategory: 'Lighting',
        description: 'Solid aluminum anodized base with frosted glass orb. Continuous touch-capacitive dimming from warm amber nightlight to 500 lumens.',
        price: 2199,
        originalPrice: 2799,
        images: [
          'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 19,
        rating: 4.8,
        numReviews: 142,
        features: ['Touch Dimmer Control', 'Warm 2700K Glow', 'Heavyweight Solid Base'],
        isFeatured: false,
        isBestSeller: false,
        isHotDeal: false,
      },

      // BOOKS
      {
        title: 'Designing Data-Intensive Applications',
        brand: "O'Reilly Media",
        sku: 'BK-DDIA-001',
        category: 'Books',
        subCategory: 'Computer Science',
        description: 'The definitive guide to the architecture, scalability, reliability, and maintainability of modern data systems by Martin Kleppmann.',
        price: 1899,
        originalPrice: 2299,
        images: [
          'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 35,
        rating: 4.9,
        numReviews: 870,
        features: ['Comprehensive Distributed Systems Guide', 'Hardcover 616 Pages', 'Authoritative Reference'],
        isFeatured: true,
        isBestSeller: true,
        isHotDeal: false,
      },
      {
        title: 'Clean Architecture: A Craftsman\'s Guide',
        brand: 'Prentice Hall',
        sku: 'BK-CLNA-002',
        category: 'Books',
        subCategory: 'Software Engineering',
        description: 'Robert C. Martin ("Uncle Bob") presents the universal rules of software structure and architecture to boost productivity across systems.',
        price: 999,
        originalPrice: 1299,
        images: [
          'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 28,
        rating: 4.7,
        numReviews: 450,
        features: ['SOLID Principles In-Depth', 'Practical Case Studies', '350 Pages'],
        isFeatured: false,
        isBestSeller: false,
        isHotDeal: false,
      },
      {
        title: 'The Design of Everyday Things (Revised Edition)',
        brand: 'Basic Books',
        sku: 'BK-DOET-003',
        category: 'Books',
        subCategory: 'Design & UX',
        description: 'Don Norman\'s foundational masterpiece on cognitive design, human-centered usability, and intuitive object ergonomics.',
        price: 699,
        originalPrice: 899,
        images: [
          'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 40,
        rating: 4.8,
        numReviews: 610,
        features: ['UX Essential Classic', 'Paperback 368 Pages', 'Illustrated Examples'],
        isFeatured: true,
        isBestSeller: false,
        isHotDeal: false,
      },
      {
        title: 'System Design Interview – An Insider\'s Guide',
        brand: 'Independent',
        sku: 'BK-SYSD-004',
        category: 'Books',
        subCategory: 'Computer Science',
        description: 'Step-by-step frameworks for architecting large-scale systems (YouTube, Twitter, Google Drive) with diagrams and real trade-offs by Alex Xu.',
        price: 1499,
        originalPrice: 1899,
        images: [
          'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 30,
        rating: 4.9,
        numReviews: 530,
        features: ['Real-World System Blueprints', '300+ Architectural Diagrams', 'Essential Interview Prep'],
        isFeatured: false,
        isBestSeller: true,
        isHotDeal: true,
      },

      // BEAUTY
      {
        title: 'Hydrating Botanical Hyaluronic Acid Serum 50ml',
        brand: 'Sora Botanicals',
        sku: 'BTY-SRM-001',
        category: 'Beauty',
        subCategory: 'Skincare',
        description: 'Multi-molecular hyaluronic acid complex paired with niacinamide and Centella Asiatica for deep plumping hydration and barrier restoration.',
        price: 1299,
        originalPrice: 1599,
        images: [
          'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 22,
        rating: 4.8,
        numReviews: 240,
        features: ['Clean Formulation', 'Fragrance-Free', 'Dermatologist Tested', 'Cruelty Free'],
        isFeatured: true,
        isBestSeller: true,
        isHotDeal: false,
      },
      {
        title: 'Ceramide Rich Barrier Restoration Cream 60g',
        brand: 'Komorebi Skin',
        sku: 'BTY-CRM-002',
        category: 'Beauty',
        subCategory: 'Skincare',
        description: 'Formulated with 5 essential ceramides, squalane, and fatty acids to lock in moisture and protect dry, sensitive skin all day long.',
        price: 1099,
        originalPrice: 1399,
        images: [
          'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 17,
        rating: 4.7,
        numReviews: 165,
        features: ['5-Ceramide Complex', 'Squalane & Peptides', 'Ultra-Rich Non-Greasy Texture'],
        isFeatured: false,
        isBestSeller: false,
        isHotDeal: false,
      },
      {
        title: 'Cold-Pressed Golden Jojoba & Rosehip Facial Oil',
        brand: 'Botanica Pure',
        sku: 'BTY-OIL-003',
        category: 'Beauty',
        subCategory: 'Face Oils',
        description: '100% pure organic cold-pressed balancing face oil rich in vitamins A & C for radiant glow and overnight cell nourishment.',
        price: 899,
        originalPrice: 1199,
        images: [
          'https://images.unsplash.com/photo-1608248597359-0099497e6878?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 19,
        rating: 4.8,
        numReviews: 120,
        features: ['Organic Certified', 'Cold Pressed', 'Non-comedogenic'],
        isFeatured: false,
        isBestSeller: false,
        isHotDeal: true,
      },
      {
        title: 'Mineral Broad-Spectrum SPF 50+ Invisible Fluid',
        brand: 'Solar Shield',
        sku: 'BTY-SPF-004',
        category: 'Beauty',
        subCategory: 'Sun Care',
        description: 'Non-nano zinc oxide daily sunscreen fluid with zero white cast, velvet matte finish, and blue light defense antioxidant complex.',
        price: 949,
        originalPrice: 1149,
        images: [
          'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 26,
        rating: 4.9,
        numReviews: 290,
        features: ['Reef Safe', 'Water Resistant 80min', 'Invisible Velvet Finish'],
        isFeatured: true,
        isBestSeller: false,
        isHotDeal: false,
      },

      // SPORTS
      {
        title: 'High-Density Non-Slip Natural Rubber Yoga Mat',
        brand: 'Prana Form',
        sku: 'SPT-MAT-001',
        category: 'Sports',
        subCategory: 'Fitness Gear',
        description: '5mm thick sustainable biodegradable natural tree rubber with laser-etched alignment guides and sweat-absorbent polyurethane top surface.',
        price: 2199,
        originalPrice: 2699,
        images: [
          'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 20,
        rating: 4.8,
        numReviews: 175,
        features: ['Laser Alignment Lines', '5mm Cushioning', 'Superior Grip When Wet'],
        isFeatured: true,
        isBestSeller: true,
        isHotDeal: false,
      },
      {
        title: 'Adjustable Steel Speed Jump Rope with Ball Bearings',
        brand: 'Acro Athletics',
        sku: 'SPT-ROP-002',
        category: 'Sports',
        subCategory: 'Cardio Training',
        description: '360-degree dual ball-bearing rotation system with knurled aircraft aluminum handles and kink-resistant coated wire cable.',
        price: 799,
        originalPrice: 999,
        images: [
          'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 35,
        rating: 4.7,
        numReviews: 110,
        features: ['Dual Speed Bearings', 'Aluminum Knurled Grips', 'Custom Length Trimmable'],
        isFeatured: false,
        isBestSeller: false,
        isHotDeal: true,
      },
      {
        title: 'Insulated Stainless Steel Sports Canteen 32oz',
        brand: 'Hydro Peak',
        sku: 'SPT-BTL-003',
        category: 'Sports',
        subCategory: 'Hydration',
        description: 'Double-wall vacuum insulated 18/8 pro-grade stainless steel bottle. Keeps drinks cold for 24 hours, includes leakproof straw lid.',
        price: 1199,
        originalPrice: 1499,
        images: [
          'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 28,
        rating: 4.9,
        numReviews: 340,
        features: ['24h Ice Cold Insulation', 'BPA-Free Straw Lid', 'Sweat-Proof Powder Coating'],
        isFeatured: true,
        isBestSeller: false,
        isHotDeal: false,
      },
      {
        title: 'Deep Tissue Recovery Massage Gun (6 Speeds)',
        brand: 'Thera Pulse',
        sku: 'SPT-GUN-004',
        category: 'Sports',
        subCategory: 'Recovery',
        description: 'Brushless quiet motor with 12mm stroke amplitude, 6 interchangeable attachment heads, and long-lasting 3200mAh lithium battery.',
        price: 3999,
        originalPrice: 5499,
        images: [
          'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
        ],
        stockCount: 11,
        rating: 4.8,
        numReviews: 220,
        features: ['12mm Percussive Amplitude', 'Ultra-Quiet 45dB Motor', '6 Massage Heads Included'],
        isFeatured: false,
        isBestSeller: true,
        isHotDeal: true,
      },
    ];

    const createdProducts = await Product.insertMany(rawProducts);
    console.log(`[Seed] Created ${createdProducts.length} products across 6 categories in INR.`);

    // 3. Create Sample Reviews
    await Review.create([
      {
        product: createdProducts[0]._id,
        user: customer1._id,
        userName: customer1.name,
        rating: 5,
        comment: 'Best ANC headphones I have ever owned. The soundstage is remarkably broad and battery life easily lasts two full weeks of commute.',
      },
      {
        product: createdProducts[0]._id,
        user: customer2._id,
        userName: customer2.name,
        rating: 4,
        comment: 'Exceptional build quality and comfort. The companion app equalizer makes a noticeable difference for acoustic tracks.',
      },
      {
        product: createdProducts[1]._id,
        user: customer1._id,
        userName: customer1.name,
        rating: 5,
        comment: 'Silence at the push of a button. Flights are completely quiet with the XM5. Microphone clarity during calls is top tier.',
      },
      {
        product: createdProducts[2]._id,
        user: customer2._id,
        userName: customer2.name,
        rating: 5,
        comment: 'Aura Pro delivers breathtaking resolution. The spatial audio tracking feels like sitting in an intimate orchestral hall.',
      },
    ]);

    // 4. Create Sample Orders in INR
    const sampleOrder1 = await Order.create({
      user: customer1._id,
      orderNumber: 'SE-ORD-2026-891024',
      items: [
        {
          product: createdProducts[0]._id,
          title: createdProducts[0].title,
          image: createdProducts[0].images[0],
          price: createdProducts[0].price,
          quantity: 1,
        },
        {
          product: createdProducts[8]._id,
          title: createdProducts[8].title,
          image: createdProducts[8].images[0],
          price: createdProducts[8].price,
          quantity: 1,
        },
      ],
      shippingAddress: {
        fullName: 'Alex Rivera',
        street: '120 Nariman Point, Suite 400',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400021',
        country: 'India',
        phone: '+91 91234 56789',
      },
      paymentMethod: 'card_simulated',
      paymentResult: {
        id: 'SIM-TXN-1730001',
        status: 'COMPLETED',
        update_time: new Date().toISOString(),
        cardLast4: '4242',
      },
      itemsPrice: 28498,
      shippingPrice: 0,
      taxPrice: 1424.90,
      totalPrice: 29922.90,
      isPaid: true,
      paidAt: new Date(Date.now() - 48 * 3600 * 1000),
      isDelivered: false,
      status: 'Shipped',
      trackingSteps: [
        { status: 'Order Placed', timestamp: new Date(Date.now() - 48 * 3600 * 1000), note: 'Payment verified' },
        { status: 'Confirmed', timestamp: new Date(Date.now() - 36 * 3600 * 1000), note: 'Inventory allocated' },
        { status: 'Shipped', timestamp: new Date(Date.now() - 12 * 3600 * 1000), note: 'Dispatched via BlueDart Express' },
      ],
    });

    const sampleOrder2 = await Order.create({
      user: customer2._id,
      orderNumber: 'SE-ORD-2026-612493',
      items: [
        {
          product: createdProducts[2]._id,
          title: createdProducts[2].title,
          image: createdProducts[2].images[0],
          price: createdProducts[2].price,
          quantity: 1,
        },
      ],
      shippingAddress: {
        fullName: 'Sarah Chen',
        street: '456 Connaught Place, Block B',
        city: 'New Delhi',
        state: 'Delhi',
        postalCode: '110001',
        country: 'India',
        phone: '+91 98111 22334',
      },
      paymentMethod: 'cod',
      itemsPrice: 26999,
      shippingPrice: 0,
      taxPrice: 1349.95,
      totalPrice: 28348.95,
      isPaid: false,
      isDelivered: true,
      deliveredAt: new Date(Date.now() - 4 * 3600 * 1000),
      status: 'Delivered',
      trackingSteps: [
        { status: 'Order Placed', timestamp: new Date(Date.now() - 72 * 3600 * 1000), note: 'Cash on delivery selected' },
        { status: 'Confirmed', timestamp: new Date(Date.now() - 60 * 3600 * 1000), note: 'Order verified by operations' },
        { status: 'Shipped', timestamp: new Date(Date.now() - 24 * 3600 * 1000), note: 'Package in transit' },
        { status: 'Delivered', timestamp: new Date(Date.now() - 4 * 3600 * 1000), note: 'Delivered and signed by recipient' },
      ],
    });

    console.log('[Seed] Seeding finished successfully! 24 products in INR, users, reviews, and orders populated.');
  } catch (error) {
    console.error('[Seed Error]', error);
  }
};
