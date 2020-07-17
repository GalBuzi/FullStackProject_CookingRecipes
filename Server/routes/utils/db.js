require("dotenv").config();
const sql = require("mssql");
const search = require("./search_recipes");

//======Configuration for DB======

const config = {
  user: process.env.tedious_userName,
  password: process.env.tedious_password,
  server: process.env.tedious_server,
  database: process.env.tedious_database,
  connectionTimeout: 1500000,
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool
  .connect()
  .then(() => console.log("new connection pool Created"))
  .catch((err) => console.log(err));

//===== Query Execution =======
async function execQuery(query) {
  await poolConnect;
  try {
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
}

process.on("SIGINT", function () {
  if (pool) {
    pool.close(() => console.log("connection pool closed"));
  }
});

// ======= Queries to get data from DB ==============

/** ==============users============================================================================================*/

// // get user details from users table
exports.getUserDetailsByUsernameFromDB = async function (username) {
  return await execQuery(
    `select * from users where username like '${username}'`
  );
};

//insert new user to users table
exports.insertUser = async function (user, hash_password) {
  return await execQuery(`INSERT INTO users VALUES ( default , '${user.username}', '${user.firstName}',
        '${user.lastName}', '${user.country}', '${hash_password}', '${user.email}',
        '${user.picture_url}')`);
};

//get all usernames in users table
exports.getAllUsernamesInDB = async function () {
  return await execQuery(`SELECT username FROM users`);
};

//get all user's id in users table for authntication
exports.getUsersIDsInDB = async function () {
  return await execQuery(`select user_id from users`);
};

// get user details from users table by userID
exports.getUserDetailsByUserIDFromDB = async function (user_id) {
  return await execQuery(`select * from users where user_id like '${user_id}'`);
};

/** ==============favourites==========================================================================================*/

//get favourites recipes ids from favourites table by username
exports.getFavouritesRecipesIDByUser = async function (username) {
  return await execQuery(
    `select recipe_id from user_saved_favourites where username like '${username}' `
  );
};

//get favourites by user to show in frontend
exports.getFavouritesRecipesByUser = async function (username) {
  const favs = await exports.getFavouritesRecipesIDByUser(username);

  //convert lastThreeIds to simple array
  let id_array = [];
  favs.map((recipes) => {
    id_array.push(recipes.recipe_id);
  });

  //gets info and extract relevant
  return await search.getRecipesInfo(id_array);
};

//add recipe id to favourites table
exports.addToFavourites = async function (username, recipe_id) {
  try {
    const recipes = await exports.getFavouritesRecipesIDByUser(username);
    if (!recipes.find((x) => x.recipe_id === recipe_id)) {
      await execQuery(
        `INSERT INTO user_saved_favourites VALUES ('${username}', '${recipe_id}')`
      );
      return true;
    }
  } catch (e) {
    return false;
  }
};

/** ==============viewed============================================================================================*/

//returns recipes ids user had viewed
exports.getViewedRecipesIDByUser = async function (username) {
  return await execQuery(
    `select recipe_id from user_viewed_recipes where username like '${username}' `
  );
};

//returns last 3 recipes ids user had viewed
getLastThreeViewedRecipesIDByUser = async function (username) {
  return await execQuery(
    `select top(3) recipe_id from user_viewed_recipes where username like '${username}' order by time_stamp desc`
  );
};

//get last 3 recipes viewed by user
exports.getLastViewedRecipesByUser = async function (username) {
  const lastThreeIds = await getLastThreeViewedRecipesIDByUser(username);

  //convert lastThreeIds to simple array
  let id_array = [];
  lastThreeIds.map((recipes) => {
    id_array.push(recipes.recipe_id);
  });

  //gets info and extract relevant
  return await search.getRecipesInfo(id_array);
};

//add recipe id as viewed by user to table
exports.addRecipeAsViewed = async function (username, recipe_id) {
  try {
    const recipes = await exports.getViewedRecipesIDByUser(username);
    if (!recipes.find((x) => x.recipe_id === recipe_id)) {
      await execQuery(
        `INSERT INTO user_viewed_recipes VALUES ('${username}', '${recipe_id}', default )`
      );
      return true;
    } else {
      await execQuery(
        `update user_viewed_recipes set time_stamp = default where recipe_id = '${recipe_id}' `
      );
      return true;
    }
  } catch (e) {
    return false;
  }
};

/** ==============viewed&favourites===================================================================================*/

//returns dict of recipeID and its info about being viewed by user and added by user to favourite
// exports.getUserInfoViewedAndFavourites = async function (username, recipe_ids) {
//   try {
//     const viewed_recipes = await getViewedRecipesIDByUser(username);
//     const favourites_recipes = await getFavouritesRecipesIDByUser(username);
//     let dict = {};
//     let infoArr = [];
//     for (let i = 0; i < recipe_ids.length; i++) {
//       infoArr[i] = {};
//       infoArr[i].recipe_id = recipe_ids[i];

//       if (viewed_recipes.find((x) => x.recipe_id == recipe_ids[i])) {
//         infoArr[i].viewed = true;
//       } else {
//         infoArr[i].viewed = false;
//       }
//       if (favourites_recipes.find((x) => x.recipe_id == recipe_ids[i])) {
//         infoArr[i].favourite = true;
//       } else {
//         infoArr[i].favourite = false;
//       }

//       const information = {
//         viewed: infoArr[i].viewed,
//         favourite: infoArr[i].favourite,
//       };

//       dict[recipe_ids[i]] = information;
//     }

//     return dict;
//   } catch (e) {}
// };

/** ==============family============================================================================================*/

//get family recipes to show in frontend
exports.getFamilyRecipesByUser = async function (username) {
  const family_recipes_ids = await execQuery(
    `select * from familyRecipes where username like '${username}' `
  );
  let family_recipes = [];
  family_recipes_ids.map((recipe) => {
    let string = JSON.parse(recipe.recipe_text);
    family_recipes.push(string);
  });

  return family_recipes;
};

//insert a family recipe to table
exports.insertFamilyRecipe = async function (username, jsonRecipe) {
  try {
    await execQuery(
      `INSERT INTO familyRecipes VALUES ('${username}', '${jsonRecipe}' )`
    );
    return true;
  } catch (e) {
    return false;
  }
};

/** ==============personal============================================================================================*/

//insert a personal recipe to table
exports.insertPersonalRecipe = async function (username, jsonRecipe) {
  try {
    await execQuery(
      `INSERT INTO personalRecipes VALUES ('${username}', '${jsonRecipe}')`
    );
    return true;
  } catch (e) {
    return false;
  }
};

//get personal recipes to show in frontend
exports.getPersonalRecipesByUser = async function (username) {
  const personal_recipes_ids = await execQuery(
    `select * from personalRecipes where username like '${username}' `
  );
  let personal_recipes = [];
  personal_recipes_ids.map((recipe) => {
    let string = JSON.parse(recipe.recipe_text);
    personal_recipes.push(string);
  });

  return personal_recipes;
};
