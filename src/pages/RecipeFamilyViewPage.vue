<template>
  <div class="container">
    <div v-if="familyRecipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ familyRecipe.title }}</h1>
        <img :src="familyRecipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Recipe owner: {{ familyRecipe.RecipeOwner }}</div>
              <div>Ready in {{ familyRecipe.readyInMinutes }} minutes</div>
              <div>Servings: {{ familyRecipe.servings }}</div>
              <div>Likes: {{ familyRecipe.aggregateLikes }} likes</div>
              <div>
                Occasions:
                <ul>
              <li v-for="occation in familyRecipe.Occasion" :key="occation">
                {{ occation }}
              </li>
            </ul>
              </div>
            </div>
            Ingredients:
            <ul>
              <li v-for="(r, index) in familyRecipe.ingredients" :key="index">
                {{ r.amount }} {{ r.unit }} of {{ r.name }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in familyRecipe.instructions" :key="s.step">
                {{ s.instruction }}
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
      familyRecipe: [],
    };
  },
  async created() {
    try {
      let response;

      try {
        response = await this.axios.get(
          this.$root.store.server +
            "/users/getFamilyRecipe/id/" +
            this.$route.params.recipeId
          // {
          //   params: { id:  },
          // }
        );
        console.log("family")
        console.log(response.data);
        console.log("response.status", response.status);
      } catch (error) {
        console.log("error.response", error.response.status);
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      // debugger;
      // console.log(response);
      console.log(response.data[0]);
      this.familyRecipe = response.data[0];
      console.log(familyRecipe)
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
