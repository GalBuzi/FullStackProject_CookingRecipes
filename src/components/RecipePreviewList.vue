<template>
  <b-container>
    <h3 class="title">{{ title }}:</h3>
    <b-row v-for="r in recipes" :key="r.id">
      <b-col>
        <b-card
          style="max-width: 35rem;border-color: rgb(241, 227, 227); border-style: solid;border-width: 15px; "
        >
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    recipes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
  //color:rgb(241, 227, 227)
}

.title {
  font-size: 32pt;
  font-weight: bold;
  -webkit-text-stroke: 2px black; /* width and color */
  font-family: "Comic Sans MS", cursive, sans-serif;
  color: whitesmoke;
  text-align: center;
}
</style>
