<template>
  <b-container>
    <h3>{{ title }}:</h3>
    <b-row v-for="r in recipes" :key="r.id">
      <b-col>
        <b-card style="max-width: 35rem;border-color: rgb(241, 227, 227); border-style: solid;border-width: 15px;">
        <RecipeFamilyPreview class="recipePreview" :recipe="r" />
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipeFamilyPreview from "./RecipeFamilyPreview.vue";
export default {
  name: "RecipeFamilyPreviewList",
  components: {
    RecipeFamilyPreview,
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
