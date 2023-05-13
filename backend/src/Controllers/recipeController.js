import { pool } from "../Clients/pool";
import dotenv from "dotenv-defaults";
import { uploads } from "../Config/cloudinary";
import fs from 'fs'
dotenv.config();

// recipe query
const qeuryByID = async (req, res) => {
  const {id} = req.query;
  const query = 'SELECT "Recipes"."id", title, overview, "Recipes"."servingSize", instructions, image, video, "Recipes"."likeCount", labels, ingredients, comments, "Recipes"."createdAt", "Recipes"."updatedAt", "userName" FROM "Recipes", "Users" WHERE "userID" = "Users".id and "Recipes".id = $1';
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
  const {title} = req.query;
  const query = 'SELECT "Recipes"."id", title, overview, "Recipes"."servingSize", instructions, image, video, "Recipes"."likeCount", labels, ingredients, comments, "Recipes"."createdAt", "Recipes"."updatedAt", "userName" FROM "Recipes", "Users" WHERE "Recipes"."userID" = "Users".id and LOWER("Recipes"."title") LIKE LOWER($1)';
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
  const {label} = req.query;
  const query = 'SELECT "Recipes"."id", title, overview, "Recipes"."servingSize", instructions, image, video, "Recipes"."likeCount", labels, ingredients, comments, "Recipes"."createdAt", "Recipes"."updatedAt", "userName" FROM "Recipes", "Users" WHERE "Recipes"."userID" = "Users".id and $1 = ANY("Recipes"."labels")';
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
  const {page} = req.query;
  const query = 'SELECT "Recipes"."id", title, overview, "Recipes"."servingSize", instructions, image, video, "Recipes"."likeCount", labels, ingredients, comments, "Recipes"."createdAt", "Recipes"."updatedAt", "userName" FROM "Recipes", "Users" WHERE "Recipes"."userID" = "Users".id ORDER BY "likeCount" DESC OFFSET $1 ROWS FETCH NEXT 15 ROWS ONLY';
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
  const {ingredient} = req.query;
  const query = 'SELECT "Recipes"."id", title, overview, "Recipes"."servingSize", instructions, image, video, "Recipes"."likeCount", labels, ingredients, comments, "Recipes"."createdAt", "Recipes"."updatedAt", "userName" FROM "Recipes", "Users" WHERE "Recipes"."userID" = "Users".id AND jsonb_exists(ingredients, $1)';
  const values = [parseInt(ingredient)];

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
  const {id} = req.body;
  const query = 'UPDATE "Recipes" SET "likeCount" = "likeCount" + 1 WHERE id = $1';
  const values = [parseInt(id)];

  try {
    await pool.query(query, values);
    res.send("success");
  } catch (err) {
    res.send("fail");
    console.log(err);
  }
};

const updateMinusLikeCount = async (req, res) => {
  const {id} = req.body;
  const query = 'UPDATE "Recipes" SET "likeCount" = "likeCount" - 1 WHERE id = $1';
  const values = [parseInt(id)];

  try {
    await pool.query(query, values);
    res.send("success");
  } catch (err) {
    res.send("fail");
    console.log(err);
  }
};

const updateRecipe = async (req, res) => {
  const {title, overview, servingSize, instructions, image, video, labels, ingredients, id} = req.body;
  const query =
    'UPDATE "Recipes" SET "title" = $1, "overview" = $2, "servingSize" = $3, "instructions" = $4, "image" = $5, "video" = $6, "labels" = $7, "ingredients" = $8 WHERE "id" = $9';
  const values = [
    title.toString(),
    overview.toString(),
    parseInt(servingSize),
    instructions,
    image.toString(),
    video.toString(),
    labels,
    ingredients,
    parseInt(id),
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
  const query = 'SELECT "photo", "userName" FROM "Users" WHERE "id" = $1';
  try {
      const { id } = req.query;
      const values = [
        parseInt(id)
      ];
      const { rows } = await pool.query(query, values);
      if (rows) {
          res.status(200).send(rows);
      } else {
          res.status(400).send({message: 'Error ID'});
      }
      
  }catch (err) {
      console.log('getImage error');
      console.log(err);
  }
}

const addComment = async (req, res) => {
  const {comment, Rid} = req.body;
  const query =
    'UPDATE "Recipes" SET "comments" = $1 WHERE "id" = $2';
  const values = [
    comment,
    parseInt(Rid)
  ];

  try {
    await pool.query(query, values);

    res.send("success");
  } catch (err) {
    res.send("fail");
    console.log(err);
  }
};

const uploaderImage = async(file) => await uploads(file, 'Recipe');

// add recipe
const addRecipe = async (req, res) => {
  console.log(req.body)
  const {title, overview, servingSize, instructions, video, labels, ingredients} = req.body;
  const user = req.user;
  const file = req.file;
  let url = ''
  const { path } = file;
  const newPath = await uploaderImage(path)
  url = newPath
  // console.log("url",url)
  fs.unlinkSync(path)
  // console.log("instructions",instructions)
  // console.log(JSON.stringify(instructions))
  // console.log(JSON.parse(instructions))
  const query =
    'INSERT INTO "Recipes" ("userID", "title", "overview", "servingSize", "instructions", "image", "imagePID", "video", "likeCount", "labels", "ingredients", "comments") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, DEFAULT)';
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
  console.log(values)
  try {
    await pool.query(query, values);
    res.send("success");
  } catch (err) {
    res.send("fail");
    console.log('add recipe failed')
    console.log(err);
  }
};

export {
  qeuryByID,
  qeuryByName,
  queryByLabel,
  queryTopLikeCount,
  queryByIngredients,
  updateAddLikeCount,
  updateMinusLikeCount,
  updateRecipe,
  addComment,
  addRecipe,
  getCommentUserData
};
