<template>
  <div>
    <RecipePersonalPreviewList title="My Personal Recipes" :recipes="recipes" />
  </div>
</template>

<script>
import RecipePersonalPreviewList from "./RecipePersonalPreviewList";
export default {
  name: "MyPersonalRecipesList",
  components: {
    RecipePersonalPreviewList,
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
          this.$root.store.server + "/users/getPersonalRecipes"
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

<style>
</style>
