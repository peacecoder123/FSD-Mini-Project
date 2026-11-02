import os
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)  # 16:9 Widescreen
    prs.slide_height = Inches(7.5)

    PRIMARY = RGBColor(0, 74, 198)       # #004ac6
    SECONDARY = RGBColor(19, 27, 46)     # #131b2e
    ACCENT = RGBColor(37, 99, 235)       # #2563eb
    LIGHT_BG = RGBColor(250, 248, 255)   # #faf8ff
    CARD_BG = RGBColor(255, 255, 255)
    BORDER_COLOR = RGBColor(226, 232, 240)
    TEXT_MUTED = RGBColor(115, 118, 134)

    blank_layout = prs.slide_layouts[6]

    def add_header(slide, title_text, category_text="ShopEase Academic Presentation"):
        # Header banner
        header_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(1.1))
        tf = header_box.text_frame
        tf.word_wrap = True
        
        p_cat = tf.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.size = Pt(11)
        p_cat.font.bold = True
        p_cat.font.color.rgb = ACCENT

        p_title = tf.add_paragraph()
        p_title.text = title_text
        p_title.font.size = Pt(24)
        p_title.font.bold = True
        p_title.font.color.rgb = SECONDARY

    def add_card(slide, left, top, width, height, title="", items=[]):
        shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = CARD_BG
        shape.line.color.rgb = BORDER_COLOR
        shape.line.width = Pt(1.5)

        tf = shape.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.25)
        tf.margin_top = Inches(0.2)
        tf.margin_right = Inches(0.25)
        tf.margin_bottom = Inches(0.2)

        if title:
            p_t = tf.paragraphs[0]
            p_t.text = title
            p_t.font.size = Pt(16)
            p_t.font.bold = True
            p_t.font.color.rgb = PRIMARY
            p_t.space_after = Pt(10)

        for item in items:
            p = tf.add_paragraph()
            p.text = f"•  {item}"
            p.font.size = Pt(13)
            p.font.color.rgb = SECONDARY
            p.space_after = Pt(6)

    def add_image_slide(slide, title, category, img_filename, bullet_points):
        add_header(slide, title, category)
        img_path = os.path.abspath(os.path.join("screenshots", img_filename))
        if os.path.exists(img_path):
            slide.shapes.add_picture(img_path, Inches(0.8), Inches(1.6), Inches(6.8), Inches(5.2))
        add_card(slide, Inches(7.9), Inches(1.6), Inches(4.6), Inches(5.2), "Key Architectural Highlights", bullet_points)

    # ==================== SLIDE 1: Title Slide ====================
    s1 = prs.slides.add_slide(blank_layout)
    bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = SECONDARY
    bg1.line.fill.background()

    tb1 = s1.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(11.3), Inches(4.0))
    tf1 = tb1.text_frame
    tf1.word_wrap = True

    p_badge = tf1.paragraphs[0]
    p_badge.text = "FULL-STACK DEVELOPMENT (FSD) ACADEMIC MINI-PROJECT"
    p_badge.font.size = Pt(13)
    p_badge.font.bold = True
    p_badge.font.color.rgb = RGBColor(127, 252, 151) # tertiary green
    p_badge.space_after = Pt(14)

    p_main = tf1.add_paragraph()
    p_main.text = "ShopEase – A Modern Full-Stack E-Commerce Platform"
    p_main.font.size = Pt(36)
    p_main.font.bold = True
    p_main.font.color.rgb = RGBColor(255, 255, 255)
    p_main.space_after = Pt(14)

    p_desc = tf1.add_paragraph()
    p_desc.text = "High-precision commercial design fidelity meeting enterprise MERN software architecture.\nReal MongoDB persistence, JWT authentication, inventory safety, and administrative telemetry."
    p_desc.font.size = Pt(16)
    p_desc.font.color.rgb = RGBColor(200, 210, 230)
    p_desc.space_after = Pt(28)

    p_meta = tf1.add_paragraph()
    p_meta.text = "Presented By: [Student Name(s) & Roll Nos]  |  Guide: [Faculty Guide Name]  |  Academic Year 2026–2027"
    p_meta.font.size = Pt(12)
    p_meta.font.color.rgb = RGBColor(160, 175, 205)

    # ==================== SLIDE 2: Project Vision ====================
    s2 = prs.slides.add_slide(blank_layout)
    add_header(s2, "Project Vision & Commercial Philosophy", "01. Introduction")
    add_card(s2, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2), "Editorial Precision (Linear / Stripe)", [
        "Purity over Noise: Generous whitespace, razor-thin structural dividers (#E2E8F0), and typographic clarity.",
        "Utilitarian Density: Dense product specifications structured cleanly beside aspirational studio imagery.",
        "Micro-Tactile Feedback: Crisp pill badges, delicate inner borders, and interactive hover elevation states."
    ])
    add_card(s2, Inches(6.9), Inches(1.6), Inches(5.6), Inches(5.2), "Frictionless Consumer Experience (Apple Store)", [
        "Instantaneous Navigation: Single Page Application (SPA) routing with zero jarring full-page browser reloads.",
        "Instant Search & Filtering: Real-time search debouncing, price range sliders, and instant category toggling.",
        "High-Trust Reliability: Real-time inventory locks, stock status badges, and live package tracking milestones."
    ])

    # ==================== SLIDE 3: Problem Statement ====================
    s3 = prs.slides.add_slide(blank_layout)
    add_header(s3, "Problem Statement & Academic Objectives", "02. Objectives")
    add_card(s3, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2), "Existing Academic Pitfalls", [
        "Generic Templates: Reliance on generic Bootstrap templates that fail to reflect modern design systems.",
        "Simulated Authentication: Hardcoded users without real JWT token lifecycles or password hashing.",
        "Race Conditions & Fragile State: Lack of inventory stock checking and persistent cart sessions."
    ])
    add_card(s3, Inches(6.9), Inches(1.6), Inches(5.6), Inches(5.2), "ShopEase Engineering Goals", [
        "Design Fidelity: 100% faithful realization of the provided Stitch design system specifications.",
        "MERN Architecture: Stateless Express REST APIs communicating with MongoDB via Mongoose ODM.",
        "Full Commercial Capabilities: Customer registration, cart persistence, inventory-safe order booking, and admin telemetry."
    ])

    # ==================== SLIDE 4: Design System ====================
    s4 = prs.slides.add_slide(blank_layout)
    add_header(s4, "Primary Design Reference & Design Tokens", "03. UI/UX Design System")
    add_card(s4, Inches(0.8), Inches(1.6), Inches(3.6), Inches(5.2), "Typography Hierarchy", [
        "Primary Font: Plus Jakarta Sans",
        "Display Hero: 56px / 700 / -0.03em",
        "Headline LG: 32px / 600 / -0.02em",
        "Headline MD: 20px / 600 / -0.01em",
        "Body Text: 15px / 400 (Clean slate)",
        "Micro Badges: 11px uppercase tracking"
    ])
    add_card(s4, Inches(4.8), Inches(1.6), Inches(3.6), Inches(5.2), "Color Palette & Tokens", [
        "Canvas: Slate White #FAF8FF",
        "Cards: Pure White #FFFFFF",
        "Primary Brand: Royal Blue #004AC6",
        "Interactive CTAs: Blue #2563EB",
        "Dividers: Hairline #E2E8F0",
        "Status: In-Stock Green, Alert Red"
    ])
    add_card(s4, Inches(8.8), Inches(1.6), Inches(3.7), Inches(5.2), "Components & Layout", [
        "Grid: 12-column responsive grid",
        "Spacing: 8pt architectural rhythm",
        "Border Radius: 8px (cards), 9999px (pills)",
        "Drawers: 400px fixed slideover cart",
        "Elevation: Subtle 2-tier ambient shadow"
    ])

    # ==================== SLIDE 5: System Architecture ====================
    s5 = prs.slides.add_slide(blank_layout)
    add_header(s5, "Technology Stack & Tiered Architecture", "04. Architecture")
    add_card(s5, Inches(0.8), Inches(1.6), Inches(3.6), Inches(5.2), "Presentation Tier (Frontend)", [
        "React 19 & Vite 8",
        "Tailwind CSS v3 Design System",
        "Material Symbols & Lucide React",
        "React Router DOM v7 (SPA)",
        "Context API & useReducer",
        "Custom Hooks (useAuth, useCart)"
    ])
    add_card(s5, Inches(4.8), Inches(1.6), Inches(3.6), Inches(5.2), "Application Tier (Backend)", [
        "Node.js Runtime Environment",
        "Express.js REST Framework",
        "JWT Stateless Authentication",
        "Bcrypt Password Encryption",
        "Multer Disk Asset Storage",
        "Node.js Custom EventEmitters"
    ])
    add_card(s5, Inches(8.8), Inches(1.6), Inches(3.7), Inches(5.2), "Data Tier (Database)", [
        "MongoDB Document Store",
        "Mongoose Object Modeling",
        "Compound & Text Search Indexes",
        "Embedded / Fallback Daemon Engine",
        "Database Seed Orchestrator",
        "Aggregation Analytics Pipelines"
    ])

    # ==================== SLIDE 6: DFD Diagrams ====================
    s6 = prs.slides.add_slide(blank_layout)
    add_header(s6, "Data Flow Architecture (DFD Level 0 & Level 1)", "05. System Design")
    add_card(s6, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2), "DFD Level 0 (Context Level)", [
        "Customer Entity: Sends credentials, filter parameters, cart updates, and orders; receives catalog, tracking, and receipts.",
        "Administrator Entity: Submits product entries, inventory adjustments, and status changes; receives operational metrics.",
        "ShopEase Boundary: Central process managing persistence, token signing, and transaction verification."
    ])
    add_card(s6, Inches(6.9), Inches(1.6), Inches(5.6), Inches(5.2), "DFD Level 1 (Functional Sub-Processes)", [
        "P1: Auth Service -> Validates email/password, returns signed JWT.",
        "P2: Catalog Engine -> Executes regex search and price filtering.",
        "P3: Cart Subsystem -> Manages session line items and totals.",
        "P4: Order Fulfillment -> Atomically decrements stock and commits order.",
        "P5: Admin Telemetry -> Aggregates gross billing and low-stock alerts."
    ])

    # ==================== SLIDE 7: Use Case Diagram ====================
    s7 = prs.slides.add_slide(blank_layout)
    add_header(s7, "Use Case Diagram & Actor Responsibilities", "06. System Design")
    add_card(s7, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2), "Customer Actor Use Cases", [
        "Register Account & Sign In with JWT",
        "Search Catalog with 350ms Debounced Query",
        "Filter by Category, Price Range, and In-Stock Only",
        "Inspect Interactive 360° Gallery & Specifications",
        "Add Items to Cart & Adjust Quantities",
        "Checkout with COD or Simulated Online Card",
        "Track Order Milestone Journey Live in Profile",
        "Submit Verified Customer Rating & Review"
    ])
    add_card(s7, Inches(6.9), Inches(1.6), Inches(5.6), Inches(5.2), "Administrator Actor Use Cases", [
        "Secure Admin Console Authentication (RBAC)",
        "Monitor Real-Time Financial & Order Telemetry",
        "Create New Products with Multer Local File Upload",
        "Edit Existing Product Pricing, SKUs & Inventory Buffer",
        "Delete Outdated Products & Cascade Reviews",
        "Update Order Dispatch Status (Processing -> Delivered)",
        "Review Low-Stock Trigger Alerts (< 5 units remaining)"
    ])

    # ==================== SLIDE 8: ER Diagram ====================
    s8 = prs.slides.add_slide(blank_layout)
    add_header(s8, "Database Architecture & Entity Relationships", "07. Database Design")
    add_card(s8, Inches(0.8), Inches(1.6), Inches(11.7), Inches(5.2), "Relational Mapping in Document Store", [
        "1. USER (1) ──has── (1) CART: User ID links uniquely to Cart document for seamless multi-device cart persistence.",
        "2. USER (1) ──places── (N) ORDERS: Every completed order embeds historical customer identity and shipping snapshot.",
        "3. ORDER (1) ──contains── (N) ORDER_ITEMS: Snapshots item title, image, price at purchase time, referencing Product ID.",
        "4. PRODUCT (1) ──receives── (N) REVIEWS: Reviews hold Product ObjectId and User ObjectId with a unique compound index.",
        "5. USER (1) ──writes── (N) REVIEWS: Prevents duplicate review spam per product per authenticated user account."
    ])

    # ==================== SLIDE 9: Mongoose Models ====================
    s9 = prs.slides.add_slide(blank_layout)
    add_header(s9, "Mongoose Schemas & Data Modeling", "08. Database Design")
    add_card(s9, Inches(0.8), Inches(1.6), Inches(3.6), Inches(5.2), "User & Review Models", [
        "User: Name, Email (unique), Password (hashed), Role ('customer'|'admin'), Phone, Address object.",
        "Review: Product ref, User ref, UserName, Rating (1-5), Comment, VerifiedPurchase flag.",
        "Compound Index: { product: 1, user: 1 } ensures 1 review per user per item."
    ])
    add_card(s9, Inches(4.8), Inches(1.6), Inches(3.6), Inches(5.2), "Product Model", [
        "Title, Brand, SKU (unique), Category, Description, Price, OriginalPrice, DiscountPercent.",
        "StockCount, InStock (auto-computed in pre-save hook), Rating, NumReviews.",
        "Features array, Specifications map, Flags: isFeatured, isBestSeller, isHotDeal.",
        "Full Text Index on title, description, brand."
    ])
    add_card(s9, Inches(8.8), Inches(1.6), Inches(3.7), Inches(5.2), "Cart & Order Models", [
        "Cart: User ref, Items array, Subtotal, Shipping ($0 over $50, else $9.99), Total.",
        "Order: User ref, OrderNumber (e.g. SE-ORD-XXXX), Items array, ShippingAddress subdoc.",
        "PaymentMethod ('cod'|'card_simulated'), ItemsPrice, TaxPrice (5%), ShippingPrice, TotalPrice.",
        "TrackingSteps array ({ status, timestamp, note })."
    ])

    # ==================== SLIDE 10: Auth & Security ====================
    s10 = prs.slides.add_slide(blank_layout)
    add_image_slide(s10, "Authentication, JWT & Role-Based Access Control", "09. Security Implementation", "09_login.png", [
        "Bcrypt Hashing: Pre-save Mongoose hook automatically salts and hashes credentials with 10 rounds.",
        "Stateless JWT: Issues signed HMAC-SHA256 bearer tokens with 30-day expiration.",
        "Role-Based Guards: protect and admin middleware restrict routes cleanly.",
        "Viva Quick-Fill: Embedded demo login buttons for instant Examiner / Viva evaluation."
    ])

    # ==================== SLIDE 11: Catalog & Filters ====================
    s11 = prs.slides.add_slide(blank_layout)
    add_image_slide(s11, "Product Catalog & Multi-Facet Filtering Engine", "10. Storefront Implementation", "02_catalog_products.png", [
        "Debounced Search: 350ms useDebounce custom hook prevents server query flooding.",
        "Multi-attribute Facets: Filter by Category, Price Range ($Min - $Max), and In-Stock toggle.",
        "Density Toggle: 3 vs 4-column responsive grid layout matching Stitch design.",
        "Product Card: 1:1 media box, Best Seller badges, hover crossfade, and 1-click Add to Cart."
    ])

    # ==================== SLIDE 12: Product Details ====================
    s12 = prs.slides.add_slide(blank_layout)
    add_image_slide(s12, "Product Detail Page & Interactive Gallery", "11. Product Deep Dive", "03_product_details.png", [
        "Vertical Thumbnail Rail: Interactive image switching and hover zoom magnifier.",
        "Pill Badges: Flagship Edition, Spatial Audio v3, and 360° Studio View badge.",
        "Buy Box: Real-time inventory counter, quantity stepper, Add to Cart, and Buy Now CTAs.",
        "Tabbed Specifications: Overview, Technical Specs, and Verified Customer Reviews form."
    ])

    # ==================== SLIDE 13: Shopping Cart ====================
    s13 = prs.slides.add_slide(blank_layout)
    add_image_slide(s13, "Shopping Cart Architecture & Stock Protection", "12. Cart Subsystem", "05_shopping_cart.png", [
        "Dual State Sync: Context API with localStorage for guests, MongoDB /api/cart for authenticated shoppers.",
        "Free Delivery Meter: Visual progress bar calculating distance to $50 threshold.",
        "Slideover Drawer: 400px desktop tray with backdrop blur for immediate feedback.",
        "Promo Discount: 'SHOPEASE10' coupon code calculator with real-time total rollup."
    ])

    # ==================== SLIDE 14: Checkout & Payments ====================
    s14 = prs.slides.add_slide(blank_layout)
    add_image_slide(s14, "Checkout Pipeline & Payment Simulation", "13. Order Processing", "06_checkout.png", [
        "Two-Column Checkout: Delivery destination inputs alongside real-time line-item review.",
        "Cash on Delivery: Zero pre-payment option with verification upon courier arrival.",
        "Simulated Card Gateway: Clearly labelled sandbox with pre-filled 4242 test card details.",
        "Financial Engine: Automatic calculation of itemsPrice, 5% state tax, and shipping price."
    ])

    # ==================== SLIDE 15: Order Confirmation & Tracking ====================
    s15 = prs.slides.add_slide(blank_layout)
    add_image_slide(s15, "Order Fulfillment & Real-Time Tracking Telemetry", "14. Logistics Telemetry", "07_order_confirmation.png", [
        "Unique Order Number: Cryptographically safe order identifier (e.g. SE-ORD-891024).",
        "Inventory Deduction: Atomic decrement of stockCount preventing overselling.",
        "Milestone Progress Bar: Visual status progression (Placed -> Confirmed -> Shipped -> Delivered).",
        "Order History: Complete customer order archive with package journey logs."
    ])

    # ==================== SLIDE 16: Admin Dashboard ====================
    s16 = prs.slides.add_slide(blank_layout)
    add_image_slide(s16, "Administrator Console & Operational Telemetry", "15. Administrative Management", "11_admin_dashboard.png", [
        "Metric Cards: Aggregated Total Gross Revenue, Total Orders, Catalog SKUs, and Shoppers.",
        "Revenue Chart: Trailing 6-month gross billing vector with hover tooltips.",
        "Low Stock Warnings: Automated alert feed for products with <= 5 available units.",
        "Quick Status Updater: Dropdown allowing one-click transition of order dispatch stages."
    ])

    # ==================== SLIDE 17: Testing & Verification ====================
    s17 = prs.slides.add_slide(blank_layout)
    add_header(s17, "Full-Stack Verification & Testing Report", "16. Quality Assurance")
    add_card(s17, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2), "Automated Testing Results", [
        "Auth Test Suite: 100% Pass (Register, Login, Token Issue, 401 Unauthorized handling).",
        "Catalog Test Suite: 100% Pass (24 products seeded across 6 categories, search, price filter).",
        "Cart Test Suite: 100% Pass (Add item, quantity stepper, stock buffer enforcement).",
        "Order Test Suite: 100% Pass (Atomic stock decrement, cart clearing, order tracking generation)."
    ])
    add_card(s17, Inches(6.9), Inches(1.6), Inches(5.6), Inches(5.2), "Browser Headless Verification", [
        "Headless Microsoft Edge: 14 real application screenshots captured directly on localhost:5173.",
        "Responsive Breakpoints: Validated on Desktop (1440px), Tablet (768px), and Mobile (390px).",
        "Zero Horizontal Overflow: Flexible Tailwind fluid grids adapt seamlessly without clipping.",
        "Console Health: Zero unhandled promise rejections or runtime exceptions."
    ])

    # ==================== SLIDE 18: Syllabus Mapping ====================
    s18 = prs.slides.add_slide(blank_layout)
    add_header(s18, "Full-Stack Curriculum & Syllabus Concept Mapping", "17. Academic Evaluation")
    add_card(s18, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2), "Frontend Syllabus Concepts", [
        "Advanced React: Functional components, JSX, props, controlled forms, conditional rendering.",
        "Hooks & State: useState, useEffect, useContext, useReducer, custom hooks (useAuth, useCart, useProducts, useDebounce).",
        "Client Routing: React Router DOM, dynamic routes (/product/:id), protected route wrappers.",
        "Modern CSS: Tailwind utility classes, CSS variables, Google Fonts, responsive media queries."
    ])
    add_card(s18, Inches(6.9), Inches(1.6), Inches(5.6), Inches(5.2), "Backend & Database Concepts", [
        "Node.js Runtime: Asynchronous event loop, File System module, streams, and EventEmitter.",
        "Express Architecture: Modular routing, REST APIs, Morgan logging, CORS, Multer static uploads.",
        "MongoDB & Mongoose: Schemas, validation, compound indexes, referencing vs embedding, aggregation pipelines.",
        "Web Security: Bcrypt password hashing, JWT stateless bearer authentication, RBAC authorization."
    ])

    # ==================== SLIDE 19: Advantages & Future Scope ====================
    s19 = prs.slides.add_slide(blank_layout)
    add_header(s19, "Advantages, Limitations & Future Scope", "18. Critical Analysis")
    add_card(s19, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2), "Project Advantages", [
        "High Visual Fidelity: Strictly honors the supplied Stitch design specifications.",
        "Production-Grade Architecture: Clean separation of concerns across MVC layers.",
        "Zero-Config Viva Ready: Embedded MongoDB daemon ensures instant execution without setup friction."
    ])
    add_card(s19, Inches(6.9), Inches(1.6), Inches(5.6), Inches(5.2), "Future Roadmap", [
        "Real Merchant Gateway: Direct integration of Stripe webhooks and Apple Pay.",
        "Cloud Asset Storage: Migration of uploads to Amazon S3 or Cloudinary CDN.",
        "AI Semantic Recommendations: Vector embeddings for context-aware product recommendations.",
        "Automated Notifications: Push notifications and SMS order updates via Twilio."
    ])

    # ==================== SLIDE 20: Conclusion ====================
    s20 = prs.slides.add_slide(blank_layout)
    bg20 = s20.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
    bg20.fill.solid()
    bg20.fill.fore_color.rgb = SECONDARY
    bg20.line.fill.background()

    tb20 = s20.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(11.3), Inches(4.0))
    tf20 = tb20.text_frame
    tf20.word_wrap = True

    p_cbadge = tf20.paragraphs[0]
    p_cbadge.text = "PROJECT SUMMARY & VIVA DEMONSTRATION"
    p_cbadge.font.size = Pt(13)
    p_cbadge.font.bold = True
    p_cbadge.font.color.rgb = RGBColor(127, 252, 151)
    p_cbadge.space_after = Pt(14)

    p_cmain = tf20.add_paragraph()
    p_cmain.text = "Thank You! Questions & Live Demonstration"
    p_cmain.font.size = Pt(36)
    p_cmain.font.bold = True
    p_cmain.font.color.rgb = RGBColor(255, 255, 255)
    p_cmain.space_after = Pt(14)

    p_cdesc = tf20.add_paragraph()
    p_cdesc.text = "ShopEase successfully unifies modern software engineering with commercial aesthetic purity.\nFrontend: http://localhost:5173  |  Backend API: http://localhost:5000\nAdmin: admin@shopease.com / admin123  |  Customer: alex@example.com / customer123"
    p_cdesc.font.size = Pt(16)
    p_cdesc.font.color.rgb = RGBColor(200, 210, 230)

    out_pptx = os.path.abspath("deliverables/ShopEase_Presentation.pptx")
    prs.save(out_pptx)
    print(f"Presentation saved successfully at: {out_pptx}")

if __name__ == "__main__":
    create_presentation()

