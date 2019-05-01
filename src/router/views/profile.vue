<script>
import Layout from '@layouts/main'
import { getPostsByReplies, getPostsByUser } from '@services/posts'
import { authComputed } from '@state/helpers'
import UserQuestions from '@components/UserQuestions'

export default {
  components: {
    Layout,
    UserQuestions,
  },
  data() {
    return {
      profilePic: '',
      name: '',
      post: [],
      userPostReplies: [],
      replies: [],
    }
  },
  computed: {
    ...authComputed,
  },
  created() {
    this.profilePic = this.currentUser.google.image.url
    this.name = this.currentUser.name
    this.fetchPosts()
    this.fetchReplies()
    this.fetchQuestionAnswered()
  },
  methods: {
    async fetchPosts() {
      const posts = await getPostsByUser(this.currentUser._id, 'true')

      this.post = this.post.concat(posts)
    },
    async fetchReplies() {
      const posts = await getPostsByUser(this.currentUser._id, 'false')

      this.userPostReplies = this.userPostReplies.concat(posts)
    },
    async fetchQuestionAnswered() {
      const replies = await getPostsByReplies(this.currentUser._id)

      this.replies = this.replies.concat(replies)
    },
  },
}
</script>

<template>
  <Layout>
    <div class="create md-layout">
      <MdContent
        md-tag="section"
        class="first-wrapper"
      >
        <MdAvatar class="md-large">
          <img
            :src="profilePic"
            alt="People"
          >
        </MdAvatar>
      </MdContent>
      <MdContent
        md-tag="section"
        class="first-wrapper"
      >
        <span class="md-headline">
          {{ name }}
        </span>
      </MdContent>

      <MdContent
        md-tag="section"
        class="second-wrapper"
      >
        <div>
          <MdTabs md-alignment="centered">
            <MdTab
              md-label="Your Post"
              md-icon="create"
            >
              <UserQuestions
                v-for="p in post.slice().reverse()"
                :key="p._id"
                :post="p"
              />
            </MdTab>

            <MdTab
              md-label="Your Replies"
              md-icon="reply"
            >
              <UserQuestions
                v-for="p in userPostReplies.slice().reverse()"
                :key="p._id"
                :post="p"
              />
            </MdTab>

            <MdTab
              md-label="Question Answered"
              md-icon="insert_comment"
            >
              <UserQuestions
                v-for="r in replies.slice().reverse()"
                :key="r._id"
                :post="r"
              />
            </MdTab>
          </MdTabs>
        </div>
      </MdContent>
    </div>
  </Layout>
</template>



<style lang="scss">
.create {
  justify-content: center;
  text-align: center;

  .first-wrapper {
    width: 380px;
    height: 120px;
    padding: 2em;
    margin-top: 5em;
    margin-right: 1em;
    margin-left: 1em;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  .second-wrapper {

    width: 792px;
    padding: 2em;
    margin-top: 1em;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
}
</style>
