<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <br />
    <br />
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
      <br />
      <b-row class="rows">
        <b-col class="cols">
          <h4 class="h4">Cuisine:</h4>
          <b-form-select
            v-model="cuisine_type"
            :options="cuisines_types"
            :select-size="5"
          ></b-form-select>
        </b-col>
        <b-col class="cols">
          <h4 class="h4">Diet:</h4>
          <b-form-select
            v-model="diet"
            :options="all_diets"
            :select-size="5"
          ></b-form-select>
        </b-col>
        <b-col class="cols">
          <h4 class="h4">Intolerance:</h4>
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
          <div class="buttonStyle">
            <b-button
              class="button"
              block
              pill
              variant="light"
              @click="search()"
              >Search</b-button
            >
          </div>
        </b-col>
      </b-row>
      <br />
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

    <b-col>
      <div v-if="this.recipes.length > 0">
        <RecipePreviewList
          :class="{ center: true }"
          style="width: 60%;color:whitesmoke;font-family: sans;"
          title="Results"
          :recipes="recipes"
        ></RecipePreviewList>
      </div>
    </b-col>
    <b-col>
      <div v-if="this.lastSearch.length > 0">
        <RecipePreviewList
          :class="{ center: true }"
          style="width: 60%;color:whitesmoke;font-family: sans;"
          title="Last Search Results"
          :recipes="lastSearch"
        ></RecipePreviewList>
      </div>
    </b-col>

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
      // lastSearch: "",
      lastSearch: [],
      cuisines_types: [],
      all_diets: [],
      all_intolerances: [],
      recipes: [],
    };
  },
  async created() {
    let history_storage = JSON.parse(localStorage.getItem("history"));
    console.log("1111111");
    console.log(history_storage);

    if (!history_storage) {
      console.log("222222222");
      this.$root.store.addSearchedRecipes(new Array());
    } else if (this.$root.store.username) {
      console.log("3333333333");
      console.log(history_storage);
      let username = this.$root.store.username;
      for (let i = 0; i < history_storage.length; i++) {
        let obj = history_storage[i];
        console.log(obj);
        console.log("444444444444");
        if (username == history_storage[i].username) {
          this.lastSearch = history_storage[i].recipes;
        }
      }
    }
  },
  mounted() {
    this.cuisines_types.push(...cuisines);
    this.all_diets.push(...diets);
    this.all_intolerances.push(...intolerances);
    // console.log(this.cuisines_types);
  },
  methods: {
    async search() {
      while (this.lastSearch.length > 0) {
        this.lastSearch.pop();
      }
      this.lastSearch.push(...this.recipes);
      this.recipes = [];
      if (this.currentSearchQuery != "") {
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
        // console.log(response);

        if (response.data.length === 0) {
          // console.log("no results");
          this.showModal();
          this.currentSearchQuery = "";
          return;
        }

        const results = response.data;
        this.recipes.push(...results);
        console.log(this.recipes);

        if (this.$root.store.username) {
          // console.log("before parse");
          let history = JSON.parse(localStorage.getItem("history"));
          // console.log(history);
          let user_found = false;
          let username = this.$root.store.username;
          // console.log(history.length);
          for (let i = 0; i < history.length && !user_found; i++) {
            // console.log(history[i].username);
            if (username == history[i].username) {
              // console.log("found user");
              user_found = true;
              history[i].recipes = this.recipes;
              this.$root.store.addSearchedRecipes(history);
            }
          }

          if (!user_found) {
            // console.log("pushinggg");
            history.push({
              username: username,
              recipes: this.recipes,
            });
            this.$root.store.addSearchedRecipes(history);
          }
        }
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

<style>
.buttonStyle {
  width: 95%;
  padding-left: 5%;
}

.button {
  color: black;
  font-size: x-large;
}

.title {
  font-weight: bold;
  -webkit-text-stroke: 2px black; /* width and color */
  font-family: "Comic Sans MS", cursive, sans-serif;
  color: whitesmoke;
  font-size: 48pt;
  text-align: center;
}

.h4 {
  font-weight: bold;
  -webkit-text-stroke: 1.5px black; /* width and color */
  font-family: "Comic Sans MS", cursive, sans-serif;
  color: whitesmoke;
  font-size: 28pt;
  text-align: center;
}

.lastSearch {
  font-weight: bold;
  -webkit-text-stroke: 1px black; /* width and color */
  font-family: "Comic Sans MS", cursive, sans-serif;
  color: white;
  font-size: 20pt;
  text-align: center;
}
</style>
