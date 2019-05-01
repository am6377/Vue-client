import {
  create,
  getAll,
  getPostsByReplies,
  getPostsByTags,
  getPostsByUser,
} from '@services/posts'

export const state = {
  posts: [],
  replies: [],
}

export const mutations = {
  SET_POSTS(state, newValue) {
    if (Array.isArray(newValue)) {
      state.posts = state.posts.concat(newValue)
      return
    }

    state.posts.push(newValue)
  },
  SET_REPLIES(state, newValue) {
    if (Array.isArray(newValue)) {
      state.replies = state.replies.concat(newValue)
      return
    }

    state.replies.push(newValue)
  },
  SET_POSTS_BY_TAGS(state, newSet) {
    if (Array.isArray(newSet) && newSet.length > 0) {
      state.posts = newSet
    }
  },
}

export const getters = {
  posts(state) {
    return state.posts
  },
  replies(state) {
    return state.replies
  },
}

export const actions = {
  getPosts({ commit, dispatch, getters }, { post } = {}) {
    return getAll().then(posts => {
      commit('SET_POSTS', posts)
      return posts
    })
  },
  async getPostsByTag({ commit, dispatch, getters }, tag = '') {
    const posts = await getPostsByTags(tag)
    commit('SET_POSTS_BY_TAGS', posts)
  },
  async getPostsAnswered({ commit, dispatch, getters }, userId = '') {
    const replies = await getPostsByReplies(userId)

    commit('SET_REPLIES', replies)
  },
  async getPostsAsked({ commit, dispatch, getters }, userId = '') {
    const posts = await getPostsByUser(userId)

    commit('SET_POSTS', posts)
  },
  async create({ commit, dispatch, getters }, body = {}) {
    const post = await create(body)

    commit('SET_POSTS', post)
  },
}
