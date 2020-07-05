<template>
  <div>
    <RecipeFamilyPreviewList title="My Family Recipes" :recipes="recipes" />
  </div>
</template>

<script>
import RecipeFamilyPreviewList from "./RecipeFamilyPreviewList";
export default {
  name: "MyFamilyRecipesList",
  components: {
    RecipeFamilyPreviewList,
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
          this.$root.store.server + "/users/getMyFamilyRecipes"
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
