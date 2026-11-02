# ShopEase — Full-Stack Development (FSD) Syllabus Concept Mapping

This document provides a 1:1 cross-reference mapping university academic syllabus competencies in Full-Stack Web Development directly to concrete files, functions, and lines of code within the ShopEase codebase.

---

## 1. Advanced JavaScript & Modern ES6+ Architecture

| Syllabus Unit / Concept | Description | Concrete Implementation in ShopEase |
| :--- | :--- | :--- |
| **ES6 Modules (import/export)** | Native ECMAScript modularity | `"type": "module"` in `package.json`, applied across `client/src/` and `server/src/`. |
| **Promises & Async/Await** | Non-blocking asynchronous I/O | Used in all controller endpoints (`authController.js`, `orderController.js`, `productController.js`). |
| **Array Methods (.map, .filter, .reduce)** | Functional data manipulation | • `reduce`: Calculating cart subtotal and total revenue in `Cart.js` & `adminController.js`.<br>• `map`: Rendering product grids, reviews, and tracking steps.<br>• `filter`: Dynamic facet search and order status slicing. |
| **Object & Array Destructuring** | Concise data extraction | Used extensively across request bodies (`const { name, email, password } = req.body`) and React props. |
| **Custom Debounce** | Throttling rapid user events | `client/src/hooks/useDebounce.js` prevents network flooding during live catalog search input. |

---

## 2. Front-End Tier: React 19 Core Competencies

| Syllabus Unit / Concept | Description | Concrete Implementation in ShopEase |
| :--- | :--- | :--- |
| **Functional Components & JSX** | Modern declarative UI design | Every visual component (`Navbar.jsx`, `ProductCard.jsx`, `CartDrawer.jsx`) is written as clean functional components. |
| **State Management (`useState`)** | Local component lifecycle state | Managing filter inputs, active image tabs, modal open/close states, and review submission fields. |
| **Side Effects (`useEffect`)** | Lifecycle data synchronization | Used in `useProducts.js`, `HomePage.jsx`, and `ProductDetailsPage.jsx` to fetch database records on mount and query changes. |
| **Global State (`useContext`)** | Cross-tree state distribution | `AuthContext.jsx` manages user credentials; `CartContext.jsx` manages shopping bag items and slideover visibility. |
| **Complex State (`useReducer`)** | Predictable state transitions | `AuthContext.jsx` uses `useReducer` with actions (`AUTH_START`, `AUTH_SUCCESS`, `AUTH_FAIL`, `LOGOUT`). |
| **Custom React Hooks** | Encapsulating reusable logic | • `useAuth()`: Accessing user authentication state.<br>• `useCart()`: Accessing shopping cart methods.<br>• `useProducts()`: Managing catalog querying, filtering, and pagination.<br>• `useDebounce()`: Throttling keyboard search input. |
| **Client-Side Routing** | Single Page Application (SPA) routing | `react-router-dom` in `App.jsx` with routes (`/`, `/shop`, `/product/:id`, `/cart`, `/checkout`, `/orders`, `/admin`). |
| **Dynamic Routing** | Parameterized view loading | `/product/:id` dynamically fetches and renders single product specifications and customer reviews from MongoDB. |
| **Route Protection & Guards** | Restricting unauthorized access | `ProtectedRoute.jsx` and `AdminRoute.jsx` prevent unauthenticated customers or non-administrators from accessing restricted views. |

---

## 3. Back-End Tier: Node.js & Express Framework

| Syllabus Unit / Concept | Description | Concrete Implementation in ShopEase |
| :--- | :--- | :--- |
| **Node.js Runtime & Event Loop** | Non-blocking asynchronous runtime | Core execution environment of `server/src/server.js`. |
| **Custom EventEmitters** | Decoupled event-driven architecture | `server/src/utils/eventEmitter.js` emits and listens to `user:registered`, `order:placed`, and `order:status_changed`. |
| **File System (`fs`) & Streams** | Handling file system operations | `server/src/middleware/uploadMiddleware.js` verifies directory paths and handles disk writes. |
| **Express Middleware Pipeline** | Intercepting requests and responses | Express pipeline incorporates `cors()`, `express.json()`, `morgan()`, `protect`, `admin`, `notFound`, and `errorHandler`. |
| **RESTful Routing Architecture** | Resource-oriented HTTP APIs | Modular routes in `server/src/routes/` (`authRoutes.js`, `productRoutes.js`, `cartRoutes.js`, `orderRoutes.js`, `adminRoutes.js`). |
| **Centralized Error Handling** | Uniform exception management | `server/src/middleware/errorMiddleware.js` catches all uncaught controller exceptions and responds with clean JSON errors. |
| **Multipart File Uploads** | Binary image streaming to disk | Multer integration in `uploadMiddleware.js` and `uploadRoutes.js` validates MIME types and saves to `/uploads`. |
| **Static Asset Serving** | Public file distribution | `app.use('/uploads', express.static(uploadsPath))` in `server/src/server.js`. |

---

## 4. Database Tier: MongoDB & Mongoose ODM

| Syllabus Unit / Concept | Description | Concrete Implementation in ShopEase |
| :--- | :--- | :--- |
| **Document-Oriented NoSQL** | Flexible JSON-like document modeling | MongoDB collections: `users`, `products`, `carts`, `orders`, `reviews`. |
| **Schema Validation & Types** | Enforcing data integrity | Mongoose schemas in `server/src/models/` enforce types, required rules, min/max limits, and regex email matching. |
| **Pre-save Middleware Hooks** | Lifecycle triggers prior to save | • `User.js`: Hashes passwords via bcrypt before persisting.<br>• `Product.js`: Computes `inStock` boolean and `discountPercent` before saving. |
| **Model Instance Methods** | Custom business logic on documents | • `user.matchPassword(candidate)` in `User.js`.<br>• `cart.calculateTotals()` in `Cart.js`. |
| **Indexing Strategies** | Query optimization | Text index on `{ title: 'text', description: 'text', brand: 'text' }` and compound unique index `{ product: 1, user: 1 }`. |
| **Relationships (Ref vs Embed)** | Normalized referencing & subdocs | • Normalized References: `order.user` refs `User`, `review.product` refs `Product`.<br>• Embedded Subdocuments: `order.items` and `order.trackingSteps`. |
| **Aggregation Pipelines** | Grouping and analytic rollups | `adminController.js` aggregates category distributions and monthly gross billing. |

---

## 5. Web Security & Best Practices

| Syllabus Unit / Concept | Description | Concrete Implementation in ShopEase |
| :--- | :--- | :--- |
| **Password Hashing & Salting** | Irreversible credential protection | `bcryptjs` with 10 salt rounds in `User.js`. |
| **Stateless Bearer Tokens (JWT)** | Token-based session management | `jsonwebtoken` signing user ID with HMAC-SHA256, verified in `authMiddleware.js`. |
| **Role-Based Access Control (RBAC)**| Privilege tiers (Customer vs Admin) | `admin` middleware restricts product creation, deletion, order status mutation, and dashboard telemetry. |
| **CORS Security** | Cross-origin resource isolation | `cors` middleware explicitly configured for safe cross-origin API invocation. |

