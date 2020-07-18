// class for data of users from/to DB

const express = require("express");
const router = express.Router();
const db = require("./utils/db");
const search = require("./utils/search_recipes");

// Authenticate all incoming requests
router.use((req, res, next) => {
  if (req.session && req.session.user_id) {
    const user_id = req.session.user_id;
    const user = async function (user_id) {
      const users_ids = await db.getUsersIDsInDB(); //from db
      if (!users_ids.find((x) => x.user_id === user_id)) {
        return null;
      } else {
        return await db.getUserDetailsByUserIDFromDB(user_id)[0];
      }
    };
    if (user) {
      req.user = user;
      next();
    }
  } else res.sendStatus(401);
});

// ============= end points =================

//  POST    /addRecipeToFavourites/id/:id
router.get("/addRecipeToFavourites/id/:id", async (req, res) => {
  try {
    const recipe_id = req.params.id;
    const user_id = req.session.user_id;
    const user = await db.getUserDetailsByUserIDFromDB(user_id);
    const ans = await db.addToFavourites(user[0].username, recipe_id);

    if (ans) {
      res.status(200).send({ message: "added to favourites" });
    } else
      res.status(500).send({ message: "something went wrong", success: false });
  } catch (err) {
    res.status(500).send({ message: "something went wrong" });
  }
});

//  POST    /addRecipeToViewed/id/:id
router.get("/addRecipeToViewed/id/:id", async (req, res) => {
  try {
    const recipe_id = req.params.id;
    const user_id = req.session.user_id;
    const user = await db.getUserDetailsByUserIDFromDB(user_id);
    const ans = await db.addRecipeAsViewed(user[0].username, recipe_id);

    if (ans) {
      res.status(200).send({ message: "added to viewed" });
    } else
      res.status(500).send({ message: "something went wrong", success: false });
  } catch (err) {
    res.status(500).send({ message: "something went wrong" });
  }
});

//  GET     /getLastThreeViewedRecipes
router.get("/getLastThreeViewedRecipes", async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const user = await db.getUserDetailsByUserIDFromDB(user_id);
    const last_three_viewed = await db.getLastViewedRecipesByUser(
      user[0].username
    );
    const recipes_data = await search.extractRelevantRecipeData(
      last_three_viewed
    );

    if (recipes_data.length > 0) {
      res.status(200).send(recipes_data); //returns array of recipes
    } else
      res.status(404).send({
        message: "no recipes found, look around for recipes",
        success: false,
      });
  } catch (err) {
    res.status(500).send({ message: "something went wrong" });
  }
});

//  GET     /getMyFavourites
router.get("/getMyFavourites", async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const user = await db.getUserDetailsByUserIDFromDB(user_id);
    const favourites = await db.getFavouritesRecipesByUser(user[0].username);
    const favourites_data = await search.extractRelevantRecipeData(favourites);

    if (favourites_data.length > 0) {
      res.status(200).send(favourites_data); //returns array of recipes
    } else
      res
        .status(404)
        .send({ message: "no favourites recipes found", success: false });
  } catch (err) {
    res.status(500).send({ message: "something went wrong" });
  }
});

// GET      /getMyFamilyRecipes
router.get("/getMyFamilyRecipes", async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const user = await db.getUserDetailsByUserIDFromDB(user_id);
    const family_recipes = await db.getFamilyRecipesByUser(user[0].username);

    if (family_recipes.length > 0) {
      res.status(200).send(family_recipes); //returns array of recipes
    } else
      res
        .status(404)
        .send({ message: "no family recipes found", success: false });
  } catch (err) {
    res.status(500).send({ message: "something went wrong" });
  }
});

// GET      /getPersonalRecipes
router.get("/getPersonalRecipes", async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const user = await db.getUserDetailsByUserIDFromDB(user_id);
    const personal_recipes = await db.getPersonalRecipesByUser(
      user[0].username
    );

    if (personal_recipes.length > 0) {
      res.status(200).send(personal_recipes); //returns array of recipes
    } else
      res
        .status(404)
        .send({ message: "no personal recipes found", success: false });
  } catch (err) {
    res.status(500).send({ message: "something went wrong" });
  }
});

router.get("/getFamilyRecipe/id/:recipeId", async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const user = await db.getUserDetailsByUserIDFromDB(user_id);
    const family_recipes = await db.getFamilyRecipesByUser(user[0].username);
    const recipeFullInfo = [];
    for (let index = 0; index < family_recipes.length; index++) {
      if (family_recipes[index].id == req.params.recipeId) {
        recipeFullInfo.push(family_recipes[index]);
      }
    }
    if (recipeFullInfo) {
      res.status(200).send(recipeFullInfo);
    } else res.status(404).send({ message: "not found" });
  } catch (error) {
    res.status(500).send({ message: "somthing went wrong" });
  }
});

router.get("/getPersonalRecipe/id/:recipeId", async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const user = await db.getUserDetailsByUserIDFromDB(user_id);
    const personal_recipes = await db.getPersonalRecipesByUser(
      user[0].username
    );
    const recipeFullInfo = [];
    for (let index = 0; index < personal_recipes.length; index++) {
      if (personal_recipes[index].id == req.params.recipeId) {
        recipeFullInfo.push(personal_recipes[index]);
      }
    }
    if (recipeFullInfo) {
      res.status(200).send(recipeFullInfo);
    } else res.status(404).send({ message: "not found" });
  } catch (error) {
    res.status(500).send({ message: "somthing went wrong" });
  }
});
//check

//  get info about user's view history and favourite list
//  GET     /userInfoAboutRecipes/ids/:ids
// router.get("/userInfoAboutRecipes/ids/:ids", async (req, res) => {
//   try {
//     const ids = JSON.parse(req.params.ids);
//     const user_id = req.session.user_id;
//     const user = await db.getUserDetailsByUserIDFromDB(user_id);
//     const info = await db.getUserInfoViewedAndFavourites(user[0].username, ids);

//     if (info) res.status(200).send({ info: info });
//     else
//       res
//         .status(404)
//         .send({ message: "no history for this user", success: false });
//   } catch (err) {
//     res.status(500).send({ message: "something went wrong", success: false });
//   }
// });

router.get("/userInfoLastViewed", async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const user = await db.getUserDetailsByUserIDFromDB(user_id);
    const last_viewed = await db.getViewedRecipesIDByUser(user[0].username);

    if (last_viewed) res.status(200).send(last_viewed);
    else
      res
        .status(404)
        .send({ message: "no last viewed for this user", success: false });
  } catch (err) {
    res.status(500).send({ message: "something went wrong", success: false });
  }
});

router.get("/userInfoFavourites", async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const user = await db.getUserDetailsByUserIDFromDB(user_id);
    const favourites = await db.getFavouritesRecipesIDByUser(user[0].username);

    if (favourites) res.status(200).send(favourites);
    else
      res
        .status(404)
        .send({ message: "no favourites for this user", success: false });
  } catch (err) {
    res.status(500).send({ message: "something went wrong", success: false });
  }
});

module.exports = router;
