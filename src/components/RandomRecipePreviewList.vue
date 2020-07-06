<template>
  <div>
    <b-row>
      <div>
        <RecipePreviewList
          title="Random Recipes"
          style="color:whitesmoke;font-family: sans;"
          :recipes="recipes"
        />
      </div>
    </b-row>
    <br />
    <b-row>
      <div class="buttonStyle">
        <b-button
          class="button"
          block
          pill
          variant="light"
          @click="updateRecipes()"
          >More Recipes</b-button
        >
      </div>
    </b-row>
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
          this.$root.store.server + "/recipes/getRandomRecipes"
        );

        // console.log(response);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        // console.log("this.recipes:");
        // console.log(this.recipes);
        let recipes_ids = [];
        for (let i = 0; i < this.recipes.length; i++) {
          recipes_ids.push(this.recipes[i].id);
        }
        // console.log("recipes_ids");
        // console.log(recipes_ids);

        // const history = await this.axios.get(
        //   this.$root.store.server +
        //     "/users/userInfoAboutRecipes/ids/[" +
        //     recipes_ids +
        //     "]"
        // );
        // console.log("history");
        // console.log(history);

        // for (let i = 0; i < this.recipes.length; i++) {
        //   let id = this.recipes[i].id;
        //   this.recipes[i].viewed = false;
        //   this.recipes[i].favourite = false;
        //   this.recipes[i].viewed = history.data.info[id].viewed;
        //   this.recipes[i].favourite = history.data.info[id].favourite;
        // }
        // console.log("this.recipes");
        // console.log(this.recipes);

        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.buttonStyle {
  width: 90%;
  padding-left: 10%;
}

.button {
  color: black;
  font-size: x-large;
}
</style>
