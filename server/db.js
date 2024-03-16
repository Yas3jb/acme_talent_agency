const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_talent_agency_db"
);

const createTables = async () => {
  const SQL = `
      DROP TABLE IF EXISTS user_skills;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS skills;
      CREATE TABLE users(
        id UUID PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255)
      );
      CREATE TABLE products(
        id UUID PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
      );
      CREATE TABLE favorites(
        id UUID PRIMARY KEY,
        product_id UUID REFERENCES products(id) NOT NULL,
        user_id UUID REFERENCES users(id) NOT NULL,
        CONSTRAINT unique_favorite UNIQUE (product_id, user_id)
      );
    `;
  await client.query(SQL);
};

module.exports = {
  client,
  createTables,
};
