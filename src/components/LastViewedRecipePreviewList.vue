<template>
  <div>
    <RecipePreviewList title="Last Viewed Recipes" :recipes="recipes" />
  </div>
</template>

<script>
import RecipePreviewList from "./RecipePreviewList";
export default {
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
          this.$root.store.server + "/users/getLastThreeViewedRecipes",
          { withCredentials: true }
        );

        console.log(response);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
