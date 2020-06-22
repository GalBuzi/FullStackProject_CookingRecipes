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
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
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
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
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

      try {
        response = await this.axios.get(
          this.$root.store.server +
            "/recipes/getRecipe/id/" +
            this.$route.params.recipeId
          // {
          //   params: { id:  },
          // }
        );
        console.log("response.status", response.status);
      } catch (error) {
        console.log("error.response", error.response.status);
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      // debugger;
      // console.log(response);
      this.recipe = response.data;
      // console.log(this.recipe);
    } catch (error) {
      console.log(error);
    }
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
/* .recipe-header{

} */
</style>
