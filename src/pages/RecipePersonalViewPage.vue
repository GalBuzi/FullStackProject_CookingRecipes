<template>
  <div class="container">
    <div v-if="personalRecipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ personalRecipe.title }}</h1>
        <img :src="personalRecipe.image" class="center" />
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
              <div>Ready in {{ personalRecipe.readyInMinutes }} minutes</div>
              <div>Servings: {{ personalRecipe.servings }}</div>
              <div>Likes: {{ personalRecipe.aggregateLikes }} likes</div>
            </div>
            Ingredients:
            <ul>
              <li v-for="(r, index) in personalRecipe.ingredients" :key="index">
                {{ r.amount }} {{ r.unit }} of {{ r.name }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in personalRecipe.instructions" :key="s.step">
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
      personalRecipe: [],
    };
  },
  async created() {
    try {
      let response;

      try {
        response = await this.axios.get(
          this.$root.store.server +
            "/users/getPersonalRecipe/id/" +
            this.$route.params.recipeId
          // {
          //   params: { id:  },
          // }
        );
        console.log("personal");
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
      this.personalRecipe = response.data[0];
      console.log(personalRecipe);
      // console.log(this.recipe);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    isVegan() {
      return this.personalRecipe.vegan;
    },
    isVegetarian() {
      return this.personalRecipe.vegetarian;
    },
    isGlutenFree() {
      return this.personalRecipe.glutenFree;
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
.container{
  background-color:cornsilk;
}
/* .recipe-header{

} */
</style>
