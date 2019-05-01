import axios from 'axios'
import { BACKEND_API } from '@constants'

export const state = {
  currentUser: getSavedState('auth.currentUser'),
}

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue
    saveState('auth.currentUser', newValue)
    setDefaultAuthHeaders(state)
  },
}

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser
  },
}

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ state, dispatch }) {
    console.log('intiializing');
    setDefaultAuthHeaders(state)
    dispatch('validate')
  },

  // Logs in the current user.
  logIn({ commit, dispatch, getters }, { username, password } = {}) {
    if (getters.loggedIn) return dispatch('validate')
    
    return axios.post('/api/session', { username, password }).then(response => {
      const user = response.data
      commit('SET_CURRENT_USER', user)
      return user
    })
  },

  // Logs out the current user.
  logOut({ commit }) {
    commit('SET_CURRENT_USER', null)
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  validate({ commit, state }) {
    if (!state.currentUser) return Promise.resolve(null)
    console.log('validating...');
    console.log('validate userstate', state.currentUser);
    console.log(axios.defaults.headers);
    return axios
      .get(`${BACKEND_API}/api/users/me`)
      .then(response => {
        const user = response.data
        
        user.token = state.currentUser ? state.currentUser.token : ''
        commit('SET_CURRENT_USER', user)
        return user
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          commit('SET_CURRENT_USER', null)
        }
        return null
      })
  },

  me({ commit, state }) {
    return axios.get(`${BACKEND_API}/api/users/me`).then(response => {
      const user = response.data
      
      user.token = state.currentUser ? state.currentUser.token : ''
      commit('SET_CURRENT_USER', user)
      return user
    })
  }
}

// ===
// Private helpers
// ===

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}

function setDefaultAuthHeaders(state) {
  console.log('setting headers', state.currentUser);
  axios.defaults.headers.common.Authorization = state.currentUser
    ? `Bearer ${state.currentUser.token}`
    : ''
}
