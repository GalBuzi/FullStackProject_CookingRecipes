<template>
  <b-container>
    <h3>{{ title }}:</h3>
    <b-row v-for="r in recipes" :key="r.id">
      <b-col>
        <RecipePersonalPreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePersonalPreview from "./RecipePersonalPreview.vue";
export default {
  name: "RecipePersonalPreviewList",
  components: {
    RecipePersonalPreview,
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
}

</style>
