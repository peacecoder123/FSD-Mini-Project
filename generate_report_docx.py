import os
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), fill_hex)
    tcPr.append(shd)

def create_report():
    doc = Document()

    # Page Margins
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)

    # Styles
    PRIMARY_COLOR = RGBColor(0, 74, 198)     # #004ac6
    SECONDARY_COLOR = RGBColor(19, 27, 46)   # #131b2e
    MUTED_COLOR = RGBColor(115, 118, 134)    # #737686

    # ==================== COVER PAGE ====================
    title_p = doc.add_paragraph()
    title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title_p.paragraph_format.space_before = Pt(40)
    title_p.paragraph_format.space_after = Pt(10)
    run_title = title_p.add_run("ShopEase – A Modern Full-Stack E-Commerce Platform")
    run_title.font.name = "Arial"
    run_title.font.size = Pt(26)
    run_title.font.bold = True
    run_title.font.color.rgb = PRIMARY_COLOR

    sub_p = doc.add_paragraph()
    sub_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    sub_p.paragraph_format.space_after = Pt(40)
    run_sub = sub_p.add_run("ACADEMIC MINI-PROJECT COMPREHENSIVE TECHNICAL REPORT\nFull-Stack Development (FSD) Laboratory")
    run_sub.font.name = "Arial"
    run_sub.font.size = Pt(13)
    run_sub.font.bold = True
    run_sub.font.color.rgb = SECONDARY_COLOR

    # Embed Screenshot on Cover if available
    img_cover = os.path.abspath("screenshots/01_homepage.png")
    if os.path.exists(img_cover):
        img_p = doc.add_paragraph()
        img_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        img_p.paragraph_format.space_after = Pt(30)
        doc.add_picture(img_cover, width=Inches(5.5))

    meta_p = doc.add_paragraph()
    meta_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    meta_p.paragraph_format.space_before = Pt(30)
    meta_p.add_run("Submitted in partial fulfillment of the requirements for the degree of\n").font.size = Pt(11)
    r_deg = meta_p.add_run("BACHELOR OF TECHNOLOGY / COMPUTER ENGINEERING\n\n")
    r_deg.font.bold = True
    r_deg.font.size = Pt(12)

    student_p = doc.add_paragraph()
    student_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    student_p.add_run("Submitted By:\n").font.bold = True
    student_p.add_run("[STUDENT NAME: _______________________]  (Roll No: ______________)\n")
    student_p.add_run("[STUDENT NAME: _______________________]  (Roll No: ______________)\n\n")
    student_p.add_run("Under the Guidance of:\n").font.bold = True
    student_p.add_run("[FACULTY GUIDE NAME & DESIGNATION]\n")
    student_p.add_run("[DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING]\n")
    student_p.add_run("[INSTITUTION / UNIVERSITY NAME]\nAcademic Year 2026–2027\n")

    doc.add_page_break()

    # ==================== CERTIFICATE ====================
    h1 = doc.add_heading("CERTIFICATE OF APPROVAL", level=1)
    h1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    h1.runs[0].font.color.rgb = PRIMARY_COLOR

    cert_p = doc.add_paragraph()
    cert_p.paragraph_format.space_before = Pt(20)
    cert_p.paragraph_format.line_spacing = 1.3
    cert_p.add_run(
        "This is to certify that the project entitled \"ShopEase – A Modern Full-Stack E-Commerce Platform\" "
        "is a bonafide work carried out by [Student Name(s), Roll No(s)] in partial fulfillment for the award of "
        "Bachelor of Technology in Computer Engineering during the academic year 2026–2027. "
        "The project demonstrates a production-grade, database-driven MERN application implementing "
        "JWT authentication, role-based access control, responsive UI/UX fidelity, real-time inventory tracking, "
        "and RESTful web services."
    )

    doc.add_paragraph("\n\n\n")
    sig_table = doc.add_table(rows=1, cols=2)
    sig_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    sig_table.rows[0].cells[0].paragraphs[0].add_run("________________________\nInternal Project Guide\nDepartment of CSE").font.size = Pt(10)
    sig_table.rows[0].cells[1].paragraphs[0].add_run("________________________\nHead of Department\nDepartment of CSE").font.size = Pt(10)
    sig_table.rows[0].cells[1].paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.RIGHT

    doc.add_page_break()

    # ==================== ACKNOWLEDGEMENT ====================
    h_ack = doc.add_heading("ACKNOWLEDGEMENT", level=1)
    h_ack.alignment = WD_ALIGN_PARAGRAPH.CENTER
    h_ack.runs[0].font.color.rgb = PRIMARY_COLOR

    ack_p = doc.add_paragraph()
    ack_p.paragraph_format.space_before = Pt(20)
    ack_p.paragraph_format.line_spacing = 1.3
    ack_p.add_run(
        "We express our profound gratitude to our project guide [Guide Name] and Head of the Department [HOD Name] "
        "for their invaluable guidance, constructive critique, and steadfast encouragement throughout this endeavor. "
        "We also extend sincere thanks to our institution for providing the high-performance computing facilities and "
        "development environments essential to successfully engineer the ShopEase platform."
    )

    doc.add_page_break()

    # ==================== ABSTRACT ====================
    h_abs = doc.add_heading("ABSTRACT", level=1)
    h_abs.alignment = WD_ALIGN_PARAGRAPH.CENTER
    h_abs.runs[0].font.color.rgb = PRIMARY_COLOR

    abs_p = doc.add_paragraph()
    abs_p.paragraph_format.space_before = Pt(20)
    abs_p.paragraph_format.line_spacing = 1.3
    abs_p.add_run(
        "Modern consumer e-commerce systems require high-trust visual polish, instantaneous search and filter responsiveness, "
        "and reliable distributed transaction handling. \"ShopEase\" is an academic full-stack e-commerce platform built "
        "using React (Vite), Node.js, Express, MongoDB (Mongoose), and Tailwind CSS. Faithfully implementing an editorial design "
        "system characterized by high-contrast typography (Plus Jakarta Sans), 8pt spatial rhythm, and tactile micro-interactions, "
        "the application delivers end-to-end commercial capabilities. Core modules include role-based JWT authentication, "
        "multi-attribute catalog browsing (search, category, price range, and sort filters), shopping cart persistence, "
        "transactional order processing with inventory stock checks, simulated online payment gateway integration, "
        "and an administrative management portal featuring visual telemetry, low-stock alerts, and Multer-powered image asset pipelines. "
        "All syllabus concepts of Full-Stack Web Development are comprehensively addressed, verified through unit and integration testing."
    )

    doc.add_page_break()

    # ==================== TABLE OF CONTENTS ====================
    h_toc = doc.add_heading("TABLE OF CONTENTS", level=1)
    h_toc.runs[0].font.color.rgb = PRIMARY_COLOR

    toc_items = [
        ("1. Introduction & Background", "1"),
        ("2. Problem Statement & Objectives", "3"),
        ("3. Literature Survey & Existing System Analysis", "5"),
        ("4. System Requirements Specification (SRS)", "7"),
        ("5. Technology Stack Architecture", "9"),
        ("6. System Design & Architectural Diagrams (DFD, Use Case, ER)", "12"),
        ("7. Database Design & Mongoose Schemas", "16"),
        ("8. Module Implementation Details", "20"),
        ("9. RESTful API Specification", "25"),
        ("10. Testing Methodology & Verification Report", "29"),
        ("11. Implementation Screenshots & Visual Walkthrough", "33"),
        ("12. Syllabus Concept Mapping", "38"),
        ("13. Advantages, Limitations & Future Scope", "40"),
        ("14. Conclusion", "42"),
        ("15. References & Webography", "43"),
    ]

    toc_table = doc.add_table(rows=len(toc_items), cols=2)
    toc_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    for idx, (title, page_no) in enumerate(toc_items):
        row = toc_table.rows[idx]
        row.cells[0].paragraphs[0].add_run(title).font.size = Pt(11)
        row.cells[1].paragraphs[0].add_run(page_no).font.size = Pt(11)
        row.cells[1].paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.RIGHT

    doc.add_page_break()

    # ==================== CHAPTERS ====================
    def add_chapter(title, content_paras):
        ch_h = doc.add_heading(title, level=1)
        ch_h.runs[0].font.color.rgb = PRIMARY_COLOR
        for p_text in content_paras:
            p = doc.add_paragraph()
            p.paragraph_format.line_spacing = 1.2
            p.paragraph_format.space_after = Pt(8)
            p.add_run(p_text)

    # 1. Introduction
    add_chapter("1. Introduction & Background", [
        "In the contemporary software ecosystem, electronic commerce has transitioned from functional static catalogs into high-performance, real-time web applications. Consumers expect zero-latency catalog filtering, instantaneous feedback on checkout operations, transparent package telemetry, and consistent visual clarity across mobile and desktop devices.",
        "ShopEase was conceived as a comprehensive academic mini-project designed to bridge commercial UI/UX design fidelity with modern full-stack software architecture. Developed on the MERN stack (MongoDB, Express, React, Node.js), ShopEase incorporates enterprise engineering practices including stateless tokenized authorization (JWT), centralized asynchronous error middleware, multi-level component state modeling, and reactive event-driven decoupling via Node.js EventEmitters."
    ])

    # 2. Problem Statement
    add_chapter("2. Problem Statement & Objectives", [
        "Problem Statement: Many academic e-commerce implementations suffer from significant disconnects between visual design specifications and back-end implementation. Common shortcomings include generic UI templates, non-persistent cart sessions, lack of inventory race-condition protection, and simulated authentication that fails to reflect real-world token lifecycles.",
        "Project Objectives:",
        "1. Visual Fidelity: Faithfully realize the supplied Stitch design system featuring Plus Jakarta Sans typography, slate canvases, and tactile micro-interactions.",
        "2. Robust Full-Stack Engineering: Deliver end-to-end commercial workflows covering customer registration, persistent shopping carts, inventory-safe order booking, and review submission.",
        "3. Administrative Control: Provide comprehensive administrative telemetry, including revenue aggregation, low-stock detection, and operational status controls.",
        "4. Academic Syllabus Demonstration: Fully instantiate syllabus competencies including Node.js event loops, Express routing, MongoDB aggregation, React custom hooks, and REST APIs."
    ])

    # 3. Existing System vs Proposed System
    add_chapter("3. Literature Survey & Comparative Analysis", [
        "Existing System Analysis: Traditional basic PHP/MySQL or simple static HTML e-commerce student projects exhibit full page reloads, coupled database logic inside view scripts, vulnerable plain-text credentials, and unresponsive desktop-only table grids.",
        "Proposed System Advantages: ShopEase deploys a decoupled Client-Server REST architecture. React Router provides single-page application (SPA) fluid navigation without page reloads. Bcrypt provides irreversible password hashing. Mongoose ensures strict schema enforcement and indexing. The UI adopts an 8pt responsive grid with mobile drawers and desktop sticky sidebars."
    ])

    # 4. System Requirements
    add_chapter("4. System Requirements Specification (SRS)", [
        "Hardware Requirements:",
        "• Processor: Intel Core i3 / AMD Ryzen 3 or higher (Dual-Core 2.0 GHz+).",
        "• Memory (RAM): Minimum 4 GB (8 GB recommended for concurrent dev servers).",
        "• Storage: 500 MB free hard disk space for code repositories, node_modules, and embedded database.",
        "• Network: Standard TCP/IP connection on localhost ports 5000 and 5173.",
        "Software Requirements:",
        "• Operating System: Windows 10/11, macOS, or Linux.",
        "• Runtime Environment: Node.js v18.0.0 or higher (v24.20.0 utilized).",
        "• Package Manager: NPM v9.0.0+ (v11.19.0 utilized).",
        "• Database Engine: MongoDB 6.0+ / MongoMemoryServer 10.x embedded daemon.",
        "• Modern Web Browser: Microsoft Edge, Google Chrome, or Mozilla Firefox supporting ES6+."
    ])

    # 5. Technology Stack
    add_chapter("5. Technology Stack Architecture", [
        "Frontend Tier: React 19, Vite 8, Tailwind CSS, Material Symbols Outlined, Lucide React, and React Router DOM v7.",
        "Backend Tier: Node.js runtime, Express.js REST application framework, Morgan HTTP logger, CORS, Dotenv, and Multer for disk storage uploads.",
        "Data Tier: MongoDB document-oriented NoSQL database with Mongoose ODM modeling, timestamps, compound indexes, and aggregation pipelines.",
        "Security: JSON Web Tokens (JWT) signed with HMAC-SHA256, Bcrypt password hashing (10 salt rounds), and role-based route guard middleware."
    ])

    # 6. Design Diagrams (DFD, Use Case, ER)
    add_chapter("6. System Design & Architectural Diagrams", [
        "Data Flow Diagram (DFD Level 0 - Context Level):",
        "The external entities (Customer, Administrator) interact with the central ShopEase Process. Customers supply registration details, filter queries, cart items, and payment credentials; receiving catalog data, order receipts, and tracking steps. Administrators submit product definitions, stock adjustments, and status changes; receiving aggregated analytics and user logs.",
        "Data Flow Diagram (DFD Level 1 - Detailed Functional Processes):",
        "• Process 1.0: Authentication & Session Service (Validates email/password, issues JWT).",
        "• Process 2.0: Product & Inventory Service (Executes multi-field text search, price bounds, stock decrement).",
        "• Process 3.0: Cart Management Service (Maintains persisted session state, calculates taxes and shipping).",
        "• Process 4.0: Order Fulfillment & Payment Simulation (Generates order numbers, commits transactional records).",
        "• Process 5.0: Telemetry & Admin Analytics (Executes MongoDB grouping for monthly revenue and stock warnings).",
        "Entity Relationship (ER) Conceptual Architecture:",
        "• USER (1) ──has── (1) CART",
        "• USER (1) ──places── (N) ORDERS",
        "• USER (1) ──writes── (N) REVIEWS",
        "• PRODUCT (1) ──receives── (N) REVIEWS",
        "• ORDER (1) ──contains── (N) ORDER_ITEMS ──references── (1) PRODUCT"
    ])

    # 7. Database Design
    add_chapter("7. Database Design & Mongoose Schemas", [
        "Data Dictionary & Model Schema Specifications:",
        "1. User Schema: _id (ObjectId), name (String, req), email (String, req, unique, index), password (String, req, bcrypt hashed), role (String: 'customer'|'admin'), phone (String), address (Subdoc: street, city, state, postalCode, country), createdAt/updatedAt (Date).",
        "2. Product Schema: _id (ObjectId), title (String, req), brand (String, req), sku (String, req, unique), category (String, req, index), description (String, req), price (Number, req), originalPrice (Number), discountPercent (Number), stockCount (Number, req), inStock (Boolean), rating (Number), numReviews (Number), features ([String]), images ([String], req), isFeatured (Boolean), isBestSeller (Boolean).",
        "3. Cart Schema: _id (ObjectId), user (ObjectId ref User, unique), items ([{ product ref Product, title, image, price, quantity }]), subtotal (Number), shipping (Number), total (Number).",
        "4. Order Schema: _id (ObjectId), user (ObjectId ref User, index), orderNumber (String, req, unique), items ([OrderItemSubdoc]), shippingAddress (AddressSubdoc), paymentMethod (String: 'cod'|'card_simulated'), paymentResult (PaymentSubdoc), itemsPrice (Number), taxPrice (Number), shippingPrice (Number), totalPrice (Number), isPaid (Boolean), isDelivered (Boolean), status (String: 'Processing'|'Confirmed'|'Shipped'|'Delivered'|'Cancelled'), trackingSteps ([{ status, timestamp, note }]).",
        "5. Review Schema: _id (ObjectId), product (ObjectId ref Product, index), user (ObjectId ref User), userName (String), rating (Number 1-5), comment (String), createdAt (Date). Compound Unique Index: { product: 1, user: 1 }."
    ])

    # 8. Module Implementation
    add_chapter("8. Module Implementation Details", [
        "Authentication Module: Implements register and login controllers with bcrypt comparison. Emits custom 'user:registered' events via Node.js EventEmitter for decoupled email notification queuing.",
        "Catalog & Filtering Module: Uses MongoDB regular expressions and bounding operators to power real-time multi-facet filtering. Sorts by featured status, ascending/descending prices, or rating tally.",
        "Shopping Cart & Inventory Safe Checkout: Protects against out-of-stock scenarios by performing atomic database stock decrement ($inc: { stockCount: -item.quantity }) upon order placement. Implements free shipping thresholds ($50) and dynamic 5% tax calculations.",
        "Admin Portal & File Uploads: Employs Multer storage middleware with regex mimetype verification (JPEG, PNG, WEBP, SVG) to store assets safely in /uploads, served statically through Express."
    ])

    # 9. API Specification Table
    add_chapter("9. RESTful API Specification", [
        "Summary of core exposed application endpoints:",
        "• POST /api/auth/register - Register customer / admin account",
        "• POST /api/auth/login - Authenticate credentials & return JWT",
        "• GET /api/auth/me - Retrieve current authenticated profile",
        "• GET /api/products - Query catalog with search, category, sort, and pagination",
        "• GET /api/products/:id - Fetch single product and customer reviews",
        "• POST /api/products - Create new product (Admin authorization required)",
        "• PUT /api/products/:id - Update product details (Admin required)",
        "• DELETE /api/products/:id - Remove product (Admin required)",
        "• POST /api/products/:id/reviews - Submit verified rating and review",
        "• GET /api/cart - Fetch current user's persisted cart",
        "• POST /api/cart - Add item or increment quantity",
        "• PUT /api/cart/:itemId - Update item quantity",
        "• DELETE /api/cart/:itemId - Remove item from cart",
        "• POST /api/orders - Commit order, verify inventory, decrement stock",
        "• GET /api/orders/my-orders - Retrieve customer order history",
        "• GET /api/orders/:id - Retrieve order details and package tracking timeline",
        "• GET /api/admin/dashboard - Aggregated financial metrics and low-stock telemetry",
        "• PATCH /api/admin/orders/:id/status - Progress order through dispatch milestones",
        "• POST /api/upload - Multer multipart image asset uploader"
    ])

    # 10. Testing Methodology
    add_chapter("10. Testing Methodology & Verification Report", [
        "Testing Strategy: A comprehensive multi-tier testing procedure was conducted covering Unit, Integration, Security, and UI Responsiveness.",
        "Test Suite 1: Authentication & Authorization: Verified successful registration, duplicate email rejection (HTTP 400), invalid password rejection (HTTP 401), and administrative route barrier enforcement (HTTP 403 on non-admin token).",
        "Test Suite 2: Product Catalog & Search: Validated multi-term keyword search, price range filtering ($50 - $200), in-stock toggle behavior, and pagination page-slice accuracy.",
        "Test Suite 3: Cart & Order Booking: Validated quantity addition limits against database stockCount, free shipping rule threshold ($50.00), automatic cart flushing upon order creation, and stock decrement accuracy.",
        "Test Suite 4: Visual & Responsive QA: Headless browser automation verified that layouts across 1440px desktop, 768px tablet, and 390px mobile viewports render without horizontal overflow, clipped controls, or typography distortions."
    ])

    # 11. Screenshots Walkthrough
    h_ss = doc.add_heading("11. Implementation Screenshots & Visual Walkthrough", level=1)
    h_ss.runs[0].font.color.rgb = PRIMARY_COLOR

    screenshots_to_embed = [
        ("01_homepage.png", "Figure 11.1: ShopEase Flagship Homepage showcasing Hero Section, Plus Jakarta Sans typography, and Value Proposition Ribbon."),
        ("02_catalog_products.png", "Figure 11.2: Product Catalog Showcase featuring 4-column responsive grid and sticky left facet filters."),
        ("03_product_details.png", "Figure 11.3: Product Detail View with interactive thumbnail gallery, 360° Studio badge, and Buy Box."),
        ("05_shopping_cart.png", "Figure 11.4: Shopping Bag breakdown with item steppers and free shipping progress meter."),
        ("06_checkout.png", "Figure 11.5: Secure Checkout Form with Delivery Destination and Simulated Card Payment sandbox."),
        ("07_order_confirmation.png", "Figure 11.6: Transaction Confirmation with live Order Dispatch Tracker timeline."),
        ("09_login.png", "Figure 11.7: Member Sign-In with Academic Viva quick demo credential buttons."),
        ("11_admin_dashboard.png", "Figure 11.8: Administrator Console featuring Revenue Growth Vector, Metrics Cards, and Low Stock Alerts."),
        ("14_mobile_responsive.png", "Figure 11.9: Mobile Breakpoint Viewport (390x844) validating responsive layout discipline.")
    ]

    for fname, caption in screenshots_to_embed:
        fpath = os.path.abspath(os.path.join("screenshots", fname))
        if os.path.exists(fpath):
            p_img = doc.add_paragraph()
            p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_img.paragraph_format.space_before = Pt(10)
            doc.add_picture(fpath, width=Inches(5.6))
            p_cap = doc.add_paragraph()
            p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_cap.paragraph_format.space_after = Pt(14)
            run_cap = p_cap.add_run(caption)
            run_cap.font.size = Pt(9.5)
            run_cap.font.italic = True
            run_cap.font.color.rgb = MUTED_COLOR

    # 12. Syllabus Mapping
    add_chapter("12. Syllabus Concept Mapping", [
        "The ShopEase architecture maps 100% to the prescribed university syllabus for Full-Stack Development:",
        "1. Advanced JavaScript & ES6+: Arrow functions, destructuring, promises, async/await, array higher-order methods (.map, .filter, .reduce).",
        "2. React Core Concepts: Functional components, JSX syntax, props drilling mitigation, useState, useEffect, useContext, useReducer, custom hooks (useAuth, useCart, useProducts, useDebounce).",
        "3. Client Routing: React Router DOM, dynamic route parameters (:id), protected route wrappers, and navigation guards.",
        "4. Node.js Architecture: Non-blocking event loop, asynchronous I/O, File System module, streams, and EventEmitter architecture.",
        "5. Express Framework: Routing, custom error handling middleware, JWT authentication middleware, CORS configuration, and static file hosting.",
        "6. NoSQL & MongoDB: Mongoose ODM schemas, pre-save middleware hooks, validation rules, text indexes, relationships (referencing and embedding), and data aggregation.",
        "7. Web Security: Password encryption using bcrypt salt rounds, secure token signing via JWT, and cross-origin resource sharing protection."
    ])

    # 13. Advantages & Future Scope
    add_chapter("13. Advantages, Limitations & Future Scope", [
        "Advantages: Pristine editorial design language matching modern commercial standards; high performance single-page application experience; safe stock allocation; embedded zero-configuration database fallback for flawless viva demonstrations.",
        "Limitations: Simulated online payment instead of real production merchant banking credentials; local file upload storage rather than AWS S3/Cloudinary object buckets.",
        "Future Scope: Integration of production Stripe/PayPal webhooks; automated customer SMS alerts via Twilio; AI-powered semantic search and recommendation engines; migration to multi-region cloud cluster deployment."
    ])

    # 14. Conclusion
    add_chapter("14. Conclusion", [
        "The ShopEase project demonstrates the successful conception, design, and full-stack realization of a modern e-commerce platform. By strictly prioritizing the visual identity, typography, and component hierarchy provided in the primary design reference while architecting a robust MERN backend, the project achieves an optimal harmony between commercial visual elegance and technical software reliability. It stands as a complete, fully verified submission for academic examination, practical laboratory evaluation, and technical portfolio demonstration."
    ])

    # 15. References
    add_chapter("15. References & Webography", [
        "1. Martin, Robert C. Clean Architecture: A Craftsman's Guide to Software Structure and Design. Prentice Hall, 2017.",
        "2. Kleppmann, Martin. Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems. O'Reilly Media, 2017.",
        "3. React Documentation - https://react.dev",
        "4. Express.js API Reference - https://expressjs.com",
        "5. MongoDB & Mongoose Manuals - https://mongoosejs.com",
        "6. Tailwind CSS Framework Guidelines - https://tailwindcss.com",
        "7. Material Symbols & Google Fonts - https://fonts.google.com"
    ])

    out_docx = os.path.abspath("deliverables/ShopEase_Project_Report.docx")
    doc.save(out_docx)
    print(f"Report saved successfully at: {out_docx}")

if __name__ == "__main__":
    create_report()

