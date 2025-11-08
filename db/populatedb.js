require('dotenv').config();
const {Client} = require('pg')

const SQL = `
  
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
  ('caramel_set', '/images/caramel_set.png'),
  ('radiant_set', '/images/radiant_set.png')
`

async function main(){
  console.log('seeding')
  const client = new Client({
    connectionString: process.env.DB_URL
  })

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log('done')
}

main()