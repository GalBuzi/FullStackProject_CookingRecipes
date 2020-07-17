<template>
  <div>
    <b-navbar toggleable="lg" type="info" variant="light">
      <b-navbar-brand>
        <router-link tag="a" active-class="active" :to="{ name: 'home' }" exact
          >Home</router-link
        >
      </b-navbar-brand>
      <b-navbar-brand>
        <router-link
          tag="a"
          active-class="active"
          :to="{ name: 'search' }"
          exact
          >Search</router-link
        >
      </b-navbar-brand>
      <b-navbar-brand
        ><router-link
          tag="a"
          active-class="active"
          :to="{ name: 'about' }"
          exact
          >About</router-link
        ></b-navbar-brand
      >

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-navbar-brand>Hello Guest ! please</b-navbar-brand>
          <b-navbar-brand>
            <router-link
              tag="a"
              active-class="active"
              :to="{ name: 'register' }"
              exact
              >Register</router-link
            >
          </b-navbar-brand>
          <b-navbar-brand>or</b-navbar-brand>
          <b-navbar-brand
            ><router-link
              tag="a"
              active-class="active"
              :to="{ name: 'login' }"
              exact
              >Log-in</router-link
            ></b-navbar-brand
          >
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-navbar-brand>Welcome {{ $root.store.username }} !</b-navbar-brand>
          <b-nav-item-dropdown text="User's Information" right>
            <b-dropdown-item>
              <router-link
                tag="a"
                active-class="active"
                :to="{ name: 'myFavourites' }"
                exact
                >My Favourites Recipes</router-link
              >
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link
                tag="a"
                active-class="active"
                :to="{ name: 'myPersonal' }"
                exact
                >My Personal Recipes</router-link
              >
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link
                tag="a"
                active-class="active"
                :to="{ name: 'myFamily' }"
                exact
                >My Family Recipes</router-link
              >
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-navbar-brand>
            <button v-on:click="$emit('Logout')">Log-out</button>
          </b-navbar-brand>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "navBar",
};
</script>

<style>
</style>
