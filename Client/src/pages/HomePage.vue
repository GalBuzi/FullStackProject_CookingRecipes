<template>
  <div class="container">
    <b-row>
      <b-col>
        <h1 class="title text-center">Welcome</h1>
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
    <br />
    <br />
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
  // async created() {
  // if (this.$root.store.username) {
  //   console.log(this.$root.store.viewed_recipes);
  //   console.log(this.$root.store.favourites_recipes);
  // }
  // },
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
.title {
  font-size: 56pt;
  font-weight: bold;
  -webkit-text-stroke: 2px black; /* width and color */
  font-family: "Comic Sans MS", cursive, sans-serif;
  color: whitesmoke;
}
</style>
