<template>
  <MdToolbar class="md-primary">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <NavBarRoutes
          :routes="persistentNavRoutes"
          class="md-icon-button"
        />
      </div>

      <div id="searchbox">
        <Autocomplete
          v-model="inputVal"
          :items="results"
          filterby="name"
          title="search..."
          @selected="inputSelected"
        />
      </div>
      <MdButton class="md-raised md-accent">
        <router-link :to="{ name: 'results', params: { inputVal } }">
          Submit
        </router-link>
      </MdButton>

      <div class="md-toolbar-section-end">
        <NavBarRoutes
          v-if="loggedIn"
          :routes="loggedInNavRoutes"
        />
        <!--Log in button-->
        <MdButton
          v-else
          class="md-icon-button"
          @click="displayConnect"
        >
          <MdIcon>account_box</MdIcon>
        </MdButton>
        <Connect :open.sync="open" />
      </div>
    </div>
  </MdToolbar>
</template>

<script>
import Autocomplete from '@components/Autocomplete'
import { authComputed } from '@state/helpers'
import { getAllTags } from '@services/posts'
import NavBarRoutes from '@components/nav-bar-routes'
import Connect from '@components/Connect'

export default {
  name: 'Searchbox',
  components: {
    Autocomplete,
    NavBarRoutes,
    Connect,
  },
  data: () => ({
    inputVal: '',
    results: [],
    open: false,
    persistentNavRoutes: [
      {
        name: 'home',
        title: 'Home',
        icon: 'home',
      },
    ],
    loggedInNavRoutes: [
      {
        name: 'profile',
        title: () => 'Logged in as ' + this.currentUser.name,
        icon: 'person_outline',
      },
      {
        name: 'logout',
        title: 'Log out',
        icon: 'close',
      },
    ],
    loggedOutNavRoutes: [
      {
        name: 'login',
        title: 'Log in',
        href: '#',
      },
    ],
  }),
  computed: {
    ...authComputed,
  },
  mounted() {
    this.inputResults();
  },
  methods: {
    inputSelected(input) {
      this.inputVal = input.name
    },
    displayConnect() {
      this.open = true
    },
    async inputResults() {
      const tagResults = await getAllTags()
      for (let i = 0; i < tagResults.length; i++) {
        this.results.push({id: i + 1, name: tagResults[i]})
      }
    }
  },
}
</script>

<style>
#searchbox {
  width: 40%;
  margin: 0 auto;
  margin-top: 0;
}
</style>
