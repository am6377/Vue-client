<script>
import { authComputed } from '@state/helpers'
import NavBarRoutes from '@components/nav-bar-routes'
import Connect from '@components/Connect'

export default {
  components: {
    Connect,
    NavBarRoutes,
  },
  data() {
    return {
      open: false,
      persistentNavRoutes: [
        {
          name: 'home',
          title: 'Home',
        },
      ],
      loggedInNavRoutes: [
        {
          name: 'profile',
          title: () => 'Logged in as ' + this.currentUser.name,
        },
        {
          name: 'logout',
          title: 'Log out',
        },
      ],
      loggedOutNavRoutes: [
        {
          name: 'login',
          title: 'Log in',
          href: '#',
        },
      ],
    }
  },
  computed: {
    ...authComputed,
  },
  methods: {
    displayConnect() {
      this.open = true
    },
  },
}
</script>

<template>
  <ul :class="$style.container">
    <NavBarRoutes :routes="persistentNavRoutes" />
    <NavBarRoutes
      v-if="loggedIn"
      :routes="loggedInNavRoutes"
    />
    <a
      v-else
      @click="displayConnect"
    >
      Log in
    </a>
    <Connect :open.sync="open" />
  </ul>
</template>

<style lang="scss" module>
@import '@design';

.container {
  padding: 0;
  margin: 0 0 $size-grid-padding;
  text-align: center;
  list-style-type: none;

  > li {
    display: inline-block;
    margin-right: $size-grid-padding;
  }
}
</style>
