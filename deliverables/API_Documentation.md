# ShopEase — Complete RESTful API Documentation

**Base URL:** `http://localhost:5000/api`  
**Authentication Scheme:** Bearer Token via HTTP Header (`Authorization: Bearer <JWT>`)  
**Data Exchange Format:** `application/json`

---

## 1. Authentication Endpoints

### Register Account
- **Method & Path:** `POST /api/auth/register`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "name": "Alex Rivera",
    "email": "alex@example.com",
    "password": "customer123",
    "role": "customer"
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Account registered successfully",
    "data": {
      "_id": "6ae8bc534e01a82eea79a601",
      "name": "Alex Rivera",
      "email": "alex@example.com",
      "role": "customer",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

### Sign In
- **Method & Path:** `POST /api/auth/login`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "admin@shopease.com",
    "password": "admin123"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Signed in successfully",
    "data": {
      "_id": "6ae8bc534e01a82eea79a600",
      "name": "Admin Director",
      "email": "admin@shopease.com",
      "role": "admin",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

### Current User Profile
- **Method & Path:** `GET /api/auth/me`
- **Access:** Private (Bearer Token required)
- **Response (200 OK):** Returns full User document (password omitted).

### Update Profile
- **Method & Path:** `PUT /api/auth/me`
- **Access:** Private
- **Request Body:** `{ "name": "...", "phone": "...", "address": { ... }, "password": "..." }`

---

## 2. Product Catalog Endpoints

### Query Catalog
- **Method & Path:** `GET /api/products`
- **Access:** Public
- **Query Parameters:**
  - `search`: Case-insensitive substring regex against title, brand, description
  - `category`: Category name (`Electronics`, `Fashion`, `Home & Kitchen`, `Books`, `Beauty`, `Sports`)
  - `minPrice`: Minimum numeric price bound
  - `maxPrice`: Maximum numeric price bound
  - `inStockOnly`: Set `true` to exclude items with `stockCount === 0`
  - `featured`: Set `true` to return featured flagships
  - `sort`: `featured` | `price-asc` | `price-desc` | `rating` | `newest`
  - `page`: Page index (default: `1`)
  - `limit`: Items per page (default: `12`)

### Get Product by ID
- **Method & Path:** `GET /api/products/:id`
- **Access:** Public
- **Response:** Complete product details and populated array of customer reviews.

### Create Product
- **Method & Path:** `POST /api/products`
- **Access:** Private / Admin Only
- **Request Body:**
  ```json
  {
    "title": "Aura Studio Soundbar",
    "brand": "Aura Soundworks",
    "sku": "AUR-SND-010",
    "category": "Electronics",
    "description": "Dolby Atmos enabled architectural TV soundbar with wireless subwoofer.",
    "price": 499.99,
    "originalPrice": 599.99,
    "stockCount": 20,
    "images": ["/uploads/product-1730000.png"],
    "features": ["Dolby Atmos", "eARC HDMI", "AirPlay 2"],
    "isFeatured": true
  }
  ```

### Update Product
- **Method & Path:** `PUT /api/products/:id`
- **Access:** Private / Admin Only

### Delete Product
- **Method & Path:** `DELETE /api/products/:id`
- **Access:** Private / Admin Only

### Post Review
- **Method & Path:** `POST /api/products/:id/reviews`
- **Access:** Private
- **Request Body:** `{ "rating": 5, "comment": "Outstanding dynamic sound quality!" }`

---

## 3. Shopping Cart Endpoints

### Get Cart
- **Method & Path:** `GET /api/cart`
- **Access:** Private
- **Response:** User's cart document with dynamic subtotal, shipping fee, and line items.

### Add to Cart
- **Method & Path:** `POST /api/cart`
- **Access:** Private
- **Request Body:** `{ "productId": "6ae8bc534e01a82eea79a677", "quantity": 1 }`

### Update Quantity
- **Method & Path:** `PUT /api/cart/:itemId`
- **Access:** Private
- **Request Body:** `{ "quantity": 3 }`

### Remove Item
- **Method & Path:** `DELETE /api/cart/:itemId`
- **Access:** Private

### Clear Cart
- **Method & Path:** `DELETE /api/cart`
- **Access:** Private

---

## 4. Orders & Fulfillment Endpoints

### Create Order
- **Method & Path:** `POST /api/orders`
- **Access:** Private
- **Request Body:**
  ```json
  {
    "orderItems": [
      {
        "product": "6ae8bc534e01a82eea79a677",
        "title": "Momentum 4 Wireless ANC",
        "price": 279.99,
        "quantity": 1,
        "image": "..."
      }
    ],
    "shippingAddress": {
      "fullName": "Alex Rivera",
      "street": "120 Market Street",
      "city": "Seattle",
      "state": "WA",
      "postalCode": "98101",
      "country": "USA",
      "phone": "+1 (555) 019-2834"
    },
    "paymentMethod": "card_simulated"
  }
  ```
- **Behavior:** Validates stock buffer, atomically decrements `stockCount`, flushes user's cart, logs `order:placed` event, returns saved order with tracking milestones.

### My Orders
- **Method & Path:** `GET /api/orders/my-orders`
- **Access:** Private

### Order by ID
- **Method & Path:** `GET /api/orders/:id`
- **Access:** Private (Owner or Admin)

---

## 5. Administrative Console Endpoints

### Dashboard Telemetry
- **Method & Path:** `GET /api/admin/dashboard`
- **Access:** Private / Admin Only
- **Response:**
  - `metrics`: `{ totalRevenue, totalOrders, totalProducts, totalCustomers, pendingOrders, deliveredOrders }`
  - `revenueChart`: 6-month monthly gross billing trajectory
  - `lowStockProducts`: Items with `stockCount <= 5`
  - `recentOrders`: Last 6 customer transactions
  - `topProducts`: Highest-rated flagships

### All Orders
- **Method & Path:** `GET /api/admin/orders`
- **Access:** Private / Admin Only

### Update Order Status
- **Method & Path:** `PATCH /api/admin/orders/:id/status`
- **Access:** Private / Admin Only
- **Request Body:**
  ```json
  {
    "status": "Shipped",
    "note": "Package picked up by courier express facility"
  }
  ```

---

## 6. Multipart Upload Endpoint

### Upload Image
- **Method & Path:** `POST /api/upload`
- **Access:** Private / Admin Only
- **Content-Type:** `multipart/form-data`
- **Field Name:** `image`
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Image uploaded successfully",
    "data": {
      "url": "/uploads/product-1730000000000-123456789.png",
      "filename": "product-1730000000000-123456789.png",
      "size": 245120
    }
  }
  ```

