export const productTableModel = `
CREATE TABLE IF NOT EXISTS products (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
category_id INT REFERENCES categories(id)
ON DELETE CASCADE
ON UPDATE NO ACTION,
price INT,
count INT DEFAULT 1     
);
`            