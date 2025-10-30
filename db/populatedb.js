const {Client} = require('pg')

const SQL = `
  CREATE TABLE IF NOT EXISTS categories(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_name TEXT,
  image_url TEXT
  )

  CREATE TABLE IF NOT EXISTS products(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_name TEXT,
  product_price INTEGER,
  category_id TEXT
  FOREIGN KEY (category_id) REFERENCES categories(id) 
  )
`