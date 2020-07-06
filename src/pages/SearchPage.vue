<template>
  <div class="container">
    <h1 class="title" style="color:white">Search Page</h1>
    <div>
      <b-row class="rows">
        <b-col class="cols">
          <b-form-input
            v-model="currentSearchQuery"
            placeholder="Search for recipe..."
          ></b-form-input>
        </b-col>
        <b-col class="cols">
          <b-form-select
            v-model="numOfRecipesToSearch"
            :options="numOfRecipes"
          ></b-form-select>
        </b-col>
      </b-row>
      <b-row class="rows">
        <b-col class="cols">
          <h4 style="color:white">Choose Cuisine:</h4>
          <b-form-select
            v-model="cuisine_type"
            :options="cuisines_types"
            :select-size="5"
          ></b-form-select>
        </b-col>
        <b-col class="cols">
          <h4 style="color:white">Choose Diet:</h4>
          <b-form-select
            v-model="diet"
            :options="all_diets"
            :select-size="5"
          ></b-form-select>
        </b-col>
        <b-col class="cols">
          <h4 style="color:white">Choose Intolerance:</h4>
          <b-form-select
            v-model="intolerance"
            :options="all_intolerances"
            :select-size="5"
          ></b-form-select>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col class="cols">
          <b-button variant="outline-warning" @click="search()"
            >Search</b-button
          >
        </b-col>
        <b-col class="cols">
          <div style="color:white; font-size:0.6cm;" v-if="$root.store.username">
            Your last search was: {{ lastSearch }} 
          </div>
        </b-col>
      </b-row>
      <b-row v-if="this.recipes.length > 0">
        <!-- Sort By: -->
        <!-- <b-form-select
          v-model="sort_by"
          :options="sort_options"
          @click="sort()"
        ></b-form-select> -->
        <div>
          <b-dropdown text="Sort By:" class="m-md-2">
            <b-dropdown-item @click="sortPopularity()"
              >Popularity</b-dropdown-item
            >
            <b-dropdown-item @click="sortDuration()">Duration</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-row>
    </div>
    <div v-if="this.recipes.length > 0">
      <RecipePreviewList style="color:white" title="Results" :recipes="recipes"></RecipePreviewList>
    </div>
    <div>
      <b-modal ref="my-modal" hide-footer title="No Recipes Found">
        <div class="d-block text-center">
          <h3>We don't have recipes which match your filtering, try again.</h3>
        </div>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal"
          >Close</b-button
        >
      </b-modal>
    </div>
  </div>
</template>

<script>
import cuisines from "../assets/cuisines";
import diets from "../assets/diets";
import intolerances from "../assets/intolerances";
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      currentSearchQuery: "",
      numOfRecipesToSearch: "5",
      cuisine_type: "",
      diet: "",
      intolerance: "",
      sort_by: "",
      numOfRecipes: [
        { value: "5", text: "Search for 5 recipes" },
        { value: "10", text: "Search for 10 recipes" },
        { value: "15", text: "Search for 15 recipes" },
      ],
      sort_options: [
        { value: "", text: "" },
        { value: "aggregateLikes", text: "Popularity" },
        { value: "readyInMinutes", text: "Duration" },
      ],
      lastSearch: "",
      cuisines_types: [],
      all_diets: [],
      all_intolerances: [],
      recipes: [],
    };
  },
  async created() {
    console.log(this.$root.store.search_history);
    this.lastSearch = this.$root.store.search_history;
  },
  mounted() {
    this.cuisines_types.push(...cuisines);
    this.all_diets.push(...diets);
    this.all_intolerances.push(...intolerances);
    console.log(this.cuisines_types);
  },
  methods: {
    async search() {
      this.recipes = [];
      if (this.numOfRecipesToSearch != "" && this.currentSearchQuery != "") {
        if (this.$root.store.username) {
          let arr = [];
          arr.push(this.currentSearchQuery);
          arr.push(this.numOfRecipesToSearch);
          this.lastSearch = '"' + arr[0] + '" with ' + arr[1] + " results";
          this.$root.store.addSearchedRecipes(
            '"' + arr[0] + '" with ' + arr[1] + " results"
          );
        }

        const response = await this.axios.get(
          this.$root.store.server +
            "/recipes/search/query/" +
            this.currentSearchQuery +
            "/amount/" +
            this.numOfRecipesToSearch,
          {
            params: {
              diet: this.diet,
              cuisine: this.cuisine_type,
              intolerance: this.intolerance,
            },
          }
        );
        console.log(response);

        if (response.data.length === 0) {
          console.log("no results");
          this.showModal();
          this.currentSearchQuery = "";
        }

        const results = response.data;
        this.recipes.push(...results);
        console.log(this.recipes);
      } else {
        this.showModal();
      }
    },
    async sortPopularity() {
      console.log("sorting by popularity");
      this.recipes.sort(function(a, b) {
        return b.aggregateLikes - a.aggregateLikes;
      });
    },
    async sortDuration() {
      console.log("sorting by duration");
      this.recipes.sort(function(a, b) {
        return a.readyInMinutes - b.readyInMinutes;
      });
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
  },
};
</script>

<style></style>
