import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import routes from "./routes";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies";
import Bootstrap from "bootstrap-vue";
import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  BootstrapVueIcons,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  BootstrapVueIcons,
].forEach((x) => Vue.use(x));

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(Bootstrap);
Vue.use(VueCookies);

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes,
});

const shared_data = {
  // server: "https://assignment3-2-gal.herokuapp.com",
  server: "http://localhost:4000",
  username: localStorage.username,
  viewed_recipes: localStorage.viewed_recipes
    ? JSON.parse(localStorage.viewed_recipes)
    : [],
  favourites_recipes: localStorage.favourites_recipes
    ? JSON.parse(localStorage.favourites_recipes)
    : [],

  history: localStorage.history ? localStorage.history : [],

  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    Vue.$cookies.remove("session");
    localStorage.removeItem("username");
    localStorage.removeItem("viewed_recipes");
    localStorage.removeItem("favourites_recipes");

    this.username = undefined;
  },
  addViewedRecipes(viewed_recipes) {
    localStorage.setItem("viewed_recipes", JSON.stringify(viewed_recipes));
    this.viewed_recipes = viewed_recipes;
  },
  addFavouritesRecipes(favourites_recipes) {
    localStorage.setItem(
      "favourites_recipes",
      JSON.stringify(favourites_recipes)
    );
    this.favourites_recipes = favourites_recipes;
  },
  addSearchedRecipes(history) {
    localStorage.setItem("history", JSON.stringify(history));
    this.history = history;
  },
};

router.beforeEach((to, from, next) => {
  // if there was a transition from logged in to session expired or localStorage was deleted
  // if we try to enter auth required pages and we are not authorized
  if (shared_data.username === undefined || !Vue.$cookies.get("session")) {
    if (
      (shared_data.username === undefined && Vue.$cookies.get("session")) ||
      (shared_data.username !== undefined && !Vue.$cookies.get("session"))
    ) {
      shared_data.logout();
    }

    // if the route requires Authorization, (and we know the user is not authorized), we redirect to login page
    if (to.matched.some((route) => route.meta.requiresAuth)) {
      next({ name: "login" });
    } else next();
  } else next();
});

console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
