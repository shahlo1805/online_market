SELECT p.id, p.name json_agg(json_built_object("id": c.id, name: c.name)) as subcategories
From categories p LEFT JOIN categories c 
ON c.category_id = p.id
GROUP BY p.id, p.name
HAVING p.category_id IS NULL