import { getAllTags } from '@services/posts'

export const state = {
  tags: [],
}

export const mutations = {
  SET_TAGS(state, newValue) {
    if (Array.isArray(newValue)) {
      state.tags = state.tags.concat(newValue)
      return
    }

    state.tags.push(newValue)
  },
  SET_TRENDING(state, newSet) {
    state.tags = newSet
  },
}

export const getters = {
  tags(state) {
    return state.tags
  },
}

export const actions = {
  async getTags({ commit, dispatch, getters }, { post } = {}) {
    const tags = await getAllTags()

    commit('SET_TAGS', tags)
  },
  async getTrending({ commit, dispatch, getters }) {
    const tags = await getAllTags()
    const shuffled = tags.sort(() => 0.5 - Math.random())

    commit('SET_TRENDING', shuffled.splice(0, 12))
  },
}
