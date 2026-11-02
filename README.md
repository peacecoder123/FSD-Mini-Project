# ShopEase – A Modern Full-Stack E-Commerce Platform

> **Academic Full-Stack Development (FSD) Mini-Project**  
> Built with **React 19 (Vite 8)**, **Node.js**, **Express.js**, **MongoDB (Mongoose)**, and **Tailwind CSS**.  
> Primary Visual Reference: Faithfully engineered according to the extracted **Stitch** design system.

---

## 🌟 Key Highlights & Engineering Features

- **100% Faithful Design Preservation:** Faithfully implements the extracted design language featuring **Plus Jakarta Sans** typography, slate surfaces (`#FAF8FF`), hairline borders (`#E2E8F0`), and tactile pill badges.
- **Role-Based JWT Authentication:** Bcrypt salted password hashing with stateless HMAC-SHA256 bearer tokens, protecting customer and administrator route trees.
- **Multi-Attribute Product Catalog:** Real-time search with 350ms custom debouncing hook (`useDebounce`), category filtering, price range bounds, stock toggles, sorting, and responsive pagination.
- **Persistent Shopping Cart & Drawer:** Dual-mode state management (Context API + localStorage for guests, MongoDB `/api/cart` for authenticated members) featuring a 400px slideover cart drawer with a live free-shipping progress meter.
- **Inventory-Safe Checkout:** Generates unique order numbers (`SE-ORD-...`), atomically decrements product inventory, prevents overselling race conditions, and supports Cash on Delivery (COD) and Simulated Card payments.
- **Real-Time Order Tracking:** Visual progress milestone tracker (Order Placed -> Confirmed -> Shipped -> Delivered) with status change logging.
- **Administrator Command Center:** Real-time financial telemetry (gross billing, active orders, customer count), SVG revenue growth vector, low-stock warnings (`<= 5 units`), product CRUD modal, and Multer-powered image uploads.
- **Embedded Zero-Config MongoDB Daemon:** Runs a high-performance in-memory MongoDB daemon automatically if an external `mongod` service is not running on port 27017, guaranteeing 100% flawless execution during college viva demonstrations!

---

## 🚀 Quick Start & Local Setup Instructions

### Prerequisites
- **Node.js:** v18.0.0 or higher (v24.20.0 tested)
- **NPM:** v9.0.0 or higher (v11.19.0 tested)

### 1. Start the Backend API Server
```bash
cd server
npm install
npm run dev
```
*The server will start on `http://localhost:5000`. If an external MongoDB instance is running on port 27017, it will connect immediately; otherwise, it automatically spins up an embedded MongoDB instance and seeds 24 products, admin/customer accounts, reviews, and sample orders.*

### 2. Start the Frontend Client
```bash
cd client
npm install
npm run dev
```
*The Vite frontend dev server will start on `http://localhost:5173` with configured API proxying to port 5000.*

---

## 🔑 Demonstration Accounts

For convenient evaluation during lab practicals or a college viva examination, the login page includes **one-click demo buttons**:

| Account Type | Email | Password | Role & Permissions |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@shopease.com` | `admin123` | Full access to Admin Console, inventory CRUD, order management, and revenue analytics. |
| **Customer** | `alex@example.com` | `customer123` | Standard shopper account with past orders, saved shipping details, and review submission privileges. |

---

## 📁 Repository Structure

```
FSD mini project/
├── client/                     # Frontend Application (React 19 + Vite + Tailwind)
│   ├── src/
│   │   ├── components/         # Common Navbar, Banner, Footer, CartDrawer, ProductCard
│   │   ├── context/            # AuthContext, CartContext
│   │   ├── hooks/              # useAuth, useCart, useProducts, useDebounce
│   │   ├── pages/              # Home, Shop, Details, Cart, Checkout, Confirmation, Orders, Admin
│   │   ├── styles/             # design-tokens.css
│   │   └── utils/              # api.js fetch wrapper
│   ├── index.html              # Google Fonts (Plus Jakarta Sans) & Material Symbols
│   └── tailwind.config.js      # Exact color tokens, font sizes, and radii from Stitch design
├── server/                     # Backend REST API Service (Node.js + Express + Mongoose)
│   ├── src/
│   │   ├── config/             # Dual-mode database connector (db.js)
│   │   ├── controllers/        # authController, productController, cartController, orderController, adminController
│   │   ├── middleware/         # authMiddleware (protect, admin), errorMiddleware, uploadMiddleware
│   │   ├── models/             # User, Product, Cart, Order, Review
│   │   ├── routes/             # authRoutes, productRoutes, cartRoutes, orderRoutes, adminRoutes, uploadRoutes
│   │   ├── utils/              # eventEmitter.js, generateToken.js, seedData.js
│   │   └── server.js           # Central Express app entry point
│   └── uploads/                # Multer static image storage directory
├── docs/
│   └── DESIGN_ANALYSIS.md      # Detailed UI/UX design tokens and component mapping specification
├── deliverables/               # Academic Project Deliverables
│   ├── ShopEase_Project_Report.docx  # Full 15-chapter formal academic project report
│   ├── ShopEase_Presentation.pptx    # 20-slide technical presentation deck with screenshots
│   ├── API_Documentation.md          # REST API endpoint reference
│   ├── Testing_Report.md             # 38-case test verification matrix (100% pass)
│   ├── Syllabus_Concept_Mapping.md   # 1:1 mapping to university FSD syllabus topics
│   └── PROJECT_STATUS.md             # Final project completion ledger
└── screenshots/                # Real captured application screenshots
    ├── 01_homepage.png
    ├── 02_catalog_products.png
    ├── 03_product_details.png
    ├── 04_search_filtering.png
    ├── 05_shopping_cart.png
    ├── 06_checkout.png
    ├── 07_order_confirmation.png
    ├── 08_order_history.png
    ├── 09_login.png
    ├── 10_registration.png
    ├── 11_admin_dashboard.png
    ├── 12_admin_products.png
    ├── 13_admin_orders.png
    └── 14_mobile_responsive.png
```

---

## 🧪 Verification & Testing Results

- **Automated Tests:** 38 test specifications covering authentication, catalog filtering, cart manipulation, stock locking, and admin permissions executed with a **100% pass rate**.
- **Real Browser Screenshots:** 14 full-resolution screenshots captured directly from the live running application using headless Microsoft Edge (`msedge --headless --screenshot`).
- **Responsive Layout Verification:** Verified across Desktop (1440px), Tablet (768px), and Mobile (390px) with zero horizontal overflow.

---

## 📄 License & Academic Attribution
Academic mini-project developed in accordance with the university curriculum for Full-Stack Development (FSD). All rights reserved.

