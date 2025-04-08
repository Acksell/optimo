---- Drop existing tables, not sure if needed since this only runs on init
DROP TABLE IF EXISTS purchase_orders;
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS products;

----- Create tables. SHOULD BE IN SYNC WITH gen/schema.sql
-- Products being sold/tracked
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100) UNIQUE,
    brand VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales records
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    sale_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchase orders (one per supplier)
CREATE TABLE purchase_orders (
    id SERIAL PRIMARY KEY,
    -- just a string, not a foreign key for now. 
    supplier_id VARCHAR(255) NOT NULL,
    order_date DATE NOT NULL,
    estimated_delivery_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- assume a PO can only contain a single product
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0)
);

---- Seed data
-- Seed products
INSERT INTO products (name, sku, brand) VALUES
('Boxy Fit T-Shirt', 'OL-TSH-001', 'Our Legacy'),
('Relaxed Fit Jeans', 'NJ-JNS-002', 'Nudie Jeans'),
('Oversized Hoodie', 'OL-HDY-003', 'Our Legacy');

-- Seed sales
INSERT INTO sales (product_id, quantity, sale_date) VALUES
(1, 10, '2024-12-01'),
(1, 5, '2025-01-15'),
(2, 7, '2025-01-20'),
(3, 3, '2025-02-05'),
(2, 9, '2025-03-02'),
(1, 4, '2025-03-12');

-- Seed purchase orders
INSERT INTO purchase_orders (supplier_id, order_date, estimated_delivery_date, product_id, quantity) VALUES
('Nordic Textiles AB', '2025-01-10', '2025-01-25', 1, 50),
('Thread & Co', '2025-02-15', '2025-03-01', 3, 40),
('Thread & Co', '2025-03-05', '2025-03-20', 2, 30);
