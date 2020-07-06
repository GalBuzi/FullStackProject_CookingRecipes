<template>
  <div>
    <RecipePreviewList :class="{center: true}" 
    style="width: 30%;color:whitesmoke;font-family: sans;"  title="My Favorite Recipes" :recipes="recipes" />
  </div>
</template>

<script>
import RecipePreviewList from "./RecipePreviewList";
export default {
  name: "FavoriteRecipePreviewList",
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server + "/users/getMyFavourites"
          // {
          //   credentials: true,
          // }
        );

        console.log(response);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(this.recipes);
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};
</script>

<style></style>
