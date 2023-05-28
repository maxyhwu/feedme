import { pool } from "../Clients/pool";
import dotenv from "dotenv-defaults";
import { uploads } from "../Config/cloudinary";
import fs from "fs";
dotenv.config();

// recipe query
const qeuryByID = async (req, res) => {
  const { id } = req.query;
  const query = `SELECT * FROM "Recipes" WHERE "Recipes".id = $1`;
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
  const query = `SELECT * FROM "Recipes" WHERE LOWER("Recipes"."title") LIKE LOWER($1)`;
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
  const query = `SELECT * FROM "Recipes" WHERE $1 = ANY("Recipes"."labels")`;
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
  const query = `SELECT * FROM "Recipes" ORDER BY "likeCount" DESC OFFSET $1 ROWS FETCH NEXT 15 ROWS ONLY`;
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
  const query = `SELECT * FROM "Recipes" WHERE EXISTS (SELECT 1 FROM json_each(ingredients) AS i WHERE (i.key::int)::text IN (SELECT unnest($1::text[]))) ORDER BY (SELECT COUNT(*) FROM json_object_keys(ingredients) AS keys WHERE (keys::int)::text IN (SELECT unnest($1::text[]))) DESC`;
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
  const query = `SELECT * FROM "Recipes" WHERE "userID" = $1`;
  const values = [parseInt(Uid.id)];

  try {
    const { rows } = await pool.query(query, values);
    res.send({ rows });
  } catch (err) {
    res.send("fail");
    console.log(err);
  }
};

const queryByFridge = async (req, res) => {
  const Uid = req.user;
  // query fridge to get ingredient
  const query = `SELECT "fridge" FROM "Users" WHERE "id" = $1`;
  const values = [parseInt(Uid.id)];
  const { rows } = await pool.query(query, values);
  const ingredientArr = rows[0].fridge;

  let currentDate = new Date();
  currentDate = currentDate.toISOString().split("T")[0];
  const date2 = new Date(currentDate);
  const queryIng = [];
  const sortedIng = [];

  // console.log(ingredientArr);
  if (ingredientArr == null || ingredientArr.length() === 0) {
    return res.send("fail");
  }
  for (let key in ingredientArr) {
    // query ingredient table get ingredient date
    for (let i = 0; i < ingredientArr[key].length; i++) {
      // Create two Date objects representing the dates to compare
      const date1 = new Date(ingredientArr[key][i].expire_date);
      // Calculate the time difference in milliseconds
      const timeDiff = date1 - date2;
      // Convert the time difference to days
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const count = parseInt(ingredientArr[key][i].count);

      sortedIng.push({ [key]: { daysDiff: daysDiff, count: count } });

      // Check if the difference is smaller than three days
      if ((daysDiff >= 0) & (daysDiff <= 3)) {
        queryIng.push({ [key]: { daysDiff: daysDiff, count: count } });
      }
    }
  }

  // the ingarray for query2 input
  const finalIngArr = [];
  // console.log(queryIng);

  if (queryIng.length > 5) {
    // 1-1 sort and select 5
    // console.log(0);
    queryIng.sort(
      (a, b) => b[Object.keys(b)[0]].daysDiff - a[Object.keys(a)[0]].daysDiff
    );
    // avoid duplicate
    let imax = 5;
    for (let i = 0; i < imax; i++) {
      let tempIng = Object.keys(queryIng[i])[0].toString();
      if (!finalIngArr.includes(tempIng)) {
        finalIngArr.push(tempIng);
      } else {
        imax++;
      }
    }
  } else if (queryIng.length == 0) {
    // 2 query five most amount
    // console.log(1);
    sortedIng.sort(
      (a, b) => b[Object.keys(b)[0]].count - a[Object.keys(a)[0]].count
    );
    // avoid duplicate
    let imax = 5;
    for (let i = 0; i < imax; i++) {
      let tempIng = Object.keys(sortedIng[i])[0].toString();
      if (!finalIngArr.includes(tempIng)) {
        finalIngArr.push(tempIng);
      } else {
        imax++;
      }
    }
  } else {
    // 1-2 if ingredient < 5 use all
    // console.log(2);
    for (let i in queryIng) {
      let tempIng = Object.keys(queryIng[i])[0].toString();
      if (!finalIngArr.includes(tempIng)) {
        finalIngArr.push(tempIng);
      }
    }
  }

  // console.log(finalIngArr);

  // get recipe
  const query2 = `SELECT * FROM "Recipes" WHERE EXISTS (SELECT 1 FROM json_each(ingredients) AS i WHERE (i.key::int)::text IN (SELECT unnest($1::text[]))) ORDER BY (SELECT COUNT(*) FROM json_object_keys(ingredients) AS keys WHERE (keys::int)::text IN (SELECT unnest($1::text[]))) DESC`;
  const values2 = [finalIngArr];
  try {
    const { rows } = await pool.query(query2, values2);
    res.send({ rows });
  } catch (err) {
    res.send("fail");
    console.log(err);
  }
};

// get total recipe number
const queryTotalRecipeNumber = async (req, res) => {
  const query = `SELECT COUNT(*) as recipe_count FROM "Recipes"`;

  try {
    const { rows } = await pool.query(query);
    res.send(rows[0].recipe_count);
  } catch (err) {
    res.send("fail");
    console.log(err);
  }
};

// recipe update
const updateAddLikeCount = async (req, res) => {
  const { Rid } = req.body;
  const query = `UPDATE "Recipes" SET "likeCount" = "likeCount" + 1 WHERE id = $1`;
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
  const query = `UPDATE "Recipes" SET "likeCount" = "likeCount" - 1 WHERE id = $1`;
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
    servingSize,
    instructions,
    ingredients,
    id,
  } = req.body;
  // console.log(req.body);
  const user = req.user;
  const query = `UPDATE "Recipes" SET "title" = $1, "servingSize" = $2, "instructions" = $3, "ingredients" = $4 WHERE "id" = $5 and "userID" = $6`;
  // UPDATE "Recipes" SET "title" = "Curry Rice", "servingSize" = 4, "instructions" = ["\"Test\" 'test'"], "ingredients" = {55: [['100']]} WHERE "id" = 2 and "userID" = 2
  const values = [
    title.toString(),
    parseInt(servingSize),
    JSON.parse(instructions),
    JSON.parse(ingredients),
    parseInt(id),
    user.id,
  ];
  console.log("values", values)
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
  const query =
    // 'UPDATE "Recipes" SET comments = comments || json_build_array($1::json) WHERE id = $2';
    `UPDATE "Recipes" SET comments = comments || json_build_array(json_build_object('user_id', $1::text,'comment_str', $2::text,'time', current_timestamp(0))::json) WHERE id = $3`;
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
  const query = `INSERT INTO "Recipes" ("userID", "title", "overview", "servingSize", "instructions", "image", "imagePID", "video", "likeCount", "labels", "ingredients", "comments") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, DEFAULT)`;
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
  const query = `SELECT * FROM "public"."Recipes"`;

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
  queryByFridge,
  queryTotalRecipeNumber,
  updateAddLikeCount,
  updateMinusLikeCount,
  updateRecipe,
  addComment,
  addRecipe,
  getCommentUserData,
  deleteByID,
  queryAll,
};
