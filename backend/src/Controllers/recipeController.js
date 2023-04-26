import recipesModel from "../Model/recipesModel";

exports.getRecipeByName = async (req, res) => {
  const recipeName = req.query.recipeName;
  try {
    const info = await recipesModel.findAll({
      where: { recipeName: recipeName }, // where 條件
      attribute: [], //指定回傳欄位
    });
    console.log(info);
    // res.status(200).send({ message: "success", contents: info });
  } catch (err) {
    console.log(err);
    // res.status(403).send({ message: "error", contents: [] });
  }
};
