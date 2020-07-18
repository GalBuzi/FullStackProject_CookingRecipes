<template>
  <div id="app">
    <Navbar v-on:Logout="Logout()"></Navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/NavBar";
export default {
  name: "App",
  components: {
    Navbar,
  },
  mounted() {
    console.log(this.$cookies.get("session"));
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  min-height: 100vh;
}
</style>
