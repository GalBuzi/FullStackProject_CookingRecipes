<template>
  <div>
    <RecipePreviewList
      style="color:whitesmoke;font-family: sans;"
      title="Last Viewed Recipes"
      :recipes="recipes"
    />
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
          this.$root.store.server + "/users/getLastThreeViewedRecipes"
          // {
          //   credentials: true,
          // }
        );

        // console.log(response);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        // console.log(this.recipes);
        let recipes_ids = [];
        for (let i = 0; i < this.recipes.length; i++) {
          recipes_ids.push(this.recipes[i].id);
        }
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};
</script>

<style></style>
