export const orderItemsModel = `
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  product_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  price NUMERIC NOT NULL
);
`