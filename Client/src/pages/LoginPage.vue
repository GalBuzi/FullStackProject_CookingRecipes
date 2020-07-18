<template>
  <div class="container">
    <b-row>
      <b-col>
        <h1 class="title text-center">Login</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-form @submit.prevent="onLogin">
        <b-form-group
          id="input-group-Username"
          label-cols-sm="3"
          label="Username:"
          label-for="Username"
        >
          <b-form-input
            id="Username"
            v-model="$v.form.username.$model"
            type="text"
            :state="validateState('username')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Username is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-Password"
          label-cols-sm="3"
          label="Password:"
          label-for="Password"
        >
          <b-form-input
            id="Password"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Password is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button
          type="submit"
          variant="primary"
          style="width:100px;display:block;"
          class="mx-auto w-100"
          >Login</b-button
        >
        <div class="mt-2">
          Do not have an account yet?
          <router-link to="register"> Register in here</router-link>
        </div>
      </b-form>
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >
        Login failed: {{ form.submitError }}
      </b-alert>
    </b-row>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined,
      },
    };
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const response = await this.axios.post(
          this.$root.store.server + "/login",
          {
            username: this.form.username,
            password: this.form.password,
          }
        );
        // console.log(response);
        // this.$root.loggedIn = true;
        console.log(this.$root.store.login);
        this.$root.store.login(this.form.username);
        //check

        const fav_array = await this.axios.get(
          this.$root.store.server + "/users/userInfoFavourites"
        );

        this.$root.store.addFavouritesRecipes(fav_array.data);
        console.log(fav_array.data);

        const viewed_array = await this.axios.get(
          this.$root.store.server + "/users/userInfoLastViewed"
        );

        this.$root.store.addViewedRecipes(viewed_array.data);
        console.log(viewed_array.data);

        this.$router.push("/").catch((err) => {});
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      this.Login();
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}

.title {
  font-size: 40pt;
  font-weight: bold;
  -webkit-text-stroke: 2px black; /* width and color */
  font-family: "Comic Sans MS", cursive, sans-serif;
  color: whitesmoke;
}
</style>
