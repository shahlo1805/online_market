export const categoryTableModel = `
CREATE TABLE IF NOT EXISTS categories (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
image_url VARCHAR(255),
category_id INT REFERENCES categories(id)
ON DELETE CASCADE
ON UPDATE NO ACTION     
);
`            