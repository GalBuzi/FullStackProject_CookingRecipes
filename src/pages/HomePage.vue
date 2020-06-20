<template>
  <div class="container">
    <b-row>
      <b-col>
        <h1 class="title text-center">Home Page</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <RandomRecipesPreviewList />
      </b-col>
      <b-col v-if="!$root.store.username">
        <Login />
      </b-col>
      <b-col v-else-if="$root.store.username">
        <LastThreeViewedRecipesPreviewList />
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import RecipePreviewList from "../components/RecipePreviewList";
import Login from "./LoginPage";
import RandomRecipesPreviewList from "../components/RandomRecipePreviewList";
import LastThreeViewedRecipesPreviewList from "../components/LastViewedRecipePreviewList";
export default {
  components: {
    Login,
    RandomRecipesPreviewList,
    LastThreeViewedRecipesPreviewList,
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
