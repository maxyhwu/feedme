import { pool } from "../Clients/pool";
import dotenv from "dotenv-defaults";
import { uploads } from "../Config/cloudinary";
import fs from "fs";
dotenv.config();

// recipe query
const qeuryByID = async (req, res) => {
  const { id } = req.query;
  const query =
    `SELECT "Recipes"."id", title, overview, "Recipes"."servingSize", instructions, image, video, "Recipes"."likeCount", labels, ingredients, comments, "Recipes"."createdAt", "Recipes"."updatedAt", "userName" FROM "Recipes", "Users" WHERE "Recipes".id = $1`;
  const values = [parseInt(id)];

  try {
    const { rows } = await pool.query(query, values);
    res.send({ rows });
  } catch (err) {
    res.send("fail");
    console.log(err);
  }
};

const qeuryByName = async (req, res) => {
  const { title } = req.query;
  const query =
    `SELECT "Recipes"."id", title, overview, "Recipes"."servingSize", instructions, image, video, "Recipes"."likeCount", labels, ingredients, comments, "Recipes"."createdAt", "Recipes"."updatedAt", "userName" FROM "Recipes", "Users" WHERE LOWER("Recipes"."title") LIKE LOWER($1)`;
  const values = [`%${title.toString()}%`];

  try {
    const { rows } = await pool.query(query, values);
    res.send({ rows });
  } catch (err) {
    res.send("fail");
    console.log(err);
  }
};

const queryByLabel = async (req, res) => {
  const { label } = req.query;
  const query =
    `SELECT "Recipes"."id", title, overview, "Recipes"."servingSize", instructions, image, video, "Recipes"."likeCount", labels, ingredients, comments, "Recipes"."createdAt", "Recipes"."updatedAt", "userName" FROM "Recipes", "Users" WHERE $1 = ANY("Recipes"."labels")`;
  const values = [parseInt(label)];

  try {
    const { rows } = await pool.query(query, values);
    res.send({ rows });
  } catch (err) {
    res.send("fail");
    console.log(err);
  }
};

const queryTopLikeCount = async (req, res) => {
  const { page } = req.query;
  const query =
    `SELECT "Recipes"."id", title, overview, "Recipes"."servingSize", instructions, image, video, "Recipes"."likeCount", labels, ingredients, comments, "Recipes"."createdAt", "Recipes"."updatedAt", "userName" FROM "Recipes", "Users" ORDER BY "likeCount" DESC OFFSET $1 ROWS FETCH NEXT 15 ROWS ONLY`;
  const values = [(parseInt(page) - 1) * 15];

  try {
    const { rows } = await pool.query(query, values);
    res.send({ rows });
  } catch (err) {
    res.send("fail");
    console.log(err);
  }
};

const queryByIngredients = async (req, res) => {
  const { ingredient } = req.query;
  const query =
    `SELECT "Recipes"."id", title, overview, "Recipes"."servingSize", instructions, image, video, "Recipes"."likeCount", labels, ingredients, comments, "Recipes"."createdAt", "Recipes"."updatedAt", "userName" FROM "Recipes", "Users" WHERE EXISTS (SELECT 1 FROM json_each(ingredients) AS i WHERE (i.key::int)::text IN (SELECT unnest($1::text[]))) ORDER BY (SELECT COUNT(*) FROM json_object_keys(ingredients) AS keys WHERE (keys::int)::text IN (SELECT unnest($1::text[]))) DESC`;
  const values = [JSON.parse(ingredient)];

  try {
    const { rows } = await pool.query(query, values);
    res.send({ rows });
  } catch (err) {
    res.send("fail");
    console.log(err);
  }
};

const queryByUser = async (req, res) => {
  const Uid = req.user;
  const query =
    `SELECT "Recipes"."id", title, overview, "Recipes"."servingSize", instructions, image, video, "Recipes"."likeCount", labels, ingredients, comments, "Recipes"."createdAt", "Recipes"."updatedAt", "userName" FROM "Recipes", "Users" WHERE "userID" = $1`;
  const values = [parseInt(Uid.id)];

  try {
    const { rows } = await pool.query(query, values);
    res.send({ rows });
  } catch (err) {
    res.send("fail");
    console.log(err);
  }
};

// recipe update
const updateAddLikeCount = async (req, res) => {
  const { Rid } = req.body;
  const query =
    `UPDATE "Recipes" SET "likeCount" = "likeCount" + 1 WHERE id = $1`;
  const values = [parseInt(Rid)];

  try {
    await pool.query(query, values);
    res.send("success");
  } catch (err) {
    res.send("fail");
    console.log(err);
  }
};

const updateMinusLikeCount = async (req, res) => {
  const { Rid } = req.body;
  const query =
    `UPDATE "Recipes" SET "likeCount" = "likeCount" - 1 WHERE id = $1`;
  const values = [parseInt(Rid)];

  try {
    await pool.query(query, values);
    res.send("success");
  } catch (err) {
    res.send("fail");
    console.log(err);
  }
};

const updateRecipe = async (req, res) => {
  const {
    title,
    overview,
    servingSize,
    instructions,
    video,
    labels,
    ingredients,
    id,
  } = req.body;
  const user = req.user;
  const file = req.file;
  const { path } = file;
  const newPath = await uploaderImage(path);
  let url = newPath;
  fs.unlinkSync(path);
  const query =
    `UPDATE "Recipes" SET "title" = $1, "overview" = $2, "servingSize" = $3, "instructions" = $4, "image" = $5, "imagePID" = $6, "video" = $7, "labels" = $8, "ingredients" = $9 WHERE "id" = $10 and "userID" = $11`;
  const values = [
    title.toString(),
    overview.toString(),
    parseInt(servingSize),
    JSON.parse(instructions),
    url.url,
    url.id,
    video.toString(),
    JSON.parse(labels),
    JSON.parse(ingredients),
    parseInt(id),
    user.id,
  ];
  try {
    await pool.query(query, values);
    res.send("success");
  } catch (err) {
    res.send("fail");
    console.log(err);
  }
};

const getCommentUserData = async (req, res) => {
  const query = `SELECT "photo", "userName" FROM "Users" WHERE "id" = $1`;
  try {
    const { id } = req.query;
    const values = [parseInt(id)];
    const { rows } = await pool.query(query, values);
    if (rows) {
      res.status(200).send(rows);
    } else {
      res.status(400).send({ message: "Error ID" });
    }
  } catch (err) {
    console.log("getImage error");
    console.log(err);
  }
};

const addComment = async (req, res) => {
  const { comment, Rid } = req.body;
  const user = req.user.id;
  console.log(user);
  const query =
    // 'UPDATE "Recipes" SET comments = comments || json_build_array($1::json) WHERE id = $2';
    `UPDATE "Recipes" SET comments = comments || json_build_array(json_build_object('user_id', $1::text,'comment_str', $2::text,'time', current_timestamp(0))::json) WHERE id = $3`
  const values = [user, comment.toString(), parseInt(Rid)];

  try {
    await pool.query(query, values);
    res.send("success");
  } catch (err) {
    res.send("fail");
    console.log(err);
  }
};

const uploaderImage = async (file) => await uploads(file, "Recipe");

// add recipe
const addRecipe = async (req, res) => {
  const {
    title,
    overview,
    servingSize,
    instructions,
    video,
    labels,
    ingredients,
  } = req.body;
  const user = req.user;
  const file = req.file;
  const { path } = file;
  const newPath = await uploaderImage(path);
  let url = newPath;
  fs.unlinkSync(path);
  const query =
    `INSERT INTO "Recipes" ("userID", "title", "overview", "servingSize", "instructions", "image", "imagePID", "video", "likeCount", "labels", "ingredients", "comments") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, DEFAULT)`;
  const values = [
    user.id,
    title.toString(),
    overview.toString(),
    parseInt(servingSize),
    JSON.parse(instructions),
    url.url,
    url.id,
    video.toString(),
    0,
    JSON.parse(labels),
    JSON.parse(ingredients),
  ];
  console.log(values);
  try {
    await pool.query(query, values);
    res.send("success");
  } catch (err) {
    res.send("fail");
    console.log("add recipe failed");
    console.log(err);
  }
};

const deleteByID = async (req, res) => {
  const { id } = req.query;
  const query = `DELETE FROM "Recipes" WHERE "id" = $1`;
  const values = [parseInt(id)];

  try {
    await pool.query(query, values);
    res.send("success");
  } catch (err) {
    res.send("fail");
    console.log(err);
  }
};

const queryAll = async (req, res) => {
  const query = `SELECT * FROM "public"."Recipes" LIMIT 100`;

  try {
    const result = await pool.query(query);
    res.send(result);
  } catch (err) {
    res.send("fail");
    console.log(err);
  }
};

export {
  qeuryByID,
  qeuryByName,
  queryByLabel,
  queryTopLikeCount,
  queryByIngredients,
  queryByUser,
  updateAddLikeCount,
  updateMinusLikeCount,
  updateRecipe,
  addComment,
  addRecipe,
  getCommentUserData,
  deleteByID,
  queryAll,
};
