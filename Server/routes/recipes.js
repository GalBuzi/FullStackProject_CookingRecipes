//class for recipes to/from db & spooncular

require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const searchUtils = require("./utils/search_recipes");
const family = require("./utils/insertFamilyRecipes");
const personal = require("./utils/insertPersonalRecipes");
const api_domain = "https://api.spoonacular.com/recipes";

router.use((req, res, next) => {
  console.log("Recipes route");
  next();
});

// ============= end points =================
//routes

// GET  /serach/query/:searchQuery/amount/:num
router.get("/search/query/:searchQuery/amount/:num", async (req, res) => {
  try {
    const { searchQuery, num } = req.params;
    //set search parameters
    const search_params = {};
    search_params.query = searchQuery;
    search_params.number = num;
    search_params.instructionsRequired = true;
    const query_params = {};
    if (req.query.cuisine != "") {
      query_params.cuisine = req.query.cuisine;
    }
    if (req.query.diet != "") {
      query_params.diet = req.query.diet;
    }
    if (req.query.intolerance != "") {
      query_params.intolerance = req.query.intolerance;
    }
    //check if queries params exist
    searchUtils.extractQueriesParams(query_params, search_params);
    //search recepie
    const recipe_array = await searchUtils.searchForRecipes(search_params);
    if (recipe_array) {
      res.status(200).send(recipe_array);
    } else res.status(404).send({ message: "not found" });
  } catch (error) {
    res.status(500).send({ message: "somthing went wrong" });
  }
});

// GET- /getRandomRecipes
router.get("/getRandomRecipes", async (req, res) => {
  try {
    const search_params = {};
    search_params.number = 3;
    const recipe_array = await searchUtils.getThreeRandomRecipes(search_params);
    if (recipe_array) {
      res.status(200).send(recipe_array);
    } else res.status(404).send({ message: "not found" });
  } catch (error) {
    res.status(500).send({ message: "somthing went wrong" });
  }
});

//  GET- /getRecipe/id/:recipeId
router.get("/getRecipe/id/:recipeId", async (req, res) => {
  try {
    const id_param = {};
    id_param.recipeId = req.params.recipeId;
    const recipeFullInfo = await searchUtils.getRecipe(id_param);
    if (recipeFullInfo) {
      res.status(200).send(recipeFullInfo);
    } else res.status(404).send({ message: "not found" });
  } catch (error) {
    res.status(500).send({ message: "somthing went wrong" });
  }
});

// insert default recipes
router.get("/insert", async (req, res) => {
  try {
    await family.insertToFamilyTable();
    await personal.insertToPersonalTable();
  } catch (error) {
    res.status(500).send({ message: "something went wrong" });
  }
  res.status(200).send("family and personal recipes added to DB");
});

module.exports = router;
