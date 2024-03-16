const { client, createTables, createUser, createProduct } = require("./db");

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
  console.log(moe.id);
  console.log(laptop.id);
};
init();
