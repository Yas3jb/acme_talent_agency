const {
  client,
  createTables,
  createUser,
  createProduct,
  createFavorite,
  fetchUsers,
  fetchProducts,
  fetchFavorite,
  deleteFavorite,
} = require("./db");

// import express
const express = require("express");
const app = express();

// GET - users
app.get("/api/users", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (ex) {
    next(ex);
  }
});

// GET - products
app.get("/api/products", async (req, res, next) => {
  try {
    res.send(await fetchProducts());
  } catch (ex) {
    next(ex);
  }
});

// GET - user favorite by ID
app.get("/api/users/:id/favorites", async (req, res, next) => {
  try {
    res.send(await fetchFavorite(req.params.id));
  } catch (ex) {
    next(ex);
  }
});

const init = async () => {
  await client.connect();
  console.log("connected to database");
  await createTables();
  console.log("tables created");
  const [moe, lucy, ethyl, tablet, laptop, smartphone, smartwatch] =
    await Promise.all([
      createUser({ username: "moe", password: "s3cr3t" }),
      createUser({ username: "lucy", password: "s3cr3t!!" }),
      createUser({ username: "ethyl", password: "shhh" }),
      createProduct({ name: "laptop" }),
      createProduct({ name: "smartphone" }),
      createProduct({ name: "smartwatch" }),
      createProduct({ name: "tablet" }),
    ]);
  const users = await fetchUsers();
  console.log(users);

  const products = await fetchProducts();
  console.log(products);

  const favorite = await Promise.all([
    createFavorite({ user_id: moe.id, product_id: laptop.id }),
    createFavorite({ user_id: moe.id, product_id: smartphone.id }),
    createFavorite({ user_id: ethyl.id, product_id: smartwatch.id }),
    createFavorite({ user_id: lucy.id, product_id: tablet.id }),
  ]);

  console.log(await fetchFavorite(moe.id));
  await deleteFavorite(favorite[0].id);
  console.log(await fetchFavorite(moe.id));

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};
init();
