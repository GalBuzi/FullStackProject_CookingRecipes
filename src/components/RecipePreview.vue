<template>
  <router-link
    :to="{ name: 'fullRecipeView', params: { recipeId: recipe.id } }"
    class="recipe-preview"
  >
    <div class="recipe-body">
      <img :src="recipe.image" class="recipe-image" />
    </div>
    <div class="recipe-footer">
      <div style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-size:0.7cm; color:blue" 
        :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-size:0.45cm; color:blue" class="recipe-overview">
        <li v-if="isVegan()">
          Vegan:
          <b-icon icon="check-square" style="color: #00ff00;"></b-icon>
        </li>
        <li v-else>
          Vegan:
          <b-icon icon="x-square" style="color: #000000;"></b-icon>
        </li>
        
        <li v-if="isVegetarian()">
          Vegetarian:
          <b-icon icon="check-square" style="color: #00ff00;"></b-icon>
        </li>
        <li v-else>
          Vegetarian:
          <b-icon icon="x-square" style="color: #000000;"></b-icon>
        </li>

        <li v-if="isGlutenFree()">
          Gluten-Free:
          <b-icon icon="check-square" style="color: #00ff00;"></b-icon>
        </li>
        <li v-else>
          Gluten-Free:
          <b-icon icon="x-square" style="color: #000000;"></b-icon>
        </li>
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.aggregateLikes }} likes</li>
        <div v-if="this.$root.store.username">
          <li v-if="isViewed()">
            <b-icon icon="eye-fill" style="color: #00ff00;"></b-icon>
          </li>
          <li v-else>
            <b-icon icon="eye-fill" style="color:#867979; "></b-icon>
          </li>
          <li v-if="isFavourite()">
            <b-icon icon="star-fill" style="color: #ffff00;"></b-icon>
          </li>
          <li v-else>
            <b-icon icon="star-fill" style="color: #867979;"></b-icon>
          </li>
        </div>
      </ul>
    </div>
  </router-link>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  methods: {
    isViewed() {
      const arr = this.$root.store.viewed_recipes;
      return arr.find((x) => x.recipe_id == this.recipe.id);
    },
    isFavourite() {
      const arr = this.$root.store.favourites_recipes;
      return arr.find((x) => x.recipe_id == this.recipe.id);
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
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
  
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
</style>
