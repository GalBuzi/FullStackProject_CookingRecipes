var express = require("express");
var router = express.Router();
const axios = require("axios");

const api_domain = "https://api.spoonacular.com/recipes";
const api_key = "apiKey=" + process.env.spooncular_apiKey;

// =============== API Requests ===============

//function to extract the query parameters
function extractQueriesParams(query_params, search_params) {
  const params_list = ["diet", "cuisine", "intolerance"];
  params_list.forEach((param) => {
    if (query_params[param]) {
      search_params[param] = query_params[param];
    }
  });
  //console.log(search_params);
}

//function that search reciepes in spooncular by the the given parameters: query- food, amount- num of reciepes.
async function searchForRecipes(search_params) {
  let search_response = await axios.get(`${api_domain}/search?${api_key}`, {
    params: {
      query: search_params.query,
      number: search_params.number,
      instructionsRequired: search_params.instructionsRequired,
      cuisine: search_params.cuisine,
      diet: search_params.diet,
      intolerance: search_params.intolerance,
    },
  });
  const recipes_id_list = await extractSearchResultsIds(search_response);
  //console.log(recipes_id_list);
  //Get recipes info by id
  let info_array = await getRecipesInfo(recipes_id_list);
  let relevantRecipesData = await extractRelevantRecipeData(info_array);
  return relevantRecipesData;
  // let dict = await getDictionaryReciepes(relevantRecipesData);
  // return dict;
}

//function that return 3 random reciepes
async function getThreeRandomRecipes(search_params) {
  const promise = await axios.get(`${api_domain}/random?${api_key}`, {
    params: search_params,
  });
  let ids = await extractRandomRecipeId(promise.data.recipes);
  let arrayRandomIds = [];
  ids.map((recipeId) => {
    arrayRandomIds.push(recipeId.id);
  });
  let randomReciepeInfo = await getRecipesInfo(arrayRandomIds);

  for (let i = 0; i < randomReciepeInfo.length; i++) {
    let isEmpty = randomReciepeInfo[i].data.analyzedInstructions.length === 0;
    while (isEmpty) {
      let new_recipe = getNewRandomRecipe(search_params);
      if (new_recipe) {
        isEmpty = false;
        randomReciepeInfo[i].data = new_recipe.data;
      }
    }
  }

  relevantRecipesData = await extractRelevantRecipeData(randomReciepeInfo);
  return relevantRecipesData;
  // let dict = await getDictionaryReciepes(relevantRecipesData);
  // return dict;
}

async function getNewRandomRecipe(search_params) {
  const promise = await axios.get(`${api_domain}/random?${api_key}`, {
    params: search_params,
  });
  let ids = await extractRandomRecipeId(promise.data.recipes);
  let arrayRandomIds = [];
  ids.map((recipeId) => {
    arrayRandomIds.push(recipeId.id);
  });
  let randomReciepeInfo = await getRecipesInfo(arrayRandomIds);
  for (let i = 0; i < randomReciepeInfo.length; i++) {
    if (randomReciepeInfo[i].data.analyzedInstructions.length > 0) {
      return randomReciepeInfo[i];
    }
  }
  return undefined;
}

//function that get an id of recipe and return full information about the recipe
async function getRecipe(id_param) {
  recipes_id_list = [];
  recipes_id_list.push(id_param.recipeId);
  let reciepeInfo = await getRecipesInfo(recipes_id_list);
  relevantRecipesData = await extractRelevantFullRecipeData(reciepeInfo);
  recipeIngredients = await extractRecipeIngredients(reciepeInfo);
  recipeInstructions = await extractRecipeInstructions(reciepeInfo);
  recipeFullInfo = await createFullRecipeObject(
    relevantRecipesData,
    recipeIngredients,
    recipeInstructions
  );
  console.log(recipeFullInfo);
  return recipeFullInfo;
}

//-------------------------------------extract data functions-----------------------------------------------

async function createFullRecipeObject(
  relevantRecipesData,
  recipeIngredients,
  recipeInstructions
) {
  let recipeFullInfo = {};
  recipeFullInfo.id = relevantRecipesData[0].id;
  recipeFullInfo.title = relevantRecipesData[0].title;
  recipeFullInfo.readyInMinutes = relevantRecipesData[0].readyInMinutes;
  recipeFullInfo.aggregateLikes = relevantRecipesData[0].aggregateLikes;
  recipeFullInfo.vegetarian = relevantRecipesData[0].vegetarian;
  recipeFullInfo.vegan = relevantRecipesData[0].vegan;
  recipeFullInfo.glutenFree = relevantRecipesData[0].glutenFree;
  recipeFullInfo.servings = relevantRecipesData[0].servings;
  recipeFullInfo.image = relevantRecipesData[0].image;
  recipeFullInfo.ingredients = recipeIngredients;
  recipeFullInfo.instructions = recipeInstructions;
  //console.log(recipeFullInfo);
  return recipeFullInfo;
}

async function extractRecipeInstructions(recipes_info) {
  return recipes_info[0].data.analyzedInstructions[0].steps.map(
    (recipes_info) => {
      const { number, step } = recipes_info;

      return {
        step_number: number,
        step: step,
      };
    }
  );
}

async function extractRecipeIngredients(recipes_info) {
  return recipes_info[0].data.extendedIngredients.map((recipes_info) => {
    const { name, amount, unit } = recipes_info;

    return {
      ingredient_name: name,
      amount: amount,
      unit: unit,
    };
  });
}

async function extractSearchResultsIds(search_response) {
  let recipes = search_response.data.results;
  recipes_id_list = [];
  recipes.map((recipe) => {
    //console.log(recipe.title);
    recipes_id_list.push(recipe.id);
  });
  return recipes_id_list;
}

async function extractRandomRecipeId(recipes_Info) {
  return recipes_Info.map((recipe_info) => {
    const { id } = recipe_info;
    return {
      id,
    };
  });
}

async function extractRelevantRecipeData(recipes_Info) {
  return recipes_Info.map((recipe_info) => {
    const {
      id,
      title,
      readyInMinutes,
      aggregateLikes,
      vegetarian,
      vegan,
      glutenFree,
      image,
    } = recipe_info.data;
    return {
      id: id,
      title: title,
      readyInMinutes: readyInMinutes,
      aggregateLikes: aggregateLikes,
      vegetarian: vegetarian,
      vegan: vegan,
      glutenFree: glutenFree,
      image: image,
    };
  });
}

async function extractRelevantFullRecipeData(recipes_Info) {
  return recipes_Info.map((recipe_info) => {
    const {
      id,
      title,
      readyInMinutes,
      aggregateLikes,
      vegetarian,
      vegan,
      glutenFree,
      image,
      servings,
    } = recipe_info.data;
    return {
      id: id,
      title: title,
      readyInMinutes: readyInMinutes,
      aggregateLikes: aggregateLikes,
      vegetarian: vegetarian,
      vegan: vegan,
      glutenFree: glutenFree,
      image: image,
      servings: servings,
    };
  });
}

//function thaht return dictionary => key: recipe_id, value: recipe_deatils
// async function getDictionaryReciepes(info_array) {
//   dict = {};
//   for (var j = 0; j < info_array.length; j++) {
//     dict[info_array[j]["id"]] = info_array[j];
//   }
//   return dict;
// }

//function that return recipe information by id
async function getRecipesInfo(recipes_id_list) {
  let promises = [];
  recipes_id_list.map((id) =>
    promises.push(axios.get(`${api_domain}/${id}/information?${api_key}`))
  );
  let info_response1 = await Promise.all(promises);
  //console.log(info_response1);
  // relevantRecipesData = extractRelevantRecipeData(info_response1);

  return info_response1;
}

exports.searchForRecipes = searchForRecipes;
exports.extractQueriesParams = extractQueriesParams;
exports.getThreeRandomRecipes = getThreeRandomRecipes;
exports.getRecipe = getRecipe;
exports.getRecipesInfo = getRecipesInfo;
exports.extractRelevantRecipeData = extractRelevantRecipeData;
exports.extractRelevantFullRecipeData = extractRelevantFullRecipeData;
