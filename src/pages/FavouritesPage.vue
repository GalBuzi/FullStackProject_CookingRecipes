<template>
  <div class ="favorite">
      <FavoriteRecipePreviewList/>
  </div>
</template>

<script>
import FavoriteRecipePreviewList from "../components/FavoriteRecipePreviewList";
export default {
name: "FavoritePage",
components:{
  FavoriteRecipePreviewList,
}
};

</script>


<style>
.favorie {
  height: 100px;
  width: 100px;
}
</style>
