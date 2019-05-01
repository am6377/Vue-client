import axios from 'axios'
import { BACKEND_API } from '@constants'

export async function create(body) {
  const response = await axios.post(`${BACKEND_API}/api/posts/`, body)
  const post = response.data

  return post
}

export async function getAll() {
  const response = await axios.get(`${BACKEND_API}/api/posts`)
  const posts = response.data

  return posts
}

export async function getAllTags() {
  const response = await axios.get(`${BACKEND_API}/api/posts/tags`)
  const tags = response.data

  return tags
}

export async function doesTagExist(newTag) {
  const response = await axios.get(`${BACKEND_API}/api/posts/newtags/${newTag}`)
  const theResponse = response.data

  return theResponse
}

export async function getPostsByTags(tag) {
  const response = await axios.get(`${BACKEND_API}/api/posts/tags/${tag}`)
  const tags = response.data

  return tags
}

export async function getPostsByUser(userId, original) {
  const response = await axios.get(
    `${BACKEND_API}/api/posts/user/${userId}/${original}`
  )
  const posts = response.data

  return posts
}

export async function getPostsByReplies(userId) {
  const response = await axios.get(`${BACKEND_API}/api/posts/replies/${userId}`)
  const posts = response.data

  return posts
}

export async function getSearchResults(query) {
  const response = await axios.get(`${BACKEND_API}/api/posts/search`, {
    params: {
      search: query,
    },
  })
  const posts = response.data

  return posts
}

export async function getPost(id) {
  const response = await axios.get(`${BACKEND_API}/api/posts/${id}`)
  const post = response.data

  return post
}

export async function replyToPost(id, { author, content, tags } = {}) {
  const response = await axios.post(`${BACKEND_API}/api/posts/reply/${id}`, {
    author,
    content,
    tags,
  })
  const post = response.data

  return post
}
