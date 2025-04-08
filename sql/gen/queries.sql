-- Sales per month (aggregated)
-- name: MonthSales :many
SELECT
    DATE_TRUNC('month', sale_date) AS month,
    product_id,
    SUM(quantity) AS total_quantity
FROM sales
GROUP BY month, product_id
ORDER BY month, product_id;


-- Sales per month (aggregated) filtered by product IDs
-- name: MonthSalesFiltered :many
SELECT
    DATE_TRUNC('month', sale_date) AS month,
    product_id,
    SUM(quantity) AS total_quantity
FROM sales
WHERE product_id = ANY (UNNEST($1::int[]))
GROUP BY month, product_id
ORDER BY month, product_id;

-- List all purchase orders with key details
-- name: ListPurchaseOrders :many
SELECT
    po.id,
    po.supplier_id,
    po.order_date,
    po.estimated_delivery_date,
    po.quantity,
    p.name AS product_name,
    p.brand AS product_brand,
    po.created_at
FROM purchase_orders po
JOIN products p ON po.product_id = p.id
ORDER BY po.order_date DESC;


-- Insert a new purchase order
-- name: CreatePurchaseOrder :exec
INSERT INTO purchase_orders (
    supplier_id,
    order_date,
    estimated_delivery_date,
    product_id,
    quantity
) VALUES (
    $1,       -- supplier_id
    $2,        -- order_date
    $3,        -- estimated_delivery_date
    $4,                   -- product_id
    $5                  -- quantity
);

-- name: DeletePurchaseOrder :exec
DELETE FROM purchase_orders
WHERE id = $1;