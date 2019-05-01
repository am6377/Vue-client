import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: state => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const postsComputed = {
  ...mapGetters('posts', ['posts']),
}

export const repliesComputed = {
  ...mapGetters('replies', ['replies']),
}

export const tagsComputed = {
  ...mapGetters('tags', ['tags']),
}

export const authMethods = mapActions('auth', ['logIn', 'logOut'])
