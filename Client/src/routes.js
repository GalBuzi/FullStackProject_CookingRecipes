import Home from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/about",
    name: "about",
    // component: About,
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/myFavourites",
    name: "myFavourites",
    // component: Favourites,
    component: () => import("./pages/FavouritesPage"),
  },
  {
    path: "/myPersonal",
    name: "myPersonal",
    // component: Personal,
    component: () => import("./pages/PersonalPage"),
  },
  {
    path: "/myFamily",
    name: "myFamily",
    // component: Family,
    component: () => import("./pages/FamilyPage"),
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: "/recipes/getRecipe/id/:recipeId",
    name: "fullRecipeView",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/users/getPersonalRecipe/id/:recipeId",
    name: "fullPersonalRecipeView",
    component: () => import("./pages/RecipePersonalViewPage"),
  },
  {
    path: "/users/getFamilyRecipe/id/:recipeId",
    name: "fullFamilyRecipeView",
    component: () => import("./pages/RecipeFamilyViewPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
