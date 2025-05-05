export const orderModel = `
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_price NUMERIC NOT NULL,
  status VARCHAR(20) DEFAULT 'pending'
);
`