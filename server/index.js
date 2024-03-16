const {
  client,
  createTables,
  createUser,
  createProduct,
  fetchUsers,
  fetchProducts,
} = require("./db");

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
};
init();
