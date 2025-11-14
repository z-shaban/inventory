require('dotenv').config();
const {Client} = require('pg')

const SQL = `
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
 

  CREATE TABLE IF NOT EXISTS categories(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_name TEXT,
  category_image TEXT
  );

  CREATE TABLE IF NOT EXISTS products(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_name TEXT,
  product_price NUMERIC,
  category_id INTEGER,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
  );

  INSERT INTO categories (category_name, category_image)
  VALUES 
  ('caramel set', '/images/caramel_set.png'),
  ('hot_chocolate set', '/images/hot_chocolate_set.png'),
  ('luminous radiance set', '/images/luminous_radiance_set.png'),
  ('pearl set', '/images/pearl_set.png'),
  ('sunburn set', '/images/sunburn_set.png');

  INSERT INTO products (product_name, product_price, category_id)
  VALUES 
  ('caramel face toner', 10.99, 1 ),
  ('caramel face cream', 5.99, 1),
  ('hyaluronic serum', 8.99, 1),
  ('shea body wash', 7.99, 2),
  ('silky hot chocolate lotion', 10.99, 2),
  ('chocolate face and body scrub', 8.99, 2),
  ('mulberry face wash', 3.99, 3),
  ('barrier repair face cream', 18.99, 3), 
  ('exfoliating wash', 15.99, 4),
  ('vitamin c facial serum', 6.99, 4),
  ('spf 50 sunscreen', 9.99, 5),
  ('sunburn cleanser', 8.99,5);
`

async function main(){
  console.log('seeding')
  const client = new Client({
    connectionString: process.env.DATABASE_URL || process.env.DB_URL,
      ssl: { rejectUnauthorized: false }
  })

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log('done')
}

main()