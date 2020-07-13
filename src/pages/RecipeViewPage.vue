<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div v-if="isVegan()">
                Vegan:
                <b-icon icon="check-square" style="color: #00ff00;"></b-icon>
              </div>
              <div v-else>
                Vegan:
                <b-icon icon="x-square" style="color: #000000;"></b-icon>
              </div>

              <div v-if="isVegetarian()">
                Vegetarian:
                <b-icon icon="check-square" style="color: #00ff00;"></b-icon>
              </div>
              <div v-else>
                Vegetarian:
                <b-icon icon="x-square" style="color: #000000;"></b-icon>
              </div>

              <div v-if="isGlutenFree()">
                Gluten-Free:
                <b-icon icon="check-square" style="color: #00ff00;"></b-icon>
              </div>
              <div v-else>
                Gluten-Free:
                <b-icon icon="x-square" style="color: #000000;"></b-icon>
              </div>
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Servings: {{ recipe.servings }}</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
              <div>
                <b-button variant="warning" @click="addRecipeToFavourites()"
                  >Add To Favourites</b-button
                >
              </div>
            </div>
            Ingredients:
            <ul>
              <li v-for="(r, index) in recipe.ingredients" :key="index">
                {{ r.amount }} {{ r.unit }} of {{ r.ingredient_name }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe.instructions" :key="s.step_number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      let response;
      const recipe_id = this.$route.params.recipeId;

      response = await this.axios.get(
        this.$root.store.server + "/recipes/getRecipe/id/" + recipe_id
        // {
        //   params: { id:  },
        // }
      );
      this.recipe = response.data;

      // console.log("response.status", response.status);
      if (this.$root.store.username) {
        let added = await this.axios.get(
          this.$root.store.server + "/users/addRecipeToViewed/id/" + recipe_id
        );
        if (added) {
          if (
            !this.$root.store.viewed_recipes.find(
              (x) => x.recipe_id === recipe_id
            )
          ) {
            this.$root.store.viewed_recipes.push({ recipe_id: recipe_id });
          }
        }
      }

      // debugger;
      // console.log(response);
      // console.log(this.recipe);
    } catch (error) {
      console.log("error.response", error.response.status);
      console.log("error.response.status", error.response.status);
      this.$router.replace("/NotFound");
    }
  },
  methods: {
    async addRecipeToFavourites() {
      const recipe_id = this.recipe.id;
      let added = await this.axios.get(
        this.$root.store.server + "/users/addRecipeToFavourites/id/" + recipe_id
      );
      if (added)
        if (
          !this.$root.store.favourites_recipes.find(
            (x) => x.recipe_id === recipe_id
          )
        )
          this.$root.store.favourites_recipes.push({ recipe_id: recipe_id });

      console.log(this.$root.store.favourites_recipes);
    },
    isVegan() {
      return this.recipe.vegan;
    },
    isVegetarian() {
      return this.recipe.vegetarian;
    },
    isGlutenFree() {
      return this.recipe.glutenFree;
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.container {
  background-color: cornsilk;
}
/* .recipe-header{

} */
</style>
