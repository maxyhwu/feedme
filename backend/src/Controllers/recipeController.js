// import { Client } from "pg";
import { pool } from "../Clients/pool";
import dotenv from "dotenv-defaults";
dotenv.config();

var conString = process.env.url;

// recipe query
const qeuryByID = async (req, res) => {
  // const client = new Client(conString);

  const { id } = req.query;
  const query = 'SELECT * FROM "Recipes" WHERE id = $1';
  const values = [int(id)];

  try {
    // await client.connect();
    // const { rows } = await client.query(query, values);
    const { rows } = await pool.query(query, values);
    res.send({ rows });
  } catch (err) {
    res.send("fail");
    console.log(err);
  // } finally {
  //   client.end();
  }
};

const qeuryByName = async (req, res) => {
  // const client = new Client(conString);

  const { title } = req.query;
  const query = 'SELECT * FROM "Recipes" WHERE title = $1';
  const values = [str(title)];

  try {
    // await client.connect();
    // const { rows } = await client.query(query, values);
    const { rows } = await pool.query(query, values);
    res.send({ rows });
  } catch (err) {
    res.send("fail");
    console.log(err);
  // } finally {
  //   client.end();
  }
};

const queryByLabel = async (req, res) => {
  // const client = new Client(conString);

  const { label } = req.query;
  const query = 'SELECT * FROM "Recipes" WHERE $1 = ANY(labels)';
  const values = [int(label)];

  try {
    // await client.connect();
    // const { rows } = await client.query(query, values);
    const { rows } = await pool.query(query, values);
    res.send({ rows });
  } catch (err) {
    res.send("fail");
    console.log(err);
  // } finally {
  //   client.end();
  }
};

const queryTopLikeCount = async (req, res) => {
  // const client = new Client(conString);

  const query = 'SELECT * FROM "Recipes" ORDER BY likeCount DESC LIMIT 15';

  try {
    // await client.connect();
    // const { rows } = await client.query(query);
    const { rows } = await pool.query(query);
    res.send({ rows });
  } catch (err) {
    res.send("fail");
    console.log(err);
  // } finally {
  //   client.end();
  }
};

const queryByIngredients = async (req, res) => {
  // const client = new Client(conString);

  const { ingredient } = req.query;
  const query = 'SELECT * FROM "Recipes" WHERE $1 = ANY(ingredients)';
  const values = [int(ingredient)];

  try {
    // await client.connect();
    // const { rows } = await client.query(query, values);
    const { rows } = await pool.query(query, values);

    res.send({ rows });
  } catch (err) {
    res.send("fail");
    console.log(err);
  // } finally {
  //   client.end();
  }
};

// recipe revise
const updateLikeCount = async (req, res) => {
  // const client = new Client(conString);

  const { id } = req.query;
  const query = 'UPDATE "Recipes" SET likeCount = likeCount + 1 WHERE id = $1';
  const values = [int(id)];

  try {
    // await client.connect();
    // await client.query(query, values);
    await pool.query(query, values);

    res.send("success");
  } catch (err) {
    res.send("fail");
    console.log(err);
  // } finally {
  //   client.end();
  }
};

const updateRecipe = async (req, res) => {
  // const client = new Client(conString);

  const { update } = req.query;
  const query =
    'UPDATE "Recipes" SET title = $1, overview = $2, servingSize = $3, instructions = $4, image = $5, video = $6, labels = $7, ingredients = $8 WHERE id = $9';
  const values = [
    str(update.title),
    str(update.overview),
    int(update.servingSize),
    str(update.instructions),
    str(update.image),
    str(update.video),
    add.labels,
    add.ingredients,
    int(id),
  ];

  try {
    // await client.connect();
    // await client.query(query, values);
    await pool.query(query, values);

    res.send("success");
  } catch (err) {
    res.send("fail");
    console.log(err);
  // } finally {
  //   client.end();
  }
};

const addComment = async (req, res) => {
  // const client = new Client(conString);

  const { comment } = req.query;
  const query =
    'UPDATE "Recipes" SET comment = $1 WHERE id = $2';
  const values = [
    comment.comment,
    int(comment.id)
  ];

  try {
    // await client.connect();
    // await client.query(query, values);
    await pool.query(query, values);

    res.send("success");
  } catch (err) {
    res.send("fail");
    console.log(err);
  // } finally {
  //   client.end();
  }
};

// add recipe
const addRecipe = async (req, res) => {
  // const client = new Client(conString);

  const { add } = req.query;
  const query =
    'INSERT INTO "Recipes" ("title", "overview", "servingSize", "instructions", "image", "video", "likeCount", "labels", "ingredients", "comments") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, DEFAULT)';
  const values = [
    str(add.title),
    str(add.overview),
    int(add.servingSize),
    str(add.instructions),
    str(add.image),
    str(add.video),
    int(add.likeCount),
    add.labels,
    add.ingredients,
  ];
  try {
    // await client.connect();
    // await client.query(query, values);
    await pool.query(query, values);

    res.send("success");
  } catch (err) {
    res.send("fail");
    console.log(err);
  // } finally {
  //   client.end();
  }
};

export {
  qeuryByID,
  qeuryByName,
  queryByLabel,
  queryTopLikeCount,
  queryByIngredients,
  updateLikeCount,
  updateRecipe,
  addComment,
  addRecipe,
};
